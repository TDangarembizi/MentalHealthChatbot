import json
import yaml
from pathlib import Path

# Load JSON
with open("/Users/Tino/Downloads/KB_cleaned.json", "r", encoding="utf-8") as f:
    kb_data = json.load(f)

# Initialize domain structure
domain_yaml = {
    "version": "3.1",
    "responses": {}
}

# Convert responses from JSON into Rasa format
for intent in kb_data["intents"]:
    tag = intent["tag"]
    responses = intent.get("responses", [])

    if responses:
        domain_yaml["responses"][f"utter_{tag}"] = [{"text": r} for r in responses]

# Save to domain.yml
Path("data/domain2.yml").write_text(yaml.dump(domain_yaml, allow_unicode=True, sort_keys=False))
print("Responses added to domain.yml successfully.")
