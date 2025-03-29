import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext } from "react";
import ThemeProvider, { ThemeContext } from "./context/ThemeContext";
import Home from "./pages/Home";

const App = () => {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
};

// Separate component to use Theme Context
const ThemedApp = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`}>
      <button className="theme-toggle btn btn-secondary" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
      <Home />
    </div>
  );
};

export default App;
