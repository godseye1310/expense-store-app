import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import LogInfo from "./LogInfo";

const RootLayout = () => {
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
