
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../api/client";

type Topic = {
  id: number | string;
  name: string;
  slug?: string;
  description?: string | null;
};

export default function TopicsPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();

  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadTopics() {
      const token = sessionStorage.getItem("vlab_access_token");

      if (!token) {
        navigate("/login", {
          replace: true,
          state: { from: { pathname: window.location.pathname } },
        });
        return;
      }

      if (!subjectId) {
        setError("No subject was selected.");
        setLoading(false);
        return;
      }

      try {
        const data = await apiRequest<Topic[]>(
          `/api/subjects/${encodeURIComponent(subjectId)}/topics`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!cancelled) {
          setTopics(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (cancelled) return;

        const message =
          err instanceof Error ? err.message : "Unable to load topics.";

        if (message.includes("401") || message.includes("403")) {
          sessionStorage.removeItem("vlab_access_token");
          navigate("/login", {
            replace: true,
            state: { from: { pathname: window.location.pathname } },
          });
          return;
        }

        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadTopics();

    return () => {
      cancelled = true;
    };
  }, [subjectId, navigate]);

  return (
    <div className="topics-page">
      <style>{`
        .topics-page {
          min-height: 100vh;
          background: #f5f7fb;
          color: #15213b;
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        }
        .topics-page * { box-sizing: border-box; }
        .topics-nav {
          min-height: 76px;
          padding: 0 7%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: white;
          border-bottom: 1px solid #e9edf5;
        }
        .topics-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          color: #15213b;
          text-decoration: none;
          font-size: 21px;
          font-weight: 800;
        }
        .topics-logo {
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #2459e8;
          color: white;
          font-size: 22px;
        }
        .topics-nav-link {
          color: #596781;
          text-decoration: none;
          font-size: 14px;
          font-weight: 650;
        }
        .topics-main {
          width: min(1160px, 88%);
          margin: auto;
          padding: 40px 0 70px;
        }
        .topics-breadcrumb {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-bottom: 25px;
          color: #8a95a9;
          font-size: 13px;
        }
        .topics-breadcrumb a {
          color: #65738c;
          text-decoration: none;
        }
        .topics-breadcrumb strong { color: #2459e8; }
        .topics-hero {
          position: relative;
          overflow: hidden;
          padding: 42px 46px;
          border-radius: 25px;
          color: white;
          background: linear-gradient(120deg, #122957, #1b48a3 65%, #2867e9);
          box-shadow: 0 18px 42px rgba(30,67,145,.13);
        }
        .topics-kicker {
          display: inline-block;
          padding: 8px 12px;
          margin-bottom: 18px;
          border: 1px solid rgba(255,255,255,.25);
          border-radius: 30px;
          background: rgba(255,255,255,.09);
          color: #dce7ff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.4px;
          text-transform: uppercase;
        }
        .topics-hero h1 {
          margin: 0;
          font-size: clamp(32px, 4vw, 45px);
          line-height: 1.15;
          letter-spacing: -1.5px;
        }
        .topics-hero p {
          max-width: 650px;
          margin: 15px 0 0;
          color: #d3def6;
          font-size: 15px;
          line-height: 1.8;
        }
        .topics-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 18px;
          margin: 40px 0 21px;
        }
        .topics-heading h2 {
          margin: 0;
          font-size: 25px;
          letter-spacing: -.7px;
        }
        .topics-heading p {
          margin: 8px 0 0;
          color: #7d899e;
          font-size: 14px;
          line-height: 1.6;
        }
        .topics-count {
          flex-shrink: 0;
          padding: 8px 12px;
          border: 1px solid #e2e8f3;
          border-radius: 10px;
          background: white;
          color: #66748d;
          font-size: 12px;
          font-weight: 700;
        }
        .topics-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }
        .topic-card {
          display: flex;
          flex-direction: column;
          min-height: 250px;
          padding: 24px;
          border: 1px solid #e7ebf3;
          border-radius: 19px;
          background: white;
          color: inherit;
          text-decoration: none;
          box-shadow: 0 5px 18px rgba(30,50,90,.025);
          transition: transform .18s ease, box-shadow .18s ease,
            border-color .18s ease;
        }
        .topic-card:hover {
          transform: translateY(-4px);
          border-color: #cad7ff;
          box-shadow: 0 15px 30px rgba(36,89,232,.09);
        }
        .topic-icon {
          display: grid;
          place-items: center;
          width: 53px;
          height: 53px;
          margin-bottom: 19px;
          border-radius: 15px;
          background: #edf2ff;
          font-size: 26px;
        }
        .topic-label {
          margin-bottom: 8px;
          color: #2459e8;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }
        .topic-card h3 {
          margin: 0;
          color: #1a2844;
          font-size: 18px;
        }
        .topic-card p {
          flex: 1;
          margin: 10px 0 20px;
          color: #7a879c;
          font-size: 13px;
          line-height: 1.7;
        }
        .topic-card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 15px;
          border-top: 1px solid #edf0f6;
          color: #2459e8;
          font-size: 13px;
          font-weight: 750;
        }
        .topic-arrow {
          display: grid;
          place-items: center;
          width: 31px;
          height: 31px;
          border-radius: 10px;
          background: #eef3ff;
          font-size: 18px;
        }
        .topics-status {
          padding: 28px;
          border: 1px solid #e7ebf3;
          border-radius: 16px;
          background: white;
          color: #6b7890;
          text-align: center;
          line-height: 1.7;
        }
        .topics-status strong {
          display: block;
          margin-bottom: 5px;
          color: #1a2844;
        }
        .topics-footer {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding: 23px 7%;
          border-top: 1px solid #e6eaf2;
          background: white;
          color: #8a95a9;
          font-size: 12px;
        }
        @media (max-width: 850px) {
          .topics-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .topics-hero { padding: 35px; }
        }
        @media (max-width: 600px) {
          .topics-nav { min-height: 66px; padding: 0 5%; }
          .topics-brand { font-size: 18px; }
          .topics-main { width: 90%; padding-top: 27px; }
          .topics-hero { padding: 29px 24px; border-radius: 20px; }
          .topics-hero h1 { font-size: 34px; }
          .topics-heading { align-items: start; margin-top: 32px; }
          .topics-heading h2 { font-size: 22px; }
          .topics-grid { grid-template-columns: 1fr; gap: 14px; }
          .topics-footer { flex-direction: column; gap: 8px; padding: 20px 5%; }
        }
      `}</style>

      <header className="topics-nav">
        <Link to="/" className="topics-brand">
          <span className="topics-logo">⌘</span>
          <span>V-Lab</span>
        </Link>
        <Link to="/branches" className="topics-nav-link">
          My Learning
        </Link>
      </header>

      <main className="topics-main">
        <div className="topics-breadcrumb">
          <Link to="/branches">Branches</Link>
          <span>/</span>
          <span>Subject {subjectId}</span>
          <span>/</span>
          <strong>Topics</strong>
        </div>

        <section className="topics-hero">
          <div className="topics-kicker">Explore the concepts</div>
          <h1>Discover your topics</h1>
          <p>
            Choose a topic to open its virtual laboratory. Each lab will
            guide you through theory, a pre-test, the experiment, and a
            post-test.
          </p>
        </section>

        <section>
          <div className="topics-heading">
            <div>
              <h2>Topics in this subject</h2>
              <p>Select a topic to view its virtual lab.</p>
            </div>
            <span className="topics-count">
              {loading ? "Loading..." : `${topics.length} topics`}
            </span>
          </div>

          {loading ? (
            <div className="topics-status">
              <strong>Loading topics...</strong>
              Preparing the topics for this subject.
            </div>
          ) : error ? (
            <div className="topics-status">
              <strong>Unable to load topics</strong>
              {error}
            </div>
          ) : topics.length === 0 ? (
            <div className="topics-status">
              <strong>No topics available yet</strong>
              Topics will appear here once they are added to this subject.
            </div>
          ) : (
            <div className="topics-grid">
              {topics.map((topic, index) => (
                <Link
                  key={topic.id}
                  to={`/topics/${topic.id}/labs`}
                  className="topic-card"
                >
                  <div className="topic-icon" aria-hidden="true">⚙️</div>
                  <div className="topic-label">
                    Topic {index + 1}
                  </div>
                  <h3>{topic.name}</h3>
                  <p>
                    {topic.description ||
                      `Learn about ${topic.name} and practise through its virtual laboratory.`}
                  </p>
                  <div className="topic-card-bottom">
                    <span>Open virtual lab</span>
                    <span className="topic-arrow">→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="topics-footer">
        <span>© {new Date().getFullYear()} V-Lab Virtual Laboratory</span>
        <span>Learn by doing. Build by exploring.</span>
      </footer>
    </div>
  );
}
