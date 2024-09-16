import React from "react";
import { MdLogin, MdLogout } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../store/auth-context";
import useDisplay from "../../store/display-ctx";
import { SiExpensify } from "react-icons/si";

const Header = () => {
	const { isLoggedIn, handleLogOut } = useAuth();
	const { handlePopupDisplay } = useDisplay();
	const navigateTo = useNavigate();
	const logOut = () => {
		handleLogOut();
		handlePopupDisplay();
		navigateTo("/", { replace: true });
	};
	return (
		<header className="flex flex-col px-0 pb-0 pt-2">
			<section className="flex items-center p-0">
				<h1 className="flex flex-col pl-1 text-3xl font-extrabold text-blue-950 max-xs:text-xl">
					<span>Expense</span>
					<span className="flex items-center">
						<span>
							<SiExpensify />
						</span>
						Store
					</span>
				</h1>
				<nav className="px-5">
					<ul className="flex gap-8 text-gray-600 max-md:gap-2 max-xs:text-sm">
						<li>
							<NavLink
								to="/home"
								className={({ isActive }) =>
									`transform font-bold transition-all duration-100 max-xs:text-sm ${
										isActive
											? "text-xl text-blue-900 max-xs:text-base"
											: "hover:text-blue-900"
									}`
								}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/products"
								className={({ isActive }) =>
									`transform font-bold transition-all duration-100 max-xs:text-sm ${
										isActive
											? "text-xl text-blue-900 max-xs:text-base"
											: "hover:text-blue-900"
									}`
								}
							>
								Products
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/about"
								className={({ isActive }) =>
									`transform font-bold transition-all duration-100 max-xs:text-sm ${
										isActive
											? "text-xl text-blue-900 max-xs:text-base"
											: "hover:text-blue-900"
									}`
								}
							>
								About Us
							</NavLink>
						</li>
					</ul>
				</nav>
				<div className="ml-auto pr-2">
					{isLoggedIn ? (
						<button
							onClick={logOut}
							className="flex items-center rounded bg-blue-950 p-1 text-white backdrop-blur hover:bg-blue-900"
						>
							<span className="pr-0.5 max-xs:hidden">Logout</span>
							<MdLogout />
						</button>
					) : (
						<NavLink
							to="/"
							className="flex items-center rounded bg-blue-950 p-1 text-white backdrop-blur hover:bg-blue-900"
						>
							<span className="pr-0.5 max-xs:hidden">Login</span>
							<MdLogin />
						</NavLink>
					)}
				</div>
			</section>
			<section className="flex items-center bg-blue-950 px-1 py-2 text-sm text-white">
				<nav>
					<ul className="flex gap-x-4 pl-1">
						{isLoggedIn && (
							<NavLink
								to="/profile"
								className={({ isActive }) =>
									`font-bold decoration-4 underline-offset-8 hover:underline ${isActive ? "text-amber-600 underline decoration-amber-600" : "text-gray-300 decoration-gray-300 hover:text-amber-500"}`
								}
							>
								<li>Profile</li>
							</NavLink>
						)}
						{isLoggedIn && (
							<NavLink
								to="/user-expense"
								className={({ isActive }) =>
									`font-bold decoration-4 underline-offset-8 hover:underline ${isActive ? "text-amber-600 underline decoration-amber-600" : "text-gray-300 decoration-gray-300 hover:text-amber-500"}`
								}
							>
								<li>Daily Expense</li>
							</NavLink>
						)}
					</ul>
				</nav>
			</section>
		</header>
	);
};

export default Header;
