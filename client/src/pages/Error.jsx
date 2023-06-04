import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>Houston, we have a problem!</h3>
        <p>We couldn't find the destination you were looking for</p>
        <Link to="/">back home</Link>
      </div>
    </Wrapper>
  )
}

export default Error
