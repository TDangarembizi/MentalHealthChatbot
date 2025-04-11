import yaml

def load_yaml_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)

# Load domain.yml
domain = load_yaml_file("domain.yml")
domain_intents = set(domain.get("intents", []))
domain_actions = set(domain.get("actions", []))
domain_actions.update(domain.get("responses", {}).keys())  # include utter_ responses

# Load NLU data
nlu_data = load_yaml_file("data/nlu.yml")
nlu_intents = {item["intent"] for item in nlu_data.get("nlu", [])}

# Load stories and rules
def extract_intents_actions(file):
    data = load_yaml_file(file)
    intents = set()
    actions = set()
    for story in data.get("data/stories", []) + data.get("rules", []):
        for step in story.get("steps", []):
            if "intent" in step:
                intents.add(step["intent"])
            if "action" in step:
                actions.add(step["action"])
    return intents, actions

stories_intents, stories_actions = extract_intents_actions("data/stories.yml")
rules_intents, rules_actions = extract_intents_actions("data/rules.yml")

all_used_intents = nlu_intents | stories_intents | rules_intents
all_used_actions = stories_actions | rules_actions

# Check what's missing from domain
missing_intents = all_used_intents - domain_intents
missing_actions = all_used_actions - domain_actions

# Print results
print("Missing Intents in domain.yml:")
for intent in sorted(missing_intents):
    print(f"- {intent}")

print("Missing Actions in domain.yml:")
for action in sorted(missing_actions):
    print(f"- {action}")
