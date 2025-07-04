import { Link, useLocation } from "react-router";

const LoginAlert = ({ text = "" }: { text?: string }) => {
  const { pathname } = useLocation();

  return (
    <div className="text-center text-2xl font-semibold flex justify-center">
      <div className="bg-red-300 px-4 py-3 rounded-lg shadow-md">
        <p>You are not logged-in</p>
        <p>{text} please log-in first</p>
        <Link
          to="/login"
          className="inline-block bg-gray-200 hover:bg-gray-100 rounded px-3 py-2 mt-3"
          state={{ goTo: pathname }}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default LoginAlert;
