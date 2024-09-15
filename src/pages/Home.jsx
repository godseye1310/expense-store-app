import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="m-3 pt-2">
      <div className="flex justify-between border-b-2 border-b-gray-400 px-1 pb-8">
        <h1 className="text-xl font-semibold">Welcome to Expense Tracker!!!</h1>
        <div className="flex rounded-lg bg-red-200 px-3 py-1">
          <p>Your Profile is Incomplete.</p>
          <li className="list-none text-blue-600 underline decoration-blue-600">
            <Link to="/profile">Complete Now</Link>
          </li>
        </div>
      </div>

      <div className="py-5">
        <h1 className="text-center text-5xl">Hii New User</h1>
      </div>
    </div>
  );
};

export default Home;
