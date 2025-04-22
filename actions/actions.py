from textblob import TextBlob
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import requests
from typing import Any, Text, Dict, List
from datetime import datetime

def ask_llama(prompt):
    instructions="You are an empathetic mental health chatbot. Respond with warmth, understanding, and keep replies brief (1–2 sentences max). "
    prompt=instructions+prompt.strip()
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": "llama3.2",
        "prompt": prompt,
        "stream": False
    }

    try:
        res = requests.post(url, json=payload, timeout=15)
        res.raise_for_status()
        data = res.json()
        return data.get("response", "I'm here to listen. Tell me more.")
    except Exception as e:
        print("LLaMA fallback error:", e)
        return "I'm here for you, even when it's hard to talk."
class ActionGptEmotionFallback(Action):
    def name(self) -> Text:
        return "action_gpt_emotion_fallback"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        user_message = tracker.latest_message.get("text", "")
        fallback_response = ask_llama(user_message)

        dispatcher.utter_message(text=fallback_response)
        return []

def resources(intent_name: str) -> str:
    resource_links = {
        "academic_stress": [
            ("😌 Coping with Academic Pressure", "https://www.counselling-directory.org.uk/blog/2020/09/01/dealing-with-academic-stress"),
            ("🧘 Study-Life Balance", "https://www.mind.org.uk/information-support/types-of-mental-health-problems/stress/"),
        ],
        "study_skills": [
            ("📚 Time Blocking for Students", "https://todoist.com/productivity-methods/time-blocking"),
            ("🧠 Spaced Repetition Explained", "https://www.supermemo.com/en/articles/20rules"),
        ],
        "work_life_balance": [
            ("⚖️ Managing Uni, Work, and Life", "https://www.bbc.com/worklife/article/20220504-how-to-achieve-a-work-study-life-balance"),
        ],
        "career": [
            ("💼 Graduate Career Guide", "https://www.prospects.ac.uk/careers-advice"),
            ("📈 Building a Student CV", "https://targetjobs.co.uk/careers-advice/cvs-and-cover-letters"),
        ],
        "homesick": [
            ("🏠 Coping with Homesickness", "https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/homesickness/"),
        ],
        "sleep": [
            ("😴 Sleep Tips for Students", "https://www.sleepfoundation.org/sleep-hygiene"),
        ],
        "meditation": [
            ("🧘 Headspace Basics", "https://www.headspace.com/meditation/meditation-for-beginners"),
            ("🎧 Guided Meditation", "https://www.youtube.com/watch?v=inpok4MKVLM"),
        ],
        "financial_struggle": [
            ("💸 Student Budgeting Advice", "https://www.moneyhelper.org.uk/en/everyday-money/budgeting/budgeting-for-students"),
        ],
        "accommodation_issues": [
            ("🏡 Tenancy Rights in the UK", "https://england.shelter.org.uk/housing_advice"),
        ],
        "imposter_syndrome": [
            ("🌱 Overcoming Imposter Syndrome", "https://hbr.org/2021/02/what-to-do-when-you-feel-like-a-fraud"),
        ],
        "anxious": [
            ("🫁 Breathing Exercises", "https://www.headspace.com/meditation/breathing-exercises"),
            ("🎧 Soothing Sounds", "https://www.calm.com/sleep"),
        ],
        "depressed": [
            ("💬 Student Minds Support", "https://www.studentminds.org.uk/"),
        ],
        "emotional_breakdown": [
            ("🛟 Emergency Coping Kit", "https://www.mentalhealth.org.uk/explore-mental-health/publications/how-manage-and-reduce-stress"),
        ],
        "sad": [
            ("📘 Tips to Boost Your Mood", "https://www.nhs.uk/every-mind-matters/"),
        ],
        "worthless": [
            ("🤝 You're Not Alone — Read This", "https://www.samaritans.org/"),
        ],
        "panic_attack": [
            ("🌀 How to Ground Yourself", "https://www.healthline.com/health/how-to-stop-a-panic-attack"),
        ],
        "substance_abuse": [
            ("📞 Talk to Talk to Frank", "https://www.talktofrank.com/"),
        ],
        "suicide": [
            ("🚨 Crisis Support (UK)", "https://www.samaritans.org/"),
            ("📞 Call 116 123 for free, 24/7 help", "https://www.samaritans.org/how-we-can-help/contact-samaritan/"),
        ],
        "self_harm": [
            ("💔 Coping Without Self-Harm", "https://www.nshn.co.uk/"),
        ],
        "eating_disorder": [
            ("🍽️ Beat Eating Disorders UK", "https://www.beateatingdisorders.org.uk/"),
        ],
        "social_struggles": [
            ("👥 Making Friends at Uni", "https://www.ucas.com/connect/blogs/how-make-friends-university"),
        ],
        "friends": [
            ("🤗 Building Healthy Friendships", "https://www.mentalhealth.org.uk/explore-mental-health/publications/guide-making-and-maintaining-friendships"),
        ],
        "death": [
            ("🕊️ Grief Support for Students", "https://www.cruse.org.uk/get-help/for-young-people/students/"),
        ],
        "harm_others": [
            ("📞 Need urgent help? Contact emergency services or [Samaritans](https://www.samaritans.org/)"),
        ]
    }

    if intent_name not in resource_links:
        return "I'm here to support you. Can you tell me more about what's going on?"

    return "Here are some helpful resources:\n\n"+"\n\n".join([f"{title}:\n{url}" for title, url in resource_links.get(intent_name, [])])



class ActionProvideSupportResources(Action):
    def name(self) -> Text:
        return "action_provide_support_resources"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        intent = tracker.latest_message['intent'].get('name')
        message = resources(intent)

        dispatcher.utter_message(text=message)
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
