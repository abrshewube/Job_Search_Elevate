import styled from "styled-components";

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    height: 100% !important;
    .sidebar-container {
      background: #252727;
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -250px;
      transition: var(--transition);
    }
    .nav-links-container {
      height: calc(100% - 96px) !important;
    }
    h3 {
      margin-top: 1.2rem;
      margin-bottom: 0.25rem;
      font-size: 1.1rem;
      padding-left: 1.5rem;
      opacity: 0.3;
      font-weight: 600;
    }
    .content {
      position: sticky;
      top: 0;
      height: 100vh !important;
    }
    .show-sidebar {
      transition-property: margin-left;
      margin-left: 0;
    }

    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
    }
    .nav-links {
      display: flex;
      flex-direction: column;
      height: 100% !important;
      font-size: 1.125rem;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: #ffffff;
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: var(--transition);

      &:nth-child(5) {
        margin-top: auto;
      }
    }
    .nav-link:hover:not(.active) {
      background: var(--hover-color);
      color: var(--primary-900);
      padding-left: 3rem;
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
    }
    .active {
      color: #ffffff;
      background: var(--primary-900);
    }
    .active .icon {
      color: var(--primary-500);
    }
  }
`;
export default Wrapper;
