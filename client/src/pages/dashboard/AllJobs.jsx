import { JobsContainer, Modal, SearchContainer } from "../../components";
import { useAppContext } from "../../context/appContext";

const AllJobs = () => {
  const { showModal } = useAppContext();

  return (
    <>
      {showModal && <Modal />}
      {/* {showArchiveModal && <ModalArchive />} */}
      <SearchContainer />
      <JobsContainer />
    </>
  );
};
export default AllJobs;
