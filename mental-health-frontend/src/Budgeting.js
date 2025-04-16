import React from 'react';
import './Advice.css';

const Budgeting = ({ setView }) => {
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

      <h1>Student Budgeting Tips</h1>

      <section>
        <h2>1. Establish Your Income</h2>
        <ul>
          <li className="advice-card">
            <strong>Identify all income sources:</strong> Consider your Maintenance Loan, bursaries, parental contributions, part-time job earnings, and any savings.
          </li>
          <li className="advice-card">
            <strong>Understand payment schedules:</strong> Maintenance Loans are typically disbursed in termly installments, so plan accordingly to ensure funds last throughout the term.
          </li>
        </ul>
      </section>

      <section>
        <h2>2. Estimate Your Expenses</h2>
        <ul>
          <li className="advice-card">
            <strong>Essential expenses:</strong> Rent, groceries, utility bills, transportation, course materials, and insurance.
          </li>
          <li className="advice-card">
            <strong>Non-essential expenses:</strong> Dining out, entertainment, shopping, subscriptions, and travel.
          </li>
          <li className="advice-card">
            <strong>Review past spending:</strong> Analyze previous bank statements to identify spending patterns and areas to cut back.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Calculate Your Weekly Budget</h2>
        <ul>
          <li className="advice-card">
            <strong>Determine term income:</strong> Sum up all income sources for the term.
          </li>
          <li className="advice-card">
            <strong>Subtract essential expenses:</strong> Deduct total essential expenses from your term income.
          </li>
          <li className="advice-card">
            <strong>Divide by weeks:</strong> Divide the remaining amount by the number of weeks in the term to establish your weekly budget for non-essential spending.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Set Financial Goals</h2>
        <ul>
          <li className="advice-card">
            <strong>Identify areas to cut back:</strong> For example, reduce takeaway expenses or limit subscription services.
          </li>
          <li className="advice-card">
            <strong>Explore additional income opportunities:</strong> Consider part-time work, freelance gigs, or selling unused items.
          </li>
          <li className="advice-card">
            <strong>Use budgeting tools:</strong> Utilize budgeting spreadsheets or apps to monitor and adjust your spending habits.
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Utilize Budgeting Tools</h2>
        <ul>
          <li className="advice-card">
            <strong>Budgeting spreadsheets:</strong> Use tools like
            <a href="https://www.savethestudent.org/student-budget-worksheet.xls"target="_blank" rel="noopener noreferrer"> Save the Student's budgeting spreadsheet </a>
          to track income and expenses.
          </li>
          <li className="advice-card">
            <strong>Budget calculators:</strong> Employ online calculators to estimate costs and plan accordingly.
          </li>
          <li className="advice-card">
            <strong>Budgeting apps:</strong> Apps like
            <a href="https://we83.adj.st/home?adj_t=1dj2rkno_1dxkjz95&adj_redirect=https%3A%2F%2Fmonzo.com%2Fsign-up&adj_engagement_type=fallback_click"target="_blank" rel="noopener noreferrer"> Monzo </a>
            or
            <a href="https://get.revolut.com/E528/?af_channel=website_organic&af_dp=revolut%3A%2F%2Fapp&af_sub1=%7B%22conversion_page_url%22%3A%22https%3A%2F%2Fwww.revolut.com%2F%22%2C%22cookie_consent%22%3A%5B%22ads%22%2C%22analytics%22%5D%2C%22landing_page_url%22%3A%22https%3A%2F%2Fwww.revolut.com%2F%22%2C%22qr_code%22%3Afalse%2C%22website_client_id%22%3A%2296a85b1c-9587-4659-b461-5ed21bb640a9%22%7D&deep_link_sub1=DEEPLINK&deep_link_value=revolut%3A%2F%2Fapp&pid=website&_gl=1*1pa7cza*_ga*MTQ2MDY4NTkxNC4xNzQ0ODIxNTkw*_ga_3Q2GNB8G11*MTc0NDgyMTU5MS4xLjEuMTc0NDgyMTc0NC4wLjAuMTMyNTAzMzI0Mw..*_gcl_au*MjEwMTY4ODY1Ny4xNzQ0ODIxNTky*FPAU*MjEwMTY4ODY1Ny4xNzQ0ODIxNTky"target="_blank" rel="noopener noreferrer"> Revolut </a>
            can help categorize spending and set savings goals.
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Avoid Common Money Mistakes</h2>
        <ul>
          <li className="advice-card">
            <strong>Not having a budget:</strong> Failing to plan can lead to overspending and financial stress.
          </li>
          <li className="advice-card">
            <strong>Ignoring small expenses:</strong> Regular small purchases can accumulate and impact your budget significantly.
          </li>
          <li className="advice-card">
            <strong>Overusing credit:</strong> Relying heavily on credit cards or overdrafts can lead to debt accumulation.
          </li>
        </ul>
      </section>

      <section>
        <h2>Additional Resources</h2>
        <div className="advice-card">
          <strong>Further Reading:</strong>
          <p>
            For more detailed guidance on student budgeting, visit the following resource:
            <br />
            <a href="https://www.savethestudent.org/money/student-budgeting/student-budgeting.html" target="_blank" rel="noopener noreferrer">
              Save the Student: Student Budgeting Guide
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Budgeting;
