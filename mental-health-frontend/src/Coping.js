import './Coping.css';
import { useState } from 'react';

const Coping = () => {
  const [journalText, setJournalText] = useState("");
  const [saveMsg, setSaveMsg] = useState("");

  const handleJournalSave = async () => {
    const user_id = localStorage.getItem("uid");

    if (!journalText || !user_id) return;

    const payload = {
      text: journalText,
      timestamp: new Date().toISOString()
    };

    const res = await fetch("http://localhost:5000/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user_id, ...payload })
    });

    if (res.ok) {
      setSaveMsg("📝 Saved!");
      setJournalText("");
      setTimeout(() => setSaveMsg(""), 3000);
    } else {
      setSaveMsg("❌ Error saving entry");
    }
  };

  const strategies = [
    {
      title: "📝 Journaling",
      description: "Write down how you're feeling today. Even a few sentences can help organise your thoughts.",
      journaling: true
    },
    {
      title: "🌬️ Deep Breathing",
      description: "Try box breathing: Inhale for 4 seconds, hold for 4, exhale for 4, hold again for 4.",
      videoUrl: "https://www.youtube.com/embed/oN8xV3Kb5-Q"
    },
    {
      title: "🧘 Guided Meditation",
      description: "Let go of stress and tension with this short mindfulness exercise.",
      videoUrl: "https://www.youtube.com/embed/inpok4MKVLM"
    },
    {
      title: "🚶 Movement Break",
      description: "Follow along with this simple stretching routine to reset and relax.",
      videoUrl: "https://www.youtube.com/embed/qULTwquOuT4"
    },
    {
      title: "🫂 Talk to Someone",
      description: "When you're overwhelmed, reaching out can make all the difference. Even a short chat can help."
    }
  ];

  return (
    <div className="strategy-grid">
      {strategies.map((s, i) => (
        <div key={i} className="strategy-card">
          <h3>{s.title}</h3>
          <p>{s.description}</p>

          {s.videoUrl && (
            <div className="video-wrapper">
              <iframe
                width="100%"
                height="200"
                src={s.videoUrl}
                title={`Video for ${s.title}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {s.journaling && (
            <div className="journal-box">
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="Start writing here..."
              />
              <button onClick={handleJournalSave}>Save Entry</button>
              {saveMsg && <p className="save-msg">{saveMsg}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Coping;
