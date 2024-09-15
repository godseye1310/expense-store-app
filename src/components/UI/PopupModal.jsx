import React from "react";
import ReactDOM from "react-dom";

const Popup = ({ children, className }) => {
	// console.log(className);
	return (
		<div
			className={`fixed left-1/2 top-0 z-50 inline-flex w-80 origin-center -translate-x-1/2 items-center justify-center p-0.5 ${className}`}
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
