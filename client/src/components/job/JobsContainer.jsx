import { useEffect } from "react";
import Wrapper from "../../assets/wrappers/JobsContainer";
import { useAppContext } from "../../context/appContext";
import { PageBtnContainer } from "../button";
import { Loading } from "../ui";
import Job from "./Job";

const JobsContainer = () => {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfEntries,
    numOfPages,
    statItemSearch,
  } = useAppContext();

  useEffect(() => {
    if (!statItemSearch) {
      getJobs();
    }
    // eslint-disable-next-line
  }, [search, searchStatus, searchType, sort, numOfEntries, page]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2 data-cy="no_jobs">No jobs to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job entr{jobs.length > 1 ? "ies" : "y"}
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
