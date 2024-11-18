import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h2>404 | Page Not found</h2>
      <button onClick={()=>navigate("/")}>Go to home page</button>
    </div>
  );
}

export default NotFound;