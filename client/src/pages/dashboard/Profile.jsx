import { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, SmallLoader } from "../../components";
import { useAppContext } from "../../context/appContext";

const Profile = () => {
  const { user, updateUser, isLoading, alertWarn } = useAppContext();

  // Since we are passing 4 functions, unlike in setup user where we pass one function, we don't need the name attribute
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !lastName || !email || !location) {
      alertWarn("Please fill out all fields!");
      return;
    }
    updateUser({ name, email, lastName, location, phoneNumber });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            labelText="first name"
            type="text"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            labelText="last name"
            type="text"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            labelText="email address"
            type="text"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            labelText="phone number"
            type="number"
            value={phoneNumber}
            handleChange={(e) => setPhoneNumber(e.target.value)}
          />
          <FormRow
            labelText="my location"
            type="text"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? <SmallLoader /> : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
