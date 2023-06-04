import styled from 'styled-components'

const Wrapper = styled.div`
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal {
    background: var(--white);
    width: 80vw;
    max-width: 400px;
    border-radius: var(--borderRadius);
    padding: 2rem 1rem;
    text-align: center;
  }
  .modal h4 {
    margin-bottom: 0;
    line-height: 1.5;
    font-size: 1.1rem;
    text-transform: none;
  }
  .modal .clear-btn,
  .modal .confirm-btn {
    margin-top: 1rem;
  }
  .btn-container {
    display: flex;
    justify-content: space-around;

    .btn {
      padding: 0.5rem 1rem;
      margin-top: 2.25rem;
      border-radius: var(--borderRadius);
    }
    .cancel-btn {
      background: transparent;
      color: var(--red-dark);
      border: 2px solid var(--red-dark);
      &:hover {
        background: var(--red-light);
        border: 2px solid var(--red-light);
      }
    }
  }
`
export default Wrapper
