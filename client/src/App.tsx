import { BarChart2, BookMarked, BookOpen, TrendingUp } from "lucide-react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

import { LessonProvider } from "./contexts/LessonContext";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import PaperTrading from "./pages/PaperTrading";

function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <aside className="sidebar">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <TrendingUp size={32} color="#3b82f6" />
            <h2 className="text-gradient">StockMastery</h2>
          </div>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.85rem",
              marginTop: "8px",
            }}
          >
            Learn to invest like a pro
          </p>

          <nav className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <BarChart2 size={20} />
              Dashboard
            </NavLink>
            <NavLink
              to="/lessons"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <BookOpen size={20} />
              Academy
            </NavLink>
            <NavLink
              to="/trading"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <BookMarked size={20} />
              Paper Trading
            </NavLink>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/lessons"
              element={
                <LessonProvider>
                  <Lessons />
                </LessonProvider>
              }
            />
            <Route path="/trading" element={<PaperTrading />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
