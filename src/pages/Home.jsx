import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
	const darkMode = useSelector((state) => state.theme.darkMode);
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const { displayName, photoUrl } = useSelector(
		(state) => state.auth.userProfile,
	);

	// const displayName = userProfile.displayName || "User";

	return (
		<div
			className={`px-0.5 py-4 ${darkMode && "h-full w-full bg-gray-900 text-white"}`}
		>
			<div className="flex justify-between overflow-hidden border-b-2 border-b-gray-400 px-1 pb-8">
				<h1 className="text-xl font-semibold">
					Welcome to Expense Tracker!!!
				</h1>
				{isLoggedIn && (
					<div className="flex translate-x-1 rounded-l-lg bg-red-400 px-3 py-1">
						<p>
							{displayName && photoUrl
								? "Your Profile is Complete"
								: `Your Profile is Incomplete.`}
							<li className="list-none text-blue-600 underline decoration-blue-600">
								<Link to="/profile">
									{!displayName &&
										!photoUrl &&
										"Complete Now"}
								</Link>
							</li>
						</p>
					</div>
				)}
			</div>

			<div className="py-5">
				<h1 className="text-center text-4xl max-xs:text-2xl">
					{isLoggedIn
						? `Welcome Back ${displayName || "user"}`
						: "Hii New User"}
				</h1>
			</div>
		</div>
	);
};

export default Home;
