import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import SectionPage from "./pages/SectionPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem("dashboard_logged_in") === "true");

  useEffect(() => {
    localStorage.setItem("dashboard_logged_in", loggedIn ? "true" : "false");
  }, [loggedIn]);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem("dashboard_logged_in", "false");
  };

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <Router>
      <Layout onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path=":section" element={<SectionPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;