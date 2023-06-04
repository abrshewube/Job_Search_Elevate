import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;

  .icon {
    font-size: 0.95rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--grey-500);
    }
  }
  .text {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }

  .placeholder:after {
    content: ".";
    visibility: hidden;
  }
`;
export default Wrapper;
