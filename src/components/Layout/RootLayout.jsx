import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import LogInfo from "./LogInfo";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../store/auth-reducer";

let isInitialLoad = true;

const RootLayout = () => {
	const dispatch = useDispatch();
	const naviateTo = useNavigate();

	const { token, isLoggedIn } = useSelector((state) => state.auth);
	useEffect(() => {
		if (token && isInitialLoad) {
			dispatch(fetchProfile(token, naviateTo));
		}
	}, [dispatch, naviateTo, isLoggedIn, token]);

	return (
		<main className="">
			<Header />
			<div className="relative h-full w-full bg-gray-100">
				<Outlet />
			</div>
			<LogInfo />
		</main>
	);
};

export default RootLayout;
