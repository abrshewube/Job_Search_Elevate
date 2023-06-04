import styled from "styled-components";

const Wrapper = styled.article`
  padding: 1rem;
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);
  background: var(--white);
  header {
    color: var(--grey-300);
  }
  footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    .link {
      text-decoration: underline dotted 1px black;
      text-underline-offset: 5px;
      font-size: 0.9rem;
      color: var(--grey-900);
    }
  }
  div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    margin: 0.5rem 0;
  }
  .count {
    display: block;
    font-weight: 700;
    font-size: 2.25rem;
    color: black;
    color: ${(props) => props.color};
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin-top: 0.5rem;
    font-weight: 600;
    color: var(--black);
    opacity: 0.7;
  }
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    /* background: ${(props) => props.color}; */
    background: var(--grey-50);
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2.5rem;
      color: ${(props) => props.color};
    }
  }
`;

export default Wrapper;
