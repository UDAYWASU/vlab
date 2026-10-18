
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../api/client";

type Subject = {
  id: number | string;
  name: string;
  slug?: string;
  description?: string | null;
};

export default function SubjectsPage() {
  const { branchSlug } = useParams<{ branchSlug: string }>();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadSubjects() {
      const token = sessionStorage.getItem("vlab_access_token");

      if (!token) {
        navigate("/login", {
          replace: true,
          state: { from: { pathname: window.location.pathname } },
        });
        return;
      }

      if (!branchSlug) {
        setError("No branch was selected.");
        setLoading(false);
        return;
      }

      try {
        const data = await apiRequest<Subject[]>(
          `/api/branches/${encodeURIComponent(branchSlug)}/subjects`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!cancelled) {
          setSubjects(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (cancelled) return;

        const message =
          err instanceof Error ? err.message : "Unable to load subjects.";

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

    loadSubjects();

    return () => {
      cancelled = true;
    };
  }, [branchSlug, navigate]);

  const branchName = branchSlug
    ? branchSlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Branch";

  return (
    <div className="subjects-page">
      <style>{`
        .subjects-page {
          min-height: 100vh;
          background: #f5f7fb;
          color: #15213b;
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        }
        .subjects-page * { box-sizing: border-box; }
        .subjects-nav {
          min-height: 76px;
          padding: 0 7%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: white;
          border-bottom: 1px solid #e9edf5;
        }
        .subjects-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          color: #15213b;
          text-decoration: none;
          font-size: 21px;
          font-weight: 800;
        }
        .subjects-logo {
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #2459e8;
          color: white;
          font-size: 22px;
        }
        .subjects-nav-link {
          color: #596781;
          text-decoration: none;
          font-size: 14px;
          font-weight: 650;
        }
        .subjects-main {
          width: min(1160px, 88%);
          margin: auto;
          padding: 40px 0 70px;
        }
        .subjects-breadcrumb {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-bottom: 25px;
          color: #8a95a9;
          font-size: 13px;
        }
        .subjects-breadcrumb a {
          color: #65738c;
          text-decoration: none;
        }
        .subjects-breadcrumb strong { color: #2459e8; }
        .subjects-hero {
          position: relative;
          overflow: hidden;
          padding: 42px 46px;
          border-radius: 25px;
          color: white;
          background: linear-gradient(120deg, #122957, #1b48a3 65%, #2867e9);
          box-shadow: 0 18px 42px rgba(30,67,145,.13);
        }
        .subjects-kicker {
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
        .subjects-hero h1 {
          position: relative;
          margin: 0;
          font-size: clamp(32px, 4vw, 45px);
          line-height: 1.15;
          letter-spacing: -1.5px;
        }
        .subjects-hero p {
          position: relative;
          max-width: 650px;
          margin: 15px 0 0;
          color: #d3def6;
          font-size: 15px;
          line-height: 1.8;
        }
        .subjects-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 18px;
          margin: 40px 0 21px;
        }
        .subjects-heading h2 {
          margin: 0;
          font-size: 25px;
          letter-spacing: -.7px;
        }
        .subjects-heading p {
          margin: 8px 0 0;
          color: #7d899e;
          font-size: 14px;
          line-height: 1.6;
        }
        .subjects-count {
          flex-shrink: 0;
          padding: 8px 12px;
          border: 1px solid #e2e8f3;
          border-radius: 10px;
          background: white;
          color: #66748d;
          font-size: 12px;
          font-weight: 700;
        }
        .subjects-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }
        .subject-card {
          display: flex;
          flex-direction: column;
          min-height: 240px;
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
        .subject-card:hover {
          transform: translateY(-4px);
          border-color: #cad7ff;
          box-shadow: 0 15px 30px rgba(36,89,232,.09);
        }
        .subject-icon {
          display: grid;
          place-items: center;
          width: 53px;
          height: 53px;
          margin-bottom: 19px;
          border-radius: 15px;
          background: #edf2ff;
          font-size: 26px;
        }
        .subject-card h3 {
          margin: 0;
          color: #1a2844;
          font-size: 18px;
        }
        .subject-card p {
          flex: 1;
          margin: 10px 0 20px;
          color: #7a879c;
          font-size: 13px;
          line-height: 1.7;
        }
        .subject-card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 15px;
          border-top: 1px solid #edf0f6;
          color: #2459e8;
          font-size: 13px;
          font-weight: 750;
        }
        .subject-arrow {
          display: grid;
          place-items: center;
          width: 31px;
          height: 31px;
          border-radius: 10px;
          background: #eef3ff;
          font-size: 18px;
        }
        .subjects-status {
          padding: 28px;
          border: 1px solid #e7ebf3;
          border-radius: 16px;
          background: white;
          color: #6b7890;
          text-align: center;
          line-height: 1.7;
        }
        .subjects-status strong {
          display: block;
          margin-bottom: 5px;
          color: #1a2844;
        }
        .subjects-footer {
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
          .subjects-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .subjects-hero { padding: 35px; }
        }
        @media (max-width: 600px) {
          .subjects-nav { min-height: 66px; padding: 0 5%; }
          .subjects-brand { font-size: 18px; }
          .subjects-main { width: 90%; padding-top: 27px; }
          .subjects-hero { padding: 29px 24px; border-radius: 20px; }
          .subjects-hero h1 { font-size: 34px; }
          .subjects-heading { align-items: start; margin-top: 32px; }
          .subjects-heading h2 { font-size: 22px; }
          .subjects-grid { grid-template-columns: 1fr; gap: 14px; }
          .subjects-footer { flex-direction: column; gap: 8px; padding: 20px 5%; }
        }
      `}</style>

      <header className="subjects-nav">
        <Link to="/" className="subjects-brand">
          <span className="subjects-logo">⌘</span>
          <span>V-Lab</span>
        </Link>
        <Link to="/branches" className="subjects-nav-link">
          My Learning
        </Link>
      </header>

      <main className="subjects-main">
        <div className="subjects-breadcrumb">
          <Link to="/branches">Branches</Link>
          <span>/</span>
          <strong>{branchName}</strong>
          <span>/</span>
          <strong>Subjects</strong>
        </div>

        <section className="subjects-hero">
          <div className="subjects-kicker">Your learning path</div>
          <h1>Explore {branchName}</h1>
          <p>
            Choose a subject to discover its topics, understand the
            concepts, and prepare for hands-on virtual laboratory
            experiments.
          </p>
        </section>

        <section>
          <div className="subjects-heading">
            <div>
              <h2>Available subjects</h2>
              <p>Select a subject to explore its topics.</p>
            </div>
            <span className="subjects-count">
              {loading ? "Loading..." : `${subjects.length} subjects`}
            </span>
          </div>

          {loading ? (
            <div className="subjects-status">
              <strong>Preparing your subjects...</strong>
              Please wait while we load your curriculum.
            </div>
          ) : error ? (
            <div className="subjects-status">
              <strong>Unable to load subjects</strong>
              {error}
            </div>
          ) : subjects.length === 0 ? (
            <div className="subjects-status">
              <strong>No subjects available yet</strong>
              Subjects for this branch will appear here when they are
              added to the curriculum.
            </div>
          ) : (
            <div className="subjects-grid">
              {subjects.map((subject) => (
                <Link
                  key={subject.id}
                  to={`/subjects/${subject.id}/topics`}
                  className="subject-card"
                >
                  <div className="subject-icon" aria-hidden="true">📘</div>
                  <h3>{subject.name}</h3>
                  <p>
                    {subject.description ||
                      `Explore ${subject.name}, its topics, and related virtual labs.`}
                  </p>
                  <div className="subject-card-bottom">
                    <span>Explore subject</span>
                    <span className="subject-arrow">→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="subjects-footer">
        <span>© {new Date().getFullYear()} V-Lab Virtual Laboratory</span>
        <span>Learn by doing. Build by exploring.</span>
      </footer>
    </div>
  );
}
