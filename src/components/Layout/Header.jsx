import React from "react";
import { MdLogout } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../store/auth-context";

const Header = () => {
	const { isLoggedIn, handleLogOut } = useAuth();
	const navigateTo = useNavigate();
	const logOut = () => {
		handleLogOut();
		navigateTo("/", { replace: true });
	};
	return (
		<header className="flex flex-col px-0 pb-0 pt-2">
			<section className="flex items-center px-1 py-2">
				<h1 className="text-3xl text-sky-500 max-xs:text-xl">
					MyWebLink
				</h1>
				<nav className="px-5">
					<ul className="flex gap-8 max-md:gap-2 max-xs:text-sm">
						<li className="">
							<NavLink to="/home">Home</NavLink>
						</li>
						<li className="">
							<NavLink>Products</NavLink>
						</li>
						<li className="">
							<NavLink>About us</NavLink>
						</li>
					</ul>
				</nav>
				{isLoggedIn && (
					<button
						onClick={logOut}
						className="ml-auto flex items-center rounded bg-gray-900 p-1 text-white"
					>
						<span className="pr-0.5 max-xs:hidden">Logout</span>
						<MdLogout />
					</button>
				)}
			</section>
			<section className="flex items-center bg-blue-600 px-1 py-2 text-sm text-white">
				<nav>
					<ul>
						<Link to="/user-expense">
							<li>Daily Expense</li>
						</Link>
					</ul>
				</nav>
			</section>
		</header>
	);
};

export default Header;
