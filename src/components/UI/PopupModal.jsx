import React from "react";
import ReactDOM from "react-dom";

const Popup = ({ children, className }) => {
	// console.log(className);
	return (
		<div
			className={`fixed z-50 flex w-80 origin-center items-center justify-center p-0.5 ${className}`}
		>
			{children}
		</div>
	);
};

const PopupModal = ({ children, className }) => {
	return ReactDOM.createPortal(
		<Popup className={className}>{children}</Popup>,
		document.getElementById("popup"),
	);
};

export default PopupModal;
