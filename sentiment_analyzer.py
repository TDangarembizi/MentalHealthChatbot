from typing import Any, Dict, List, Text

from rasa.engine.recipes.default_recipe import DefaultV1Recipe
from rasa.engine.graph import GraphComponent, ExecutionContext
from rasa.shared.nlu.training_data.message import Message
from rasa.shared.nlu.training_data.training_data import TrainingData
from rasa.engine.storage.resource import Resource
from rasa.engine.storage.storage import ModelStorage

from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer


@DefaultV1Recipe.register(
    component_types=["message_featurizer"],
    is_trainable=False
)
class SentimentAnalyzer(GraphComponent):
    def __init__(self, config: Dict[Text, Any]) -> None:
        self.analyzer = SentimentIntensityAnalyzer()

    def process(self, messages: List[Message]) -> List[Message]:
        for message in messages:
            text = message.get("text")
            score = self.analyzer.polarity_scores(text)["compound"]
            sentiment = "positive" if score > 0.3 else "negative" if score < -0.3 else "neutral"

            message.set("sentiment", sentiment)
            message.set("sentiment_score", score)

            print(f"[VADER] '{text}' → {sentiment} ({score})")

        return messages

    @staticmethod
    def create(
        config: Dict[Text, Any],
        model_storage: ModelStorage,
        resource: Resource,
        execution_context: ExecutionContext,
    ) -> "SentimentAnalyzer":
        return SentimentAnalyzer(config)
