import dark from "../../assets/Path.png";
import light from "../../assets/light.png";
import profilePic from "../../assets/profilepic.png";
import logo from "../..//assets/logo11.png";
import { useTheme } from "../../context/themeContext";
import "./sidebar.css"

export function SideBar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="sidebar">
      <section className="sidebar__logo">
        <img src={logo} alt="logo" />
      </section>

      <section className="sidebar__bottom">
        <button
          className="sidebar__theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <img
            src={theme === "light" ? light : dark}
            alt={theme === "light" ? "moon icon" : "sun icon"}
          />
        </button>

        <div className="sidebar__divider" />

        <div className="sidebar__avatar">
          <img src={profilePic} alt="profile picture" />
        </div>
      </section>
    </nav>
  );
}
