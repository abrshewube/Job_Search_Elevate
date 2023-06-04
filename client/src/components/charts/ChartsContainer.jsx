import { useState } from "react";
import { TbSwitchHorizontal } from "react-icons/tb";

import Wrapper from "../../assets/wrappers/ChartsContainer";
import { useAppContext } from "../../context/appContext";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const ChartsContainer = () => {
  const { stats, monthlyApplications: data } = useAppContext();
  const [areaChart, setAreaChart] = useState(true);

  return (
    <Wrapper className="charts-section">
      <div className="left-chart">
        <h4>percentage split</h4>
        <PieChart stats={stats} />
      </div>
      <div className="right-chart">
        <h4>monthly applications</h4>
        <button
          className="charts-btn"
          type="button"
          onClick={() => setAreaChart(!areaChart)}>
          {areaChart ? "bar chart" : "area chart"}
          <span>
            <TbSwitchHorizontal />
          </span>
        </button>
        {areaChart ? <AreaChart data={data} /> : <BarChart data={data} />}
      </div>
    </Wrapper>
  );
};
export default ChartsContainer;
