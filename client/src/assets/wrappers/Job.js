import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: #666868;
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  .pending {
    background: #fff4d8;
    color: #ffc93c;
  }
  .interview {
    background: #f0ffe6;
    color: #7dd87d;
  }
  .declined {
    background: #fceee8;
    color: #fa7a7a;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.1rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 120px;
    height: 30px;
    margin-top: 0.5rem;
  }
  span {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
  }
  footer {
    margin-top: 1rem;
  }
  .edit-btn,
  .delete-btn,
  .archive-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    font-size: 0.8rem;
    height: 27px;
  }
  .edit-btn {
    background: var(--primary-500);
    margin-right: 0.5rem;
  }
  .delete-btn {
    background: var(--primary-500);
    margin-right: 0.5rem;
  }
  .archive-btn {
    background: var(--primary-500);
  }
  &:hover .actions {
    visibility: visible;
  }
`;

export default Wrapper;
