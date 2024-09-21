import React from "react";
import PopupModal from "../UI/PopupModal";
import useDisplay from "../../store/display-ctx";
// import useAuth from "../../store/auth-context";
import { useSelector } from "react-redux";

const LogInfo = () => {
	// const { isLoggedIn } = useAuth();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const { popupVisible } = useDisplay();

	return (
		<PopupModal
			className={`left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out ${popupVisible ? "translate-y-36 opacity-100" : "-translate-y-12 opacity-0"}`}
		>
			<p className="w-full rounded-2xl bg-blue-500 px-1 py-2 text-center text-white">
				{isLoggedIn
					? "Hello, Logged In Successfully"
					: "Logged Out Successfully"}
			</p>
		</PopupModal>
	);
};

export default LogInfo;
