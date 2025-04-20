import TextBlob
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import requests
from typing import Any, Text, Dict, List
from datetime import datetime

class ActionAnalyseEmotion(Action):
    def name(self):
        return "action_analyse_emotion"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker, domain: dict):

        user_message = tracker.latest_message.get("text", "")

        # Call Hugging Face emotion model
        payload = {"inputs": user_message}
        headers = {"Authorization": "Bearer YOUR_HUGGINGFACE_API_KEY"}

        response = requests.post(
            "https://api-inference.huggingface.co/models/bhadresh-savani/distilbert-base-uncased-emotion",
            headers=headers,
            json=payload
        )

        if not response.ok:
            dispatcher.utter_message(text="I'm having trouble analysing your message right now, but I'm still here for you.")
            return []

        result = response.json()[0]
        top_emotion = result[0]["label"].lower()
        confidence = result[0]["score"]

        # Emotion to utterance mapping
        emotion_to_utter = {
            "sadness": "utter_empathy_sadness",
            "joy": "utter_happy",
            "anger": "utter_deescalate_violence",
            "fear": "utter_anxious",
            "love": "utter_user-meditation",
            "surprise": "utter_ask",
            "neutral": "utter_neutral-response",
            "anxiety": "utter_anxious"
        }

        utter_response = emotion_to_utter.get(top_emotion)

        confidence_threshold = 0.6
        if confidence < confidence_threshold or top_emotion not in emotion_to_utter:
            dispatcher.utter_message(
                text="Thanks for sharing that. Would you like to talk more about how you're feeling?")
        else:
            utter_response = emotion_to_utter[top_emotion]
            dispatcher.utter_message(response=utter_response)

        return []

class ActionHandleUserReply(Action):
    def name(self):
        return "action_handle_user_reply"

    def run(self, dispatcher, tracker: Tracker, domain):
        last_message = tracker.latest_message.get('text', '')
        sentiment = TextBlob(last_message).sentiment.polarity

        if sentiment > 0.2:
            dispatcher.utter_message(text="Great! Let’s go deeper into that.")
            return []
        elif sentiment < -0.2:
            dispatcher.utter_message(text="No worries. If you ever want to come back to it, I’m here.")
            return []
        else:
            dispatcher.utter_message(text="That's okay. Would you like some gentle guidance or a quick breathing tip?")
            return []

class ActionLogSentiment(Action):
    def name(self) -> str:
        return "action_log_sentiment"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: dict) -> list:

        metadata = tracker.latest_message.get("metadata", {})
        user_id = metadata.get("email", tracker.sender_id)  # fallback if not found
        sentiment = tracker.latest_message.get("sentiment")
        score = tracker.latest_message.get("sentiment_score")

        if not sentiment:
            return []

        # Map sentiment to API-compatible mood values
        sentiment_map = {
            "positive": "happy",
            "neutral": "okay",
            "negative": "sad",
            "stressed": "stressed",
            "exhausted": "exhausted"
        }

        mood = sentiment_map.get(sentiment, "okay")  # fallback to 'okay' if unmapped

        payload = {
            "user_id": user_id,
            "mood": mood,
            "timestamp": datetime.utcnow().isoformat()
        }

        # Log to Flask API
        try:

            requests.post("http://localhost:5000/mood", json=payload)
        except Exception as e:
            print(f"Error logging sentiment: {e}")

        # Optional empathetic feedback
        if mood == "sad":
            dispatcher.utter_message(text="I'm here to support you. Would you like to talk more about what's bothering you?")
        elif mood == "happy":
            dispatcher.utter_message(text="That's great to hear! 😊")
        elif mood == "stressed":
            dispatcher.utter_message(text="Stress can be overwhelming. Let's work through it together.")
        elif mood == "exhausted":
            dispatcher.utter_message(text="It sounds like you're really drained. I'm here if you want to share what's going on.")
        else:
            dispatcher.utter_message(text="Thanks for sharing how you're feeling.")

        return [SlotSet("sentiment", sentiment), SlotSet("sentiment_score", score), SlotSet("mood", mood)]

class ActionProvideStudyResources(Action):
    def name(self) -> Text:
        return "action_provide_study_resources"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        resource_link = "https://www.mindtools.com/pages/main/newMN_HTE.htm"  # example: time management for students
        dispatcher.utter_message(text=f"You can also check out this resource for study strategies: {resource_link}")
        return []