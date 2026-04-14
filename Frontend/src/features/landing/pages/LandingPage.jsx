import React from "react";
import { Link, useNavigate } from "react-router";
import "../../landing/style/landing.scss";
import { useAuth } from "../../auth/hooks/useAuth";
import AppLoader from "../../../components/AppLoader";


const FLOW_STEPS = [
  {
    step: "01",
    title: "Upload Resume",
    desc: "Add your resume or profile details to start the analysis.",
    accent: "cyan",
  },
  {
    step: "02",
    title: "Paste Job Description",
    desc: "Provide the target role so the platform understands what matters.",
    accent: "pink",
  },
  {
    step: "03",
    title: "AI Analysis",
    desc: "We compare your profile, detect gaps, and identify likely interview focus areas.",
    accent: "violet",
  },
  {
    step: "04",
    title: "Get Strategy",
    desc: "Receive a focused preparation roadmap, match score, and role-specific guidance.",
    accent: "cyan",
  },
];


const FEATURES = [
  {
    title: "AI-Powered Interview Plans",
    desc: "Generate a tailored interview preparation plan based on your resume, background, and target role.",
  },
  {
    title: "Job Description Matching",
    desc: "Paste any job description and get preparation aligned with the exact requirements of the role.",
  },
  {
    title: "Technical + Behavioral Prep",
    desc: "Get likely technical and behavioral questions with structured preparation guidance.",
  },
  {
    title: "Preparation Roadmap",
    desc: "Receive a focused roadmap so you know what to prepare first and where your gaps are.",
  },
];

const LandingPage = () => {
  const { user, loading, handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate("/");
  };

  if (loading) {
  return <AppLoader text="Preparing your experience" />;
}

  return (
    <div className="landing-page">
      <div className="landing-bg-orb landing-bg-orb--one" />
      <div className="landing-bg-orb landing-bg-orb--two" />

      <header className="landing-navbar">
        

        <div className="landing-navbar__actions">
          {!user ? (
            <>
              <Link to="/login" className="nav-btn nav-btn--primary">
                Log In
              </Link>
              <Link to="/register" className="nav-btn nav-btn--ghost">
                Register
              </Link>
              
            </>
          ) : (
            <button onClick={onLogout} className="nav-btn nav-btn--ghost">
              Logout
            </button>
          )}
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-section__left">
          <span className="hero-badge">Smart interview preparation</span>
          <h1>
            Build a sharper <span className="highlight">interview strategy</span>{" "}
            in minutes
          </h1>
          <p>
            Upload your resume, paste your target job description, and get a
            personalized interview plan with question prep, skill-gap insights,
            and a focused roadmap.
          </p>

          <div className="hero-cta">
            {!user ? (
              <>
                <Link to="/login" className="hero-btn hero-btn--primary">
                  Log In
                </Link>
                <Link to="/register" className="hero-btn hero-btn--secondary">
                  Create Account
                </Link>
              </>
            ) : (
              <button
                onClick={() => navigate("/home")}
                className="hero-btn hero-btn--primary"
              >
                Generate My Plan
              </button>
            )}
          </div>

          <div className="hero-stats">
            <div className="hero-stat-card">
              <h3>Targeted</h3>
              <p>Prep based on your role and profile</p>
            </div>
            <div className="hero-stat-card">
              <h3>Focused</h3>
              <p>Know what matters most before the interview</p>
            </div>
            <div className="hero-stat-card">
              <h3>Practical</h3>
              <p>Questions, answers, and roadmap in one place</p>
            </div>
          </div>
        </div>

        <div className="hero-section__right">
          <div className="preview-card">
            <div className="preview-card__top">
              <span className="preview-pill">AI Analysis</span>
              <span className="preview-pill preview-pill--accent">Match Score</span>
            </div>

            <h2>What the platform gives you</h2>

            <div className="preview-list">
              <div className="preview-item">
                <span className="preview-dot" />
                Technical interview questions
              </div>
              <div className="preview-item">
                <span className="preview-dot" />
                Behavioral question preparation
              </div>
              <div className="preview-item">
                <span className="preview-dot" />
                Skill-gap identification
              </div>
              <div className="preview-item">
                <span className="preview-dot" />
                Personalized preparation roadmap
              </div>
            </div>

            <div className="preview-score">
              <div className="preview-score__ring">
                <span>84%</span>
              </div>
              <div>
                <h3>Example Match Score</h3>
                <p>See how strongly your current profile aligns with the role.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flow-section">
        <div className="section-heading">
          <span>How it works</span>
          <h2>From resume to roadmap in four smart steps</h2>
        </div>

        <div className="flowchart-grid">
          {FLOW_STEPS.map((item, index) => (
            <React.Fragment key={item.step}>
              <div className={`flow-card flow-card--${item.accent}`}>
                <span className="flow-card__step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>

              {index < FLOW_STEPS.length - 1 && (
                <div className="flow-connector" aria-hidden="true">
                  <span className="flow-connector__line" />
                  <span className="flow-connector__dot" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
      <section className="features-section">
        <div className="section-heading">
          <span>Features</span>
          <h2>Everything you need to prepare smarter</h2>
        </div>

        <div className="features-grid">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;