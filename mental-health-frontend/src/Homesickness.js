import React from 'react';
import './Advice.css';

const Homesickness = ({ setView }) => {
   return (
       <div className="advice-container">
         <button
             onClick={() => setView('resources')}
             style={{
               backgroundColor: 'transparent',
               border: '1px solid var(--text-color)',
               color: 'var(--text-color)',
               padding: '0.4rem 1rem',
               borderRadius: '6px',
               cursor: 'pointer',
               fontSize: '1rem',
               marginBottom: '1.5rem',
               display: 'inline-block',
             }}
             aria-label="Back to Resources"
         >Back
         </button>
         <h1>Managing Homesickness</h1>
         <h2>Understanding Homesickness</h2>

         <iframe width="634" height="351" src="https://www.youtube.com/embed/wWrtHz6XshI"
                 title="CGI 3D Animated Short: &quot;Homesick&quot; - by Amabel Emillavta | TheCGBros" frameBorder="0"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                 referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

         <section>
           <ul>
             <li className="advice-card">
               <strong>What is Homesickness?</strong>
               Homesickness is the emotional distress experienced when you're away from your familiar environment. It's
               a
               common response to significant life changes, such as moving for work, study, or other reasons.
             </li>
             <li className="advice-card">
               <strong>Common Causes:</strong>
               Disruption of daily routines, cultural differences, difficulty adapting to new environments, and feelings
               of not belonging can contribute to homesickness.
             </li>
           </ul>
         </section>

         <section>
           <h2>Effects of Homesickness</h2>
           <ul>
             <li className="advice-card">
               <strong>Mental Health Impact:</strong>
               Homesickness can lead to symptoms similar to depression, including persistent sadness, sleep
               disturbances,
               and social withdrawal.
             </li>
             <li className="advice-card">
               <strong>Physical Symptoms:</strong>
               It may manifest physically through headaches, fatigue, stomach issues, and changes in appetite.
             </li>
             <li className="advice-card">
               <strong>Productivity Challenges:</strong>
               Difficulty concentrating and decreased motivation can affect performance at work or school.
             </li>
           </ul>
         </section>

         <section>
           <h2>Coping Strategies</h2>
           <ul>
             <li className="advice-card">
               <strong>Establish New Routines:</strong>
               Creating a daily schedule can provide structure and a sense of normalcy in your new environment.
             </li>
             <li className="advice-card">
               <strong>Engage in Activities:</strong>
               Participating in local events, classes, or sports can help you meet new people and integrate into the
               community.
             </li>
             <li className="advice-card">
               <strong>Stay Connected:</strong>
               Regularly communicate with friends and family back home through calls, messages, or video chats, but
               balance this with efforts to build new relationships.
             </li>
             <li className="advice-card">
               <strong>Explore Your Surroundings:</strong>
               Discovering new favorite spots, like a cozy café or a peaceful park, can help you feel more at home.
             </li>
             <li className="advice-card">
               <strong>Practice Self-Care:</strong>
               Ensure you're eating well, getting enough sleep, and engaging in activities that bring you joy.
             </li>
             <li className="advice-card">
               <strong>Seek Support:</strong>
               Don't hesitate to talk to a counselor or join support groups to share your experiences and feelings.
             </li>
           </ul>
         </section>

         <section>
           <h2>Additional Resources</h2>
           <div className="advice-card">
             <strong>Further Reading:</strong>
             <p>
               For more information on homesickness and mental health, visit the following resource:
               <br/>
               <a href="https://www.webmd.com/mental-health/what-to-know-about-homesickness-and-mental-health"
                  target="_blank" rel="noopener noreferrer">
                 WebMD: What to Know About Homesickness and Mental Health
               </a>
             </p>
           </div>
         </section>
       </div>
   );
};

export default Homesickness;
