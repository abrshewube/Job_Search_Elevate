import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";
import { FormRow, Logo } from "../components";
import { useAppContext } from "../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, setupUser, isLoading, alertWarn } = useAppContext();
  const location = useLocation();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      alertWarn("Please fill out all fields!", {
        theme: "colored",
      });
      return;
    }

    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
      });
    }
  };

  const demoUser = () => {
    const currentUser = {
      name: "Test User",
      email: "test@test.com",
      password: "testuser",
    };
    setupUser({
      currentUser,
      endPoint: "login",
    });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isMemberParam = searchParams.get("isMember");
    setValues({ ...initialState, isMember: isMemberParam === "true" });
  }, [location]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Sign up"}</h3>
        {!values.isMember && (
          <FormRow
            labelText="name"
            name="name"
            type="text"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          labelText="email address"
          name="email"
          type="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          labelText="password"
          name="password"
          type="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button
          type="submit"
          className="btn btn-block"
          disabled={isLoading}
          data-cy="login/register">
          {values.isMember ? "Login" : "Sign up"}
        </button>
        <button type="button" onClick={demoUser} className="btn btn-block">
          demo
        </button>
        <p>
          {values.isMember ? "Not a member?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {!values.isMember ? "Login" : "Sign up for free!"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
