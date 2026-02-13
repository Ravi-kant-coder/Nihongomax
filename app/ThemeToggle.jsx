import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import useT from "./hooks/useT";

const ThemeToggle = () => {
  const t = useT();
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="w-full flex" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? <Sun className="mr-2" /> : <Moon className="mr-2" />}
      {darkMode ? (
        <span className="ml-2">
          <p>{t("lightMode")}</p>
        </span>
      ) : (
        <span className="ml-2">
          <p>{t("darkMode")}</p>
        </span>
      )}
    </div>
  );
};
export default ThemeToggle;
