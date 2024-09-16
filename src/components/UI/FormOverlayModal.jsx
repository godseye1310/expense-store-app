import React from "react";
import ReactDOM from "react-dom";

const Backdrop = ({ onClose }) => {
	return (
		<div
			className="fixed left-0 top-0 z-20 h-screen w-full bg-black/60"
			onClick={onClose}
		/>
	);
};

const Modal = ({ children, className }) => {
	return (
		<div
			className={`fixed left-1/2 top-[15vh] z-30 -translate-x-1/2 ${className}`}
		>
			{children}
		</div>
	);
};

const FormOverlayModal = ({ children, className, onClose }) => {
	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop onClose={onClose} />,
				document.getElementById("form"),
			)}
			{ReactDOM.createPortal(
				<Modal className={className}>{children}</Modal>,
				document.getElementById("form"),
			)}
		</>
	);
};

export default FormOverlayModal;
