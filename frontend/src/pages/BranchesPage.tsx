
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Branch = {
  id: number | string;
  name: string;
  slug: string;
  description?: string | null;
};

export default function BranchesPage() {
  const navigate = useNavigate();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("vlab_access_token");

    if (!token) {
      navigate("/login", {
        replace: true,
        state: { from: { pathname: "/branches" } },
      });
      return;
    }

    let cancelled = false;

    async function loadBranches() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL ?? "http://localhost:8000"}/api/branches`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401 || response.status === 403) {
          sessionStorage.removeItem("vlab_access_token");

          if (!cancelled) {
            navigate("/login", {
              replace: true,
              state: { from: { pathname: "/branches" } },
            });
          }
          return;
        }

        if (!response.ok) {
          throw new Error("Unable to load branches. Please try again.");
        }

        const data = await response.json();

        if (!cancelled) {
          setBranches(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadBranches();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div className="branch-page">
      <style>{`
        .branch-page {
          min-height: 100vh;
          background: #f5f7fb;
          color: #15213b;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .branch-page * {
          box-sizing: border-box;
        }

        .branch-nav {
          height: 76px;
          padding: 0 7%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          border-bottom: 1px solid #e9edf5;
        }

        .branch-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          color: #15213b;
          text-decoration: none;
          font-size: 21px;
          font-weight: 800;
          letter-spacing: -0.7px;
        }

        .branch-logo {
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #2459e8;
          color: white;
          font-size: 22px;
        }

        .branch-nav-right {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .branch-nav-link {
          color: #596781;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
        }

        .branch-nav-link:hover {
          color: #2459e8;
        }

        .branch-profile {
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #e9efff;
          color: #2459e8;
          font-weight: 800;
        }

        .branch-main {
          width: min(1160px, 88%);
          margin: 0 auto;
          padding: 42px 0 70px;
        }

        .branch-breadcrumb {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #8a95a9;
          font-size: 13px;
          margin-bottom: 25px;
        }

        .branch-breadcrumb strong {
          color: #2459e8;
          font-weight: 700;
        }

        .branch-hero {
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          align-items: center;
          min-height: 320px;
          padding: 42px 48px;
          border-radius: 26px;
          background: linear-gradient(120deg, #122957 0%, #1b48a3 65%, #2867e9 100%);
          color: white;
          box-shadow: 0 18px 42px rgba(30, 67, 145, 0.14);
        }

        .branch-hero::before {
          content: "";
          position: absolute;
          width: 350px;
          height: 350px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 50%;
          right: 4%;
          top: -115px;
        }

        .branch-hero::after {
          content: "";
          position: absolute;
          width: 270px;
          height: 270px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 50%;
          right: 10%;
          bottom: -180px;
        }

        .branch-hero-copy {
          position: relative;
          z-index: 1;
        }

        .branch-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          margin-bottom: 19px;
          border: 1px solid rgba(255,255,255,0.24);
          border-radius: 30px;
          background: rgba(255,255,255,0.09);
          color: #dce7ff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .branch-hero h1 {
          max-width: 510px;
          margin: 0;
          font-size: clamp(32px, 4vw, 46px);
          line-height: 1.12;
          letter-spacing: -1.8px;
        }

        .branch-hero p {
          max-width: 470px;
          margin: 17px 0 0;
          color: #d3def6;
          font-size: 15px;
          line-height: 1.8;
        }

        .branch-hero-art {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 220px;
        }

        .robot-orbit {
          position: relative;
          display: grid;
          place-items: center;
          width: 205px;
          height: 205px;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          font-size: 96px;
        }

        .robot-orbit::before,
        .robot-orbit::after {
          content: "";
          position: absolute;
          border: 1px dashed rgba(255,255,255,0.35);
          border-radius: 50%;
        }

        .robot-orbit::before {
          inset: 18px;
        }

        .robot-orbit::after {
          inset: -17px;
          border-style: solid;
          border-color: rgba(255,255,255,0.13);
        }

        .robot-spark {
          position: absolute;
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 13px;
          background: #2d63d8;
          font-size: 20px;
        }

        .robot-spark.one {
          top: 8px;
          right: 8px;
        }

        .robot-spark.two {
          bottom: 12px;
          left: 0;
        }

        .branch-section-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 20px;
          margin: 42px 0 21px;
        }

        .branch-section-heading h2 {
          margin: 0;
          font-size: 25px;
          letter-spacing: -0.8px;
        }

        .branch-section-heading p {
          margin: 8px 0 0;
          color: #7d899e;
          font-size: 14px;
          line-height: 1.6;
        }

        .branch-count {
          flex-shrink: 0;
          padding: 8px 12px;
          border: 1px solid #e2e8f3;
          border-radius: 10px;
          background: white;
          color: #66748d;
          font-size: 12px;
          font-weight: 700;
        }

        .branch-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        .branch-card {
          display: flex;
          flex-direction: column;
          min-height: 245px;
          padding: 24px;
          border: 1px solid #e7ebf3;
          border-radius: 19px;
          background: white;
          box-shadow: 0 5px 18px rgba(30, 50, 90, 0.025);
          transition: transform 180ms ease, box-shadow 180ms ease,
            border-color 180ms ease;
        }

        .branch-card:hover {
          transform: translateY(-4px);
          border-color: #cad7ff;
          box-shadow: 0 15px 30px rgba(36, 89, 232, 0.09);
        }

        .branch-card-icon {
          display: grid;
          place-items: center;
          width: 53px;
          height: 53px;
          margin-bottom: 19px;
          border-radius: 15px;
          background: #edf2ff;
          font-size: 27px;
        }

        .branch-card h3 {
          margin: 0;
          color: #1a2844;
          font-size: 18px;
          letter-spacing: -0.4px;
        }

        .branch-card p {
          flex: 1;
          margin: 10px 0 22px;
          color: #7a879c;
          font-size: 13px;
          line-height: 1.7;
        }

        .branch-card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 15px;
          border-top: 1px solid #edf0f6;
          color: #2459e8;
          font-size: 13px;
          font-weight: 750;
        }

        .branch-arrow {
          display: grid;
          place-items: center;
          width: 31px;
          height: 31px;
          border-radius: 10px;
          background: #eef3ff;
          font-size: 18px;
          transition: transform 180ms ease;
        }

        .branch-card:hover .branch-arrow {
          transform: translateX(3px);
        }

        .branch-status {
          padding: 28px;
          border: 1px solid #e7ebf3;
          border-radius: 16px;
          background: white;
          color: #6b7890;
          text-align: center;
          line-height: 1.7;
        }

        .branch-status strong {
          display: block;
          margin-bottom: 5px;
          color: #1a2844;
          font-size: 16px;
        }

        .branch-footer {
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
          .branch-hero {
            grid-template-columns: 1fr 0.65fr;
            padding: 35px;
          }

          .robot-orbit {
            width: 155px;
            height: 155px;
            font-size: 72px;
          }

          .branch-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .branch-nav {
            height: 66px;
            padding: 0 5%;
          }

          .branch-brand {
            font-size: 18px;
          }

          .branch-nav-right {
            gap: 12px;
          }

          .branch-nav-link {
            font-size: 12px;
          }

          .branch-main {
            width: 90%;
            padding-top: 27px;
          }

          .branch-hero {
            grid-template-columns: 1fr;
            padding: 29px 24px;
            border-radius: 20px;
          }

          .branch-hero h1 {
            font-size: 34px;
          }

          .branch-hero p {
            font-size: 14px;
          }

          .branch-hero-art {
            min-height: 180px;
            margin-top: 16px;
          }

          .robot-orbit {
            width: 145px;
            height: 145px;
            font-size: 67px;
          }

          .branch-section-heading {
            align-items: start;
            margin-top: 33px;
          }

          .branch-section-heading h2 {
            font-size: 22px;
          }

          .branch-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .branch-card {
            min-height: 220px;
          }

          .branch-footer {
            flex-direction: column;
            gap: 8px;
            padding: 20px 5%;
          }
        }
      `}</style>

      <header className="branch-nav">
        <Link to="/" className="branch-brand">
          <span className="branch-logo">⌘</span>
          <span>V-Lab</span>
        </Link>

        <div className="branch-nav-right">
          <Link to="/branches" className="branch-nav-link">
            My Learning
          </Link>
          <div className="branch-profile" title="Your account">
            U
          </div>
        </div>
      </header>

      <main className="branch-main">
        <div className="branch-breadcrumb">
          <span>Dashboard</span>
          <span>/</span>
          <strong>Branches</strong>
        </div>

        <section className="branch-hero">
          <div className="branch-hero-copy">
            <div className="branch-kicker">
              <span>✦</span>
              Virtual Laboratory
            </div>

            <h1>Explore. Experiment. Engineer.</h1>

            <p>
              Welcome to your virtual lab workspace. Explore engineering
              concepts, learn through guided experiments, and build your
              practical knowledge in an interactive environment.
            </p>
          </div>

          <div className="branch-hero-art" aria-hidden="true">
            <div className="robot-orbit">
              🤖
              <span className="robot-spark one">⚙</span>
              <span className="robot-spark two">✦</span>
            </div>
          </div>
        </section>

        <section>
          <div className="branch-section-heading">
            <div>
              <h2>Choose your branch</h2>
              <p>
                Select a learning branch to explore its subjects and
                virtual experiments.
              </p>
            </div>

            <span className="branch-count">
              {loading ? "Loading..." : `${branches.length} branches`}
            </span>
          </div>

          {loading ? (
            <div className="branch-status">
              <strong>Preparing your workspace...</strong>
              Loading available branches.
            </div>
          ) : error ? (
            <div className="branch-status">
              <strong>Unable to load branches</strong>
              {error}
              <p>Please refresh the page and try again.</p>
            </div>
          ) : branches.length === 0 ? (
            <div className="branch-status">
              <strong>No branches available yet</strong>
              Branches will appear here once they have been added to
              your curriculum.
            </div>
          ) : (
            <div className="branch-grid">
              {branches.map((branch) => (
                <Link
                  key={branch.id}
                  to={`/branches/${branch.slug}/subjects`}
                  className="branch-card"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <div className="branch-card-icon" aria-hidden="true">
                    {branch.slug.toLowerCase().includes("robot")
                      ? "🤖"
                      : "⚙️"}
                  </div>

                  <h3>{branch.name}</h3>

                  <p>
                    {branch.description ||
                      `Explore ${branch.name} subjects, practical concepts, and interactive virtual labs.`}
                  </p>

                  <div className="branch-card-bottom">
                    <span>Explore branch</span>
                    <span className="branch-arrow">→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="branch-footer">
        <span>© {new Date().getFullYear()} V-Lab Virtual Laboratory</span>
        <span>Learn by doing. Build by exploring.</span>
      </footer>
    </div>
  );
}
