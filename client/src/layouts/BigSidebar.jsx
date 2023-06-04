import Wrapper from "../assets/wrappers/BigSidebar";
import { Logo, NavLinks } from "../components";
import { useAppContext } from "../context/appContext";

const BigSidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "show-sidebar sidebar-container"
        }>
        <div className="content">
          <header>
            <Logo />
          </header>
          <div className="nav-links-container">
            <NavLinks />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
