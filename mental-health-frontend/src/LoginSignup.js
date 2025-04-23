import logo from './logo.svg'; // adjust the path if needed
import React, { useState } from 'react';
import { auth, db } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import bcrypt from 'bcryptjs';

const LoginSignup = ({ onLogin }) => {
  const [alias, setAlias] = useState('');
  const [password, setPassword] = useState('');
  const [recoveryKey, setRecoveryKey] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showRecovery, setShowRecovery] = useState(false);
  const [showRecoveryForm, setShowRecoveryForm] = useState(false);
  const [newRecoveryKey, setNewRecoveryKey] = useState('');
  const [message, setMessage] = useState('');

  const fakeEmail = (alias) => `${alias}@alias.local`;

  const generateRecoveryKey = () =>
    Math.random().toString(36).slice(2, 10) + '-' + Math.random().toString(36).slice(2, 10);

const handleSignup = async () => {
  try {
    const email = fakeEmail(alias); // e.g., hey@alias.local
    const recovery = generateRecoveryKey();
    const hashedRecovery = await bcrypt.hash(recovery, 10);

    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: alias });

    const uid = auth.currentUser.uid;

    localStorage.setItem("uid", uid);
    localStorage.setItem("userEmail", email);

await fetch("http://localhost:5000/recovery", {

  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    user_email: uid,
    recovery_hash: hashedRecovery
  })
});

    setNewRecoveryKey(recovery);
    setShowRecovery(true);
    setMessage("Account created. Save your recovery key!");
  } catch (err) {
    setMessage(err.message);
  }
};

  const handleLogin = async () => {
  try {
    const email = fakeEmail(alias);

    await signInWithEmailAndPassword(auth, email, password);

    //Store the generated email
    localStorage.setItem("userEmail", email);
    localStorage.setItem("uid", auth.currentUser.uid);

    setMessage("Login successful.");
    onLogin();  // Triggers the logged-in state

    console.log("Logging in as alias:", alias);
    console.log("Derived email:", fakeEmail(alias));
    console.log("UID: ", localStorage.getItem("uid"));

    const token = await auth.currentUser.getIdToken();
    console.log("Firebase ID Token:", token);
  } catch (err) {
    setMessage(err.message);
  }
};


  const handleRecovery = async () => {

  try {
    const response = await fetch("http://localhost:5000/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        alias,
        recovery_key: recoveryKey,
        new_password: password
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Password reset failed");
    }
    setMessage("Password reset successful.");
  } catch (err) {
    setMessage(err.message);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setShowRecovery(false);
    if (isLogin) {
      await handleLogin();
    } else {
      await handleSignup();
    }
  };

  return (
      <div style={{padding: "2rem", maxWidth: "500px", margin: "auto"}}>
        <div className="login-header" style={{textAlign: 'center', marginBottom: '1.5rem'}}>
          <img src={logo} alt="Logo" className="app-logo" style={{height: '80px'}}/>
          <h1 className="app-title" style={{margin: '1rem 0', color: 'var(--text-color)'}}>
            Mental Health Chatbot
          </h1>
        </div>

        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {!showRecoveryForm && (
            <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  placeholder="Enter alias"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  required
              /><br/>
              <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              /><br/>
              {!isLogin && (
                  <p><strong>You'll receive a recovery key after signup. Save it securely.</strong></p>
              )}
              <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
        )}

        {!showRecoveryForm && (
            <>
              <button onClick={() => setIsLogin(!isLogin)} style={{marginTop: "10px"}}>
                {isLogin ? "Need an account? Sign Up" : "Already have one? Log In"}
              </button>

              {isLogin && (
                  <p style={{textAlign: 'center'}}>
                    <button
                        onClick={() => setShowRecoveryForm(true)}
                        className="link-button"
                    >
                      Forgot password?
                    </button>
                  </p>
              )}
            </>
        )}

        {showRecoveryForm && (
            <div style={{marginTop: "2rem"}}>
              <h4>Password Recovery</h4>
              <input
                  type="text"
                  placeholder="Alias"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
              /><br/>
              <input
                  type="text"
                  placeholder="Recovery Key"
                  value={recoveryKey}
                  onChange={(e) => setRecoveryKey(e.target.value)}
              /><br/>
              <input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              /><br/>
              <button onClick={handleRecovery}>Reset Password</button>

              <p style={{textAlign: 'center', marginTop: '1rem'}}>
                <button
                    onClick={() => setShowRecoveryForm(false)}
                    className="link-button"
                >
                  Back to login
                </button>

              </p>
            </div>
        )}

        {message && <p style={{color: "blue", marginTop: "1rem"}}>{message}</p>}

        {showRecovery && (
            <div style={{marginTop: "1rem", border: "1px dashed #999", padding: "1rem"}}>
              <h4>🎯 Your Recovery Key (SAVE THIS!):</h4>
              <code>{newRecoveryKey}</code>
            </div>
        )}
      </div>
  );
};

export default LoginSignup;