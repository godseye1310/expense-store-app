import axios from "axios";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "AIzaSyAeaA33_FQzcq-GcLm5gDhBeAvjaFxOMY0";
const PASSWORD_RESET_LINK = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;

//https://firebase.google.com/docs/reference/rest/auth#section-send-password-reset-email

const ForgorPassword = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");
	const forgorUsersMail = useRef();
	const handlePasswordRest = async (event) => {
		event.preventDefault();
		console.log(typeof forgorUsersMail.current.value);

		setIsLoading(true);
		try {
			const response = await axios.post(PASSWORD_RESET_LINK, {
				requestType: "PASSWORD_RESET",
				email: forgorUsersMail.current.value,
			});
			console.log(response);
			setMessage(
				"You can check Your Registerd Email to reset your password",
			);
			forgorUsersMail.current.value = "";
		} catch (error) {
			console.log(error.response.data);
			setMessage("Invalid EmailID");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex w-full flex-col items-center justify-center">
			<h1 className="py-8 text-2xl">ForgorPassword</h1>

			<form
				onSubmit={handlePasswordRest}
				className="flex w-96 flex-col gap-2 rounded-t-md bg-slate-950 p-6 text-white"
			>
				<label htmlFor="email">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					ref={forgorUsersMail}
					required
					className="rounded px-3 py-0.5 text-gray-900"
				></input>

				<button
					className="my-4 rounded-md bg-red-400 p-0.5 hover:bg-red-500"
					type="submit"
				>
					Send Link
				</button>
				<Link to="/" className="px-3 text-center text-xs underline">
					Already a user?Login
				</Link>
			</form>
			<div className="flex h-20 w-96 items-center justify-center rounded-b-md bg-slate-950 text-white">
				{isLoading && (
					<img
						src="https://i.gifer.com/9gu9.gif"
						alt="loading"
						className="h-full"
					/>
				)}
				<p className="text-center">{message}</p>
			</div>
		</div>
	);
};

export default ForgorPassword;
