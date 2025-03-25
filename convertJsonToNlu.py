import json
import yaml
from pathlib import Path

# Support literal style (|) for examples
class LiteralStr(str): pass

def literal_str_representer(dumper, data):
    return dumper.represent_scalar('tag:yaml.org,2002:str', data, style='|')

yaml.add_representer(LiteralStr, literal_str_representer)
yaml.SafeDumper.add_representer(LiteralStr, literal_str_representer)

# Load your JSON
with open("/Users/Tino/Downloads/KB_cleaned.json", "r", encoding="utf-8") as f:
    data = json.load(f)

rasa_nlu = {
    "version": "3.1",
    "nlu": []
}

# Convert each intent
for intent in data["intents"]:
    tag = intent["tag"]
    examples = "\n".join(f"- {ex}" for ex in intent["patterns"])
    rasa_nlu["nlu"].append({
        "intent": tag,
        "examples": LiteralStr(examples)
    })

# Write to nlu.yml
Path("data").mkdir(parents=True, exist_ok=True)
with open("data/nlu2.yml", "w", encoding="utf-8") as f:
    yaml.dump(rasa_nlu, f, Dumper=yaml.SafeDumper, allow_unicode=True, sort_keys=False)

print("Converted JSON intents to Rasa `nlu.yml` format!")
