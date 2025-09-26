import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginRegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
};

export default App;
