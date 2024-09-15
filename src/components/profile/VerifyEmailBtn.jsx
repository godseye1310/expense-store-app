import axios from "axios";
import React from "react";
import useAuth from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const API_KEY = `AIzaSyAeaA33_FQzcq-GcLm5gDhBeAvjaFxOMY0`;
const VERIFY_URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;

const VerifyEmailBtn = () => {
	const { token } = useAuth();
	const navigateTo = useNavigate();

	const mailverifyHandler = async () => {
		try {
			const response = await axios.post(VERIFY_URL, {
				requestType: "VERIFY_EMAIL",
				idToken: token,
			});
			console.log(response.data);
		} catch (error) {
			console.log(error.response.data);
			if (error.response.data.error.message === "INVALID_ID_TOKEN") {
				alert("Session Time-out. The user must sign in again.");
				navigateTo("/", { replace: true });
			}
		}
	};
	return (
		<div>
			<button
				onClick={mailverifyHandler}
				className="px-0.5 py-1 leading-normal text-blue-700 underline decoration-blue-700"
			>
				Verify Your Email
			</button>
		</div>
	);
};

export default VerifyEmailBtn;
