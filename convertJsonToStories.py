import json
import yaml
from pathlib import Path

# Load your JSON file (update path if needed)
with open("/Users/Tino/Downloads/KB_cleaned.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Prepare stories
stories_yaml = {
    "version": "3.1",
    "stories": []
}

for intent_block in data.get("intents", []):
    intent = intent_block["tag"].strip().lower().replace(" ", "_")  # e.g., 'anxiety'

    story = {
        "story": f"{intent}_story",
        "steps": [
            {"intent": intent},
            {"action": f"utter_{intent}"}
        ]
    }

    stories_yaml["stories"].append(story)

# Save to stories.yml
Path("data").mkdir(parents=True, exist_ok=True)
with open("data/stories2.yml", "w", encoding="utf-8") as f:
    yaml.dump(stories_yaml, f, allow_unicode=True, sort_keys=False)

print("Successfully generated `stories.yml` from KB.json")
