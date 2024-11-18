import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError() as Error

  console.log(error)

  return (
    <div>
      <h3>An Error occured.</h3>
      <p>{error.message}</p>
    </div>
  );
}

export default Error;