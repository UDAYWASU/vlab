
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SubjectsPage from "./pages/SubjectsPage";
import TopicsPage from "./pages/TopicsPage";
// Replace these imports with your actual page components.
import BranchesPage from "./pages/BranchesPage";

export default function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Pages requiring authentication */}
      <Route element={<ProtectedRoute />}>
        <Route path="/branches" element={<BranchesPage />} />

        {/* Put your other protected routes here */}
        {/* Example:
        <Route
          path="/branches/:branchSlug/subjects"
          element={<SubjectsPage />}
        />
        <Route
          path="/subjects/:subjectId/topics"
          element={<TopicsPage />}
        />
        <Route
          path="/topics/:topicId/labs"
          element={<LabsPage />}
        />
        */}

        <Route
    path="/branches/:branchSlug/subjects"
    element={<SubjectsPage />}
  />

  <Route
    path="/subjects/:subjectId/topics"
    element={<TopicsPage />}
  />


      </Route>

      {/* Unknown page */}
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}
