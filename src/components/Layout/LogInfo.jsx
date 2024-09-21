import React from "react";
import PopupModal from "../UI/PopupModal";
import { useSelector } from "react-redux";
import { IoIosInformationCircle } from "react-icons/io";

const LogInfo = () => {
	const { logInfo } = useSelector((state) => state.theme);

	return (
		<PopupModal
			className={`left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out ${logInfo.isVisible ? "translate-y-36 opacity-100" : "-translate-y-12 opacity-0"}`}
		>
			<p className="flex w-full items-center justify-evenly rounded-2xl bg-emerald-600 bg-opacity-85 px-2 py-2 text-center font-semibold text-white">
				<IoIosInformationCircle className="size-10" />
				{logInfo.info}
			</p>
		</PopupModal>
	);
};

export default LogInfo;
