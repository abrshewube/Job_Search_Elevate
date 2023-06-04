import styled from "styled-components";

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
  }
  @media (min-width: 1720px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 3rem;
  }
`;
export default Wrapper;
