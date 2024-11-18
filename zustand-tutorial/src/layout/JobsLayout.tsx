import { Outlet } from "react-router-dom";

const JobsLayout = () => {
  return (
    <div>
      <h2>Job Openings</h2>
      <Outlet/>
    </div>
  );
}

export default JobsLayout;