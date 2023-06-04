import { Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/StatItem";
import { useAppContext } from "../../context/appContext";

const StatItem = ({ title, count, icon, color, bcg, status }) => {
  const { handleChange } = useAppContext();

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: status });
  };

  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <h5 className="title">{title}</h5>
      </header>
      <div>
        <div className="icon">{icon}</div>
        <div className="count">{count}</div>
      </div>
      <footer>
        <Link
          to="/all-jobs"
          onClick={handleSearch}
          className="link"
          value={status}
          name="searchStatus">
          View {title}
        </Link>
      </footer>
    </Wrapper>
  );
};
export default StatItem;
