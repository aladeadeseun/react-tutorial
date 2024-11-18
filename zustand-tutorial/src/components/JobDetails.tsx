import { useParams } from "react-router-dom";
import { useFetch } from "../hooks";
import { Job } from "../types";

const JobDetails = () => {

  const {id} = useParams<{id:string}>()

  const {data, error, loading} = useFetch<Job>(`http://localhost:5000/jobs/${id}`)

  if(loading) return <div>Loading...</div>

  if(error)  return <div>{error.message}</div>

  

  return (
    <div >
      <p className="job-details"><b>Job Title: </b>{data?.title}</p>
      <p className="job-details"><b>Salary: </b>{data?.salary}</p>
      <p className="job-details"><b>Job Location: </b>{data?.location}</p>
      <p className="job-details"><button>Apply Now</button></p>
    </div>
  );
}

export default JobDetails;