import React, { useEffect, useMemo, useState } from "react";
import PopupModal from "../UI/PopupModal";
import useAuth from "../../store/auth-context";

const PopInfo = () => {
	const [isVisible, setIsVisible] = useState();
	// const { isLoggedIn: authIsLoggedIn } = useAuth();

	// const isLoggedIn = useMemo(() => authIsLoggedIn, [authIsLoggedIn]);
	// useEffect(() => {
	// 	setIsVisible(true);

	// 	setTimeout(() => setIsVisible(false), 1000);
	// }, [isLoggedIn]);
	return (
		<PopupModal
			className={`transition-all duration-500 ease-in-out ${isVisible ? "top-[110px] opacity-100" : '"top-0 opacity-0'}`}
		>
			<p className="w-full rounded-2xl bg-blue-500 px-1 py-2 text-center text-white">
				{false
					? "Hello, Logged In Successfully"
					: "Logged Out Successfully"}
			</p>
		</PopupModal>
	);
};

export default PopInfo;
