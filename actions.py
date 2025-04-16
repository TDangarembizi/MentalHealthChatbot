from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class ActionProvideStudyResources(Action):
    def name(self) -> Text:
        return "action_provide_study_resources"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        resource_link = "https://www.mindtools.com/pages/main/newMN_HTE.htm"  # example: time management for students
        dispatcher.utter_message(text=f"You can also check out this resource for study strategies: {resource_link}")
        return []
