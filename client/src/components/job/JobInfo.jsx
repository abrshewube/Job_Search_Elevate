import Wrapper from "../../assets/wrappers/JobInfo";

const JobInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className={!icon ? "placeholder" : "icon"}>{icon || ""}</span>
      <span className={!icon ? "placeholder" : "icon"}>{text || ""}</span>
    </Wrapper>
  );
};
export default JobInfo;
