import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AppPage from "./pages/App"; // make sure your App.jsx is moved to src/pages/App.jsx
import "./styles/landing.css";
import "./styles/style.css";


function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
