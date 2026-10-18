import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function BranchesPage() {
  return <main><h1>Choose your engineering branch</h1><p>Robotics</p></main>;
}

function NotFoundPage() {
  return <main><h1>Page not found</h1></main>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/branches" element={<BranchesPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}