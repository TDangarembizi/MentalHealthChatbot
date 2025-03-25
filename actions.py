from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class ActionOfferResources(Action):

    def name(self) -> Text:
        return "action_offer_resources"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Get the latest intent
        intent = tracker.latest_message['intent'].get('name')

        # Define resource links per intent
        resources = {
            "suicide": "https://www.samaritans.org/",
            "self_harm": "https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/behaviours/self-harm/",
            "depressed": "https://www.mind.org.uk/information-support/types-of-mental-health-problems/depression/",
            "anxious": "https://www.anxietyuk.org.uk/",
            "sleep": "https://www.sleepfoundation.org/sleep-hygiene",
            "substance_abuse": "https://www.talktofrank.com/",
            "eating_disorder": "https://www.beateatingdisorders.org.uk/"
        }

        # Default fallback link
        default_link = "https://www.mind.org.uk/"

        # Select appropriate resource
        selected_link = resources.get(intent, default_link)

        # Send message to user
        dispatcher.utter_message(text=f"You might find this helpful: [Click here]({selected_link})")

        return []

