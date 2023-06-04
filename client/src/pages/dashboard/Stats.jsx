import { useEffect } from "react";
import { ChartsContainer, Loading, StatsContainer } from "../../components";
import { useAppContext } from "../../context/appContext";

const Stats = () => {
  const { isLoading, showStats, monthlyApplications } = useAppContext();

  useEffect(() => {
    showStats();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
