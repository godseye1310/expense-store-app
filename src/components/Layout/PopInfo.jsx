import React from "react";
import PopupModal from "../UI/PopupModal";
import useDisplay from "../../store/display-ctx";
import useAuth from "../../store/auth-context";

const PopInfo = () => {
	const { isLoggedIn } = useAuth();
	const { popupVisible } = useDisplay();

	return (
		<PopupModal
			className={`transition-all duration-500 ease-in-out ${popupVisible ? "top-[110px] opacity-100" : '"top-0 opacity-0'}`}
		>
			<p className="w-full rounded-2xl bg-blue-500 px-1 py-2 text-center text-white">
				{isLoggedIn
					? "Hello, Logged In Successfully"
					: "Logged Out Successfully"}
			</p>
		</PopupModal>
	);
};

export default PopInfo;
