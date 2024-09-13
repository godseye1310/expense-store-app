import React from 'react';

const AuthForm = () => {
	return (
		<main>
			<section>
				<h1>SignUp</h1>
				<form>
					<div>
						<div>
							<label htmlFor="email" className="block text-base font-medium text-gray-700">
								Email Address
							</label>
							<input
								id="email"
								name="email"
								type="email"
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
								required
								autoComplete=""
								className="block w-full px-3 py-2 mt-1 text-sm border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:border-opacity-80 focus:bg-sky-100"
								placeholder="Password"
							/>
						</div>
						<div>
							<label htmlFor="password" className="block text-base font-medium text-gray-700">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								autoComplete=""
								className="block w-full px-3 py-2 mt-1 text-sm border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:border-opacity-80 focus:bg-sky-100"
								placeholder="Confirm Password"
							/>
						</div>
					</div>
					<div>
						<button type="submit" className="">
							Sign Up
						</button>
					</div>
				</form>
			</section>
			<div>
				<button type="button" className="">
					Have an ccount? Login
				</button>
			</div>
		</main>
	);
};

export default AuthForm;
