import { useRouteError,Link,useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location=useLocation()
  const error = useRouteError();
  let homeUrl="/"
  if(location.pathname.startsWith("/user")){
    homeUrl="/user"
  }
  if(location.pathname.startsWith("/admin")){
    homeUrl="/admin"
  }
  if(location.pathname.startsWith("/instructor")){
    homeUrl="/instructor"
  }
  console.error(error);
    return (
        <div className="flex items-center justify-center min-h-screen bg-base-100" id="error-page">
        <div className="text-center p-6 rounded-lg max-w-lg">
          <h1 className="text-4xl font-extrabold mb-4 text-error">
          Oops!
          </h1>
          <p className="text-lg text-base-content mb-6">
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
        <i>{error.statusText || error.message}</i>
      </p>
          </p>
          <Link
            to={homeUrl}
            className="btn btn-primary"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    );
  };
  
  export default ErrorPage;