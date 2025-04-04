import React from 'react';

const PHQ9_QUESTIONS=[
"Little interest or pleasure in doing things?",
"Feeling down, depressed, or hopeless?",
"Trouble falling or staying asleep, or sleeping too much?",
"Feeling tired or having little energy?",
"Poor appetite or overeating?",
"Feeling bad about yourself — or that you are a failure or have let yourself or your family down?",
"Trouble concentrating on things, such as reading the newspaper or watching television?",
"Moving or speaking so slowly that other people could have noticed? Or so fidgety or restless that you have been moving a lot more than usual?",
"Thoughts that you would be better off dead, or thoughts of hurting yourself in some way?"
]

const FAD6_QUESTIONS=[
"Feeling nervous, anxious, or on edge",
"Not being able to stop or control worrying",
"Worrying too much about different things",
"Trouble relaxing",
"Being so restless that it's hard to sit still",
"Becoming easily annoyed or irritable",
"Feeling afraid as if something awful might happen"
]

const OPTIONS=[
    {label: "Not at all",value:0},
    {label: "Several days",value:1},
    {label: "More than half the days",value:2},
    {label: "Nearly every day",value:3}
]

const Questionnaire = () => {
  const [phq9Answers, setPhq9Answers] = useState(Array(9).fill(0));
  const [gad7Answers, setGad7Answers] = useState(Array(7).fill(0));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (index, value, setFunc, answers) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setFunc(newAnswers);
  };

  const handleSubmit = () => {
    const phq9Score = phq9Answers.reduce((a, b) => a + b, 0);
    const gad7Score = gad7Answers.reduce((a, b) => a + b, 0);
    const result = { date: new Date().toISOString(), phq9Score, gad7Score };
    localStorage.setItem("mentalHealthScores", JSON.stringify(result));
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>PHQ-9 Depression Test</h2>
      {PHQ9_QUESTIONS.map((q, i) => (
        <div key={i}>
          <p>{i + 1}. {q}</p>
          {OPTIONS.map((opt, j) => (
            <label key={j} style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name={`phq9-${i}`}
                value={opt.value}
                checked={phq9Answers[i] === opt.value}
                onChange={() => handleSelect(i, opt.value, setPhq9Answers, phq9Answers)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      ))}

      <h2>GAD-7 Anxiety Test</h2>
      {GAD7_QUESTIONS.map((q, i) => (
        <div key={i}>
          <p>{i + 1}. {q}</p>
          {OPTIONS.map((opt, j) => (
            <label key={j} style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name={`gad7-${i}`}
                value={opt.value}
                checked={gad7Answers[i] === opt.value}
                onChange={() => handleSelect(i, opt.value, setGad7Answers, gad7Answers)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit} style={{ marginTop: "20px" }}>Submit</button>

      {submitted && (
        <div>
          <h3>Results Saved</h3>
          <p>PHQ-9 Score: {phq9Answers.reduce((a, b) => a + b, 0)}</p>
          <p>GAD-7 Score: {gad7Answers.reduce((a, b) => a + b, 0)}</p>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
