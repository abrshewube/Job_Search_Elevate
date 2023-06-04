import { nanoid } from "nanoid";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { links } from "../../data/links";

// Pass toggleSidebar as prop, since we only close the sidebar when clicking links on the small sidebar
const NavLinks = ({ toggleSidebar, statCategory }) => {
  const { logoutUser } = useAppContext();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, icon, path, category } = link;
        return (
          <NavLink
            key={nanoid()}
            to={path}
            // isActive prop provided by react router dom
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={category !== "logout" ? toggleSidebar : logoutUser}>
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
