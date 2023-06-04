import { useEffect } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/appContext";
const Settings = () => {
  const { theme, setTheme } = useAppContext();

  const toggleTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };

  useEffect(() => {
    // It targets the whole DOM, easy light/darkmode setup
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <Wrapper>
      <form className="form">
        <h3>Settings</h3>
        <div className="form-center">
          <button type="button" className="btn btn-block" onClick={toggleTheme}>
            {theme === "light-theme" ? " darkmode" : " lightmode"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Settings;
