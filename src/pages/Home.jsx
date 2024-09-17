import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
	const darkMode = useSelector((state) => state.theme.darkMode);
	return (
		<div
			className={`p-3 pt-2 ${darkMode && "h-full w-full bg-gray-900 text-white"}`}
		>
			<div className="flex justify-between border-b-2 border-b-gray-400 px-1 pb-8">
				<h1 className="text-xl font-semibold">
					Welcome to Expense Tracker!!!
				</h1>
				<div className="flex rounded-lg bg-red-200 px-3 py-1">
					<p>
						Your Profile is Incomplete.{" "}
						<li className="list-none text-blue-600 underline decoration-blue-600">
							<Link to="/profile">Complete Now</Link>
						</li>
					</p>
				</div>
			</div>

			<div className="py-5">
				<h1 className="text-center text-5xl">Hii New User</h1>
			</div>
		</div>
	);
};

export default Home;
