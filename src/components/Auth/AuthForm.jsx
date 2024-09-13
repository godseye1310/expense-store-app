import axios from 'axios';
import React, { useState } from 'react';

const AuthForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const API_KEY = 'AIzaSyAeaA33_FQzcq-GcLm5gDhBeAvjaFxOMY0';
	const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

	const authFormHandler = async (event) => {
		event.preventDefault();

		const userAuthData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};

		console.log(userAuthData);
		console.log(confirmPassword === password);

		try {
			if (password === confirmPassword) {
				const response = await axios.post(SIGNUP_URL, userAuthData);
				console.log(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<main className="flex flex-wrap items-center justify-center h-dvh bg-gray-300">
			<section className="w-80 h-auto p-5">
				<form onSubmit={authFormHandler} className="border border-gray-400 p-4">
					<h1 className="text-black text-center text-2xl font-medium py-4">Sign Up</h1>
					<div>
						<div>
							<label htmlFor="email" className="block text-base font-medium text-gray-700">
								Email Address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								autoFocus
								className="block w-full px-3 py-2 mt-1 text-sm border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:border-opacity-80 focus:bg-sky-100"
								placeholder="Email"
							/>
						</div>

						{/* Password Input */}
						<div>
							<label htmlFor="password" className="block text-base font-medium text-gray-700">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								autoComplete=""
								className="block w-full px-3 py-2 mt-1 text-sm border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:border-opacity-80 focus:bg-sky-100"
								placeholder="Password"
							/>
						</div>
						<div>
							<label
								htmlFor="confirm_password"
								className="block text-base font-medium text-gray-700"
							>
								Confirm Password
							</label>
							<input
								id="confirm_password"
								name="confirm_password"
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
								autoComplete=""
								className="block w-full px-3 py-2 mt-1 text-sm border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:border-opacity-80 focus:bg-sky-100"
								placeholder="Confirm Password"
							/>
						</div>
					</div>
					<div className="mt-4">
						<button type="submit" className="w-full bg-sky-600 rounded-xl border-none py-2">
							Sign Up
						</button>
					</div>
				</form>

				<div className="">
					<button
						type="button"
						className="w-full mt-4 bg-emerald-300 bg-opacity-50 border border-emerald-800 text-emerald-900 px-4 py-2"
					>
						Have an ccount? Login
					</button>
				</div>
			</section>
		</main>
	);
};

export default AuthForm;
