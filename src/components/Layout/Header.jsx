import React from "react";
import { MdLogin, MdLogout } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
// import useAuth from "../../store/auth-context";
import useDisplay from "../../store/display-ctx";
import { SiExpensify } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-reducer";
import { themeActions } from "../../store/theme-reducer";
import { expenseActions } from "../../store/expense-reducer";

const Header = () => {
	// const { isLoggedIn, handleLogOut } = useAuth();
	const { handlePopupDisplay } = useDisplay();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const dispatch = useDispatch();
	const navigateTo = useNavigate();

	const isPremium = useSelector((state) => state.theme.isPremium);

	const logOut = () => {
		// handleLogOut();
		localStorage.removeItem("token");
		dispatch(authActions.handleLogout());
		dispatch(expenseActions.setExpenseList([]));
		handlePopupDisplay();
		navigateTo("/", { replace: true });
	};

	const handleTheme = () => {
		dispatch(themeActions.toggleDarkMode());
	};

	const darkMode = useSelector((state) => state.theme.darkMode);

	return (
		<header
			className={`flex flex-col px-0 pb-0 pt-2 ${darkMode ? "bg-slate-700" : ""}`}
		>
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
					<ul
						className={`flex items-baseline gap-8 max-md:gap-2 max-xs:text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
					>
						<li>
							<NavLink
								to="/home"
								className={({ isActive }) =>
									`transform font-semibold transition-all duration-150 max-xs:text-sm ${
										isActive
											? "text-2xl font-bold text-blue-600 max-xs:text-lg"
											: "hover:text-blue-600"
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
									`transform font-semibold transition-all duration-150 max-xs:text-sm ${
										isActive
											? "text-2xl font-bold text-blue-600 max-xs:text-base"
											: "hover:text-blue-600"
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
									`transform font-semibold transition-all duration-150 max-xs:text-sm ${
										isActive
											? "text-2xl font-bold text-blue-600 max-xs:text-lg"
											: "hover:text-blue-600"
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
			<section
				className={`flex items-center bg-blue-950 px-1 py-2 text-sm text-white`}
			>
				{isLoggedIn && (
					<nav className="flex w-full flex-wrap justify-between">
						<ul className="flex gap-x-4 pl-1">
							<NavLink
								to="/profile"
								className={({ isActive }) =>
									`font-bold decoration-4 underline-offset-8 hover:underline ${isActive ? "text-amber-600 underline decoration-amber-600" : "text-gray-300 decoration-blue-500 hover:text-amber-500"}`
								}
							>
								<li>Profile</li>
							</NavLink>

							<NavLink
								to="/user-expense"
								className={({ isActive }) =>
									`font-bold decoration-4 underline-offset-8 hover:underline ${isActive ? "text-amber-600 underline decoration-amber-600" : "text-gray-300 decoration-blue-500 hover:text-amber-500"}`
								}
							>
								<li>Daily Expense</li>
							</NavLink>
						</ul>

						{isPremium && (
							<button
								onClick={handleTheme}
								type="button"
								className="ml-auto bg-amber-600 px-2 py-0 text-sm"
							>
								theme
							</button>
						)}
					</nav>
				)}
			</section>
		</header>
	);
};

export default Header;
