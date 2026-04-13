import { Link } from "react-router"
import "../style/landing.scss"
import SiteHeader from "../../../components/SiteHeader"

const SERVICES = [
    {
        title: "Interview Match Analysis",
        description: "Upload your resume or add a quick profile summary and compare it against a target role with a focused match score."
    },
    {
        title: "Question Preparation",
        description: "Get tailored technical and behavioral questions with interviewer intent and answer guidance for the job you want."
    },
    {
        title: "Resume Refinement",
        description: "Generate a cleaner, role-specific PDF resume that emphasizes the experience and skills the job description actually values."
    }
]

const WORKFLOW = [
    "Paste the target job description.",
    "Add your resume or a concise self-description.",
    "Review the generated plan, skill gaps, and practice questions."
]

const Landing = () => {
    return (
        <div className="landing-shell">
            <SiteHeader />

            <main className="landing-page">
                <section className="landing-hero">
                    <div className="landing-hero__copy">
                        <span className="landing-badge">AI-powered interview preparation</span>
                        <h1>Prepare for the right role with a sharper resume and a focused interview plan.</h1>
                        <p>
                            ResumeO analyzes your profile against a specific job description, identifies fit and skill gaps,
                            suggests likely questions, and builds a practical roadmap for interview prep.
                        </p>

                        
                    </div>

                    <div className="landing-hero__panel">
                        <div className="hero-panel">
                            <div className="hero-panel__row">
                                <span className="hero-panel__label">What ResumeO does</span>
                                <span className="badge badge--best">3 core services</span>
                            </div>
                            <h2>One workflow for resume targeting, interview prep, and preparation planning.</h2>
                            <ul className="hero-panel__list">
                                {WORKFLOW.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="landing-services">
                    <div className="section-heading">
                        <h2>Services You Get</h2>
                        <p>Everything stays centered on the same target role, so the output is more usable than generic resume advice.</p>
                    </div>

                    <div className="service-grid">
                        {SERVICES.map((service) => (
                            <article key={service.title} className="service-card">
                                <span className="service-card__eyebrow">Service</span>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Landing
