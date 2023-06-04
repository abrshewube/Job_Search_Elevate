import { useNavigate } from "react-router-dom";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";

const AddJob = () => {
  const navigate = useNavigate();
  const {
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    customId,
    handleChange,
    clearValues,
    isLoading,
    createJob,
    editJob,
    alertWarn,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      alertWarn("Please fill out all fields", {
        theme: "colored",
        toastId: customId,
      });
      return;
    }
    if (isEditing) {
      editJob();
      // Auto navigate after updating the job
      setTimeout(() => {
        navigate("/all-jobs");
      }, 2000);
      clearValues();
      return;
    }
    createJob();
    clearValues();
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="from">
        <h3>{isEditing ? "Update Job" : "Add Job"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            labelText="job location"
            type="text"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* List select */}
          <FormRowSelect
            labelText="job type"
            name="jobType"
            value={jobType}
            list={jobTypeOptions}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            labelText="status"
            name="status"
            value={status}
            list={statusOptions}
            handleChange={handleJobInput}
          />
          {/* Button container */}
          <div className="btn-container">
            {/* Add job button first, so when pressing enter it will trigger this button */}
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
              data-cy="save/add_job">
              {isEditing ? "save" : "add job"}
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
              data-cy="clear">
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
