
import { Link } from "react-router-dom";
import "../styles/landing.css";

const features = [
  {
    number: "01",
    icon: "⌘",
    title: "Learn by experimenting",
    description:
      "Explore engineering concepts through interactive, hands-on virtual experiments.",
  },
  {
    number: "02",
    icon: "◈",
    title: "Understand the theory",
    description:
      "Connect foundational concepts with the behavior you observe during an experiment.",
  },
  {
    number: "03",
    icon: "↗",
    title: "Build engineering intuition",
    description:
      "Test ideas, investigate outcomes, and develop a deeper understanding of engineering systems.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose your branch",
    description: "Start with your engineering discipline.",
  },
  {
    number: "02",
    title: "Explore a subject",
    description: "Find the concepts you want to understand.",
  },
  {
    number: "03",
    title: "Enter the lab",
    description: "Learn, experiment, and test your understanding.",
  },
];

export default function LandingPage() {
  return (
    <div className="landing">
      <header className="landing-nav">
        <Link to="/" className="brand" aria-label="VLab home">
          <span className="brand-mark">V</span>
          <span>vlab<span className="brand-period">.</span></span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <Link to="/branches">Explore labs</Link>
        </nav>

        <div className="nav-actions">
          <Link className="nav-login" to="/login">
            Sign in
          </Link>
          <Link className="button button-dark button-small" to="/branches">
            Get started <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" />
              A new way to learn engineering
            </div>

            <h1>
              Engineering is
              <br />
              better when you
              <br />
              <span className="hero-highlight">experiment.</span>
            </h1>

            <p className="hero-description">
              Move beyond theory. Explore engineering concepts through
              virtual labs designed to help you understand how things
              actually work.
            </p>

            <div className="hero-actions">
              <Link to="/branches" className="button button-dark">
                Explore virtual labs <span aria-hidden="true">↗</span>
              </Link>
              <a href="#how-it-works" className="button button-light">
                Discover VLab <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className="hero-note">
              <span className="note-icon">✳</span>
              <span>Learn concepts. Run experiments. Think like an engineer.</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Illustration of a virtual robotics workspace">
            <div className="visual-topbar">
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>
              <span>VLAB / SIMULATION SPACE</span>
              <span className="live-label">
                <span className="status-dot" /> PREVIEW
              </span>
            </div>

            <div className="simulation">
              <div className="simulation-grid" />
              <div className="axis axis-x" />
              <div className="axis axis-y" />

              <div className="sim-label label-top">
                <span>ROBOTICS</span>
                <strong>Interactive workspace</strong>
              </div>

              <svg
                className="robot-illustration"
                viewBox="0 0 420 330"
                role="img"
                aria-label="Stylized two-joint robotic arm"
              >
                <defs>
                  <linearGradient id="armGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#b9c8ff" />
                    <stop offset="100%" stopColor="#6178db" />
                  </linearGradient>
                  <linearGradient id="baseGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#eef2ff" />
                    <stop offset="100%" stopColor="#8da0ed" />
                  </linearGradient>
                </defs>

                <ellipse
                  cx="215"
                  cy="283"
                  rx="133"
                  ry="23"
                  fill="#5266b9"
                  opacity=".12"
                />

                <path
                  d="M122 254 L122 278 L302 278 L302 254"
                  fill="#d8def8"
                  stroke="#7b8fdc"
                  strokeWidth="1.5"
                />
                <path
                  d="M122 254 L212 216 L302 254 L212 291 Z"
                  fill="url(#baseGradient)"
                  stroke="#7b8fdc"
                  strokeWidth="1.5"
                />
                <path
                  d="M122 254 L212 291 L212 309 L122 272 Z"
                  fill="#a9b7ef"
                />
                <path
                  d="M212 291 L302 254 L302 272 L212 309 Z"
                  fill="#7488d5"
                />

                <path
                  d="M180 236 L163 150 L190 138 L211 220 Z"
                  fill="url(#armGradient)"
                  stroke="#566ecb"
                  strokeWidth="1.5"
                />
                <path
                  d="M163 150 L181 139 L190 138 L173 156 Z"
                  fill="#e1e7ff"
                />

                <path
                  d="M173 147 L245 91 L263 111 L190 167 Z"
                  fill="url(#armGradient)"
                  stroke="#566ecb"
                  strokeWidth="1.5"
                />
                <path
                  d="M245 91 L257 83 L275 104 L263 111 Z"
                  fill="#dbe3ff"
                />

                <path
                  d="M245 91 L265 104 L282 82 L267 70 Z"
                  fill="#91a4ef"
                  stroke="#566ecb"
                  strokeWidth="1.5"
                />

                <circle
                  cx="176"
                  cy="151"
                  r="21"
                  fill="#eef2ff"
                  stroke="#667bd1"
                  strokeWidth="2"
                />
                <circle cx="176" cy="151" r="8" fill="#657bd8" />
                <circle
                  cx="254"
                  cy="101"
                  r="18"
                  fill="#eef2ff"
                  stroke="#667bd1"
                  strokeWidth="2"
                />
                <circle cx="254" cy="101" r="7" fill="#657bd8" />

                <path
                  d="M267 72 L286 57 L296 65 L281 84"
                  fill="none"
                  stroke="#5269c8"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M291 59 L306 47 M296 65 L313 61"
                  stroke="#5269c8"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <circle cx="176" cy="151" r="28" fill="none" stroke="#7f94e6" strokeDasharray="3 5" />
                <circle cx="254" cy="101" r="25" fill="none" stroke="#7f94e6" strokeDasharray="3 5" />

                <path
                  d="M176 151 Q213 125 254 101"
                  fill="none"
                  stroke="#91a4ef"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                />
                <circle cx="254" cy="101" r="3" fill="#4058bb" />
              </svg>

              <div className="sim-coordinate">
                <span className="coordinate-dot" />
                <span>Joint configuration</span>
                <strong>θ₁ · θ₂</strong>
              </div>

              <div className="sim-side-label">
                <span className="side-label-dot" />
                <span>SIMULATION<br />ENVIRONMENT</span>
              </div>
            </div>

            <div className="visual-footer">
              <div>
                <span className="footer-label">LEARNING MODE</span>
                <strong>Explore & discover</strong>
              </div>
              <div>
                <span className="footer-label">EXPERIENCE</span>
                <strong>Virtual engineering</strong>
              </div>
              <span className="footer-symbol">↗</span>
            </div>
          </div>

          <div className="hero-index">
            <span>01</span>
            <span className="index-line" />
            <span>LEARN BY DOING</span>
          </div>
        </section>

        <section className="trust-strip" aria-label="Platform principles">
          <span>BUILT FOR CURIOSITY</span>
          <span className="trust-divider" />
          <span>DESIGNED FOR EXPERIMENTATION</span>
          <span className="trust-divider" />
          <span>ROOTED IN ENGINEERING</span>
        </section>

        <section className="features-section section-wrap" id="features">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WHY VLAB</p>
              <h2>Make concepts<br />come to life.</h2>
            </div>
            <p>
              Engineering makes more sense when you can see a system,
              change its behavior, and discover the reason behind the result.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.number}>
                <div className="feature-card-top">
                  <span className="feature-icon">{feature.icon}</span>
                  <span className="feature-number">{feature.number}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="feature-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="workflow-section" id="how-it-works">
          <div className="section-wrap workflow-inner">
            <div className="workflow-intro">
              <p className="eyebrow">YOUR LEARNING JOURNEY</p>
              <h2>From curiosity<br />to understanding.</h2>
              <p>
                A clear path from the engineering concept to hands-on
                experimentation.
              </p>
              <Link to="/branches" className="text-link">
                Start exploring <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="workflow-steps">
              {steps.map((step) => (
                <article className="workflow-step" key={step.number}>
                  <span className="workflow-number">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  <span className="workflow-arrow" aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section section-wrap">
          <div className="cta-card">
            <div className="cta-decoration" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="cta-copy">
              <p className="eyebrow">YOUR NEXT EXPERIMENT STARTS HERE</p>
              <h2>Think beyond<br />the textbook.</h2>
              <p>
                Explore engineering concepts in a space built for learning
                through experimentation.
              </p>
              <Link to="/branches" className="button button-white">
                Explore VLab <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="cta-mark" aria-hidden="true">V.</div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <Link to="/" className="brand">
          <span className="brand-mark">V</span>
          <span>vlab<span className="brand-period">.</span></span>
        </Link>
        <p>Learn by doing. Understand by exploring.</p>
        <span>© {new Date().getFullYear()} VLab</span>
      </footer>
    </div>
  );
}
