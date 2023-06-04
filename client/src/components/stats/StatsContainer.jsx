import { nanoid } from "nanoid";
import { FcBusiness, FcCalendar, FcCancel, FcClock } from "react-icons/fc";
import Wrapper from "../../assets/wrappers/StatsContainer";
import { useAppContext } from "../../context/appContext";
import StatItem from "./StatItem";

const StatsContainer = () => {
  const { stats } = useAppContext();

  const defaultStats = [
    {
      title: "pending applications",
      count: stats.pending || 0,
      icon: <FcClock />,
      bcg: "#ffffef",
      color: "#ffc93c",
      status: "pending",
    },
    {
      title: "scheduled interviews",
      count: stats.interview || 0,
      icon: <FcCalendar />,
      bcg: "#f0ffe6",
      color: "#7dd87d",
      status: "interview",
    },
    {
      title: "declined jobs",
      count: stats.declined || 0,
      icon: <FcCancel />,
      bcg: "#fceee8",
      color: "#fa7a7a",
      status: "declined",
    },
    {
      title: "total applications",
      count:
        (stats.pending || 0) + (stats.interview || 0) + (stats.declined || 0),
      icon: <FcBusiness />,
      bcg: "#e6f8fe",
      color: "#66d6f6",
      status: "all",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((stats) => {
        return <StatItem key={nanoid()} {...stats} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
