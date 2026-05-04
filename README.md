# 🧠 Mental Health Chatbot with Personalised Support

A web-based AI-powered mental health support system designed to help university students manage stress, loneliness, and emotional wellbeing through conversational interaction, sentiment analysis, and personalised resource recommendations.

## 🎯 Project Motivation

University students often experience loneliness, academic pressure, and mental health challenges but may not seek immediate help due to stigma or accessibility barriers.  

This project explores how AI and natural language processing can provide **accessible, non-judgemental, and immediate emotional support**.

---

## 🚀 Key Features

- 💬 AI-powered chatbot for conversational mental health support
- 🧠 Sentiment analysis to detect user emotional state
- 📚 Personalised mental health resources and suggestions
- 📝 Journalling feature for self-reflection and mood tracking
- 🎮 Gamified engagement elements to encourage consistent usage
- 🔐 User authentication and secure data handling

---

## 🏗️ System Architecture

The system follows a modular client-server architecture:

- **Frontend:** Web interface for chat and journalling
- **Backend:** Flask API handling chatbot logic and user requests
- **AI Layer:** Rasa-based conversational model
- **Database:** Firebase for user data, logs, and session storage
- **Sentiment Engine:** NLP pipeline for emotion detection and classification

---

## 🛠️ Tech Stack

- Python
- Rasa (Conversational AI framework)
- Flask (Backend API)
- Firebase (Authentication + Database)
- Natural Language Processing (Sentiment Analysis)
- HTML, CSS, JavaScript (Frontend)

---

## 🧠 Core Components

### 1. Chatbot Engine
Handles user interaction using intent classification and dialogue management via Rasa.

### 2. Sentiment Analysis
Processes user input to detect emotional tone (e.g. stress, sadness, anxiety) and adapts responses accordingly.

### 3. Personalised Recommendations
Suggests coping strategies, articles, and support resources based on user emotional state.

### 4. Journalling System
Allows users to log daily thoughts and emotions for reflection and tracking progress.

### 5. Gamification Layer
Encourages consistent engagement through progress tracking and motivational feedback.

---

## 🔐 Data Privacy & Ethics

- User data is stored securely using Firebase
- No sensitive data is shared with third parties
- System is designed to avoid medical diagnosis and instead provide supportive guidance

---

## 📊 Outcomes

- Demonstrates how AI can be applied to mental health support systems
- Shows integration of NLP, backend systems, and user-centric design
- Highlights potential for scalable digital wellbeing tools in education environments

---

## 🚀 How to Run the Project

### 1. Clone repository
```bash
git clone https://github.com/TDangarembizi/MentalHealthChatbot.git
cd MentalHealthChatbot
```
### 2. Install dependencies
```bash
pip install -r requirements.txt
```
### 3. Run Flask backend
```bash
python app.py
```
### 4. Run Rasa chatbot
```bash
rasa run
rasa run actions
```
---
## 📈 Future Improvements

-Integration with GPT-based models for more advanced conversations
-Mobile app version
-Real-time crisis detection and escalation system
-Improved emotion detection using deep learning models
-Multi-language support
---
## 👤 Author

Tinotenda Dangarembizi
GitHub: https://github.com/TDangarembizi
---
## 📄 License

This project is intended for educational and research purposes.
