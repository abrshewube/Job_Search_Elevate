import styled from "styled-components";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  box-shadow: var(--shadow-3);
  padding: 3.5rem;
  border-radius: var(--radius);
  background: var(--white);
  /* @media (min-width: 1200px) {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  } */
  .left-chart {
    grid-column: 1 / span 1;
  }
  .right-chart {
    grid-column: 2 / span 3;
  }
  .pie-chart {
    margin-top: 5rem;
  }

  @media (max-width: 992px) {
    display: none;
  }
  margin-top: 3rem;
  text-align: center;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
    span {
      margin-left: 0.2rem;
      font-size: 0.9rem;
    }
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`;

export default Wrapper;
