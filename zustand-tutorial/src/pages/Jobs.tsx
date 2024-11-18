import { Link } from "react-router-dom"
import { useFetch } from "../hooks"
import { Job } from "../types"

const Jobs = ()=>{

  const {data, error, loading} = useFetch<Job[]>("http://localhost:5000/jobs")

  console.log(data, error, loading)

  if(loading) return <div>Loading...</div>

  if(error)  return <div>{error.message}</div>

  return (
    <>
      <h2>Job Page</h2>
      <div className="jobs">
      {
        data?.map(job=>(
          <Link to={`${job.id}`} key={job.id}>
            <h4>{job.title}</h4>
            <p>{job.location}</p>
          </Link>
        ))
      }
      </div>
    </>
  )
}

export default Jobs
