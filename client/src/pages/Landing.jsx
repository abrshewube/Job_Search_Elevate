import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import main from "../assets/images/elevate-light.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper className="hero-bcg">
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <Fade direction="left" className="opacity-0" triggerOnce>
            <img src={main} alt="job hunt" className="img main-img" />
          </Fade>
          <div className="text-container">
            <Fade direction="right" className="opacity-0" triggerOnce>
              <p>
                Track and manage all your Job applications in one place - for
                free! <br />
                Elevate provides an easy way to keep track of job status,
                applied companies, and application statistics.
              </p>
            </Fade>
            <div className="landing-btn-container">
              <Link
                to={{ pathname: "/register", search: "?isMember=true" }}
                className="btn btn-login"
                data-cy="login/register">
                Login
              </Link>
              <Link
                to={{ pathname: "/register", search: "?isMember=false" }}
                className="btn btn-register"
                data-cy="login/register">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Landing;
