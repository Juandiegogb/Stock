import { Link } from "react-router-dom";


export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="animate__animated animate__bounceInDown">
        <h1 className="text-9xl font-bold text-red-600">404</h1>
      </div>
      <p className="text-2xl text-gray-700 mt-4 animate__animated animate__fadeIn animate__delay-1s">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out animate__animated animate__fadeInUp animate__delay-2s"
      >
        Go back to Home
      </Link>
    </div>
  );
};
