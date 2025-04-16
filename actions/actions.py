from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import requests
from typing import Any, Text, Dict, List
from datetime import datetime

class ActionLogSentiment(Action):
    def name(self) -> str:
        return "action_log_sentiment"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: dict) -> list:

        user_id = tracker.sender_id
        sentiment = tracker.latest_message.get("sentiment")
        score = tracker.latest_message.get("sentiment_score")

        if not sentiment:
            return []

        # Log to Firebase or your Flask API
        try:
            data = {
                "user_id": user_id,
                "mood": sentiment,
                "score": score,
                "timestamp": datetime.utcnow().isoformat()
            }
            requests.post("http://localhost:5000/mood", json=data)
        except Exception as e:
            print(f"Error logging sentiment: {e}")

        # Optional feedback
        if sentiment == "negative":
            dispatcher.utter_message(text="I'm here to support you. Would you like to talk more about what's bothering you?")
        elif sentiment == "positive":
            dispatcher.utter_message(text="That's great to hear! 😊")
        else:
            dispatcher.utter_message(text="Thanks for sharing how you're feeling.")

        return [SlotSet("sentiment", sentiment), SlotSet("sentiment_score", score)]

class ActionProvideStudyResources(Action):
    def name(self) -> Text:
        return "action_provide_study_resources"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        resource_link = "https://www.mindtools.com/pages/main/newMN_HTE.htm"  # example: time management for students
        dispatcher.utter_message(text=f"You can also check out this resource for study strategies: {resource_link}")
        return []