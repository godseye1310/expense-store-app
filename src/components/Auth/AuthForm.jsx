import axios from "axios";
import React, { useState } from "react";
import Input from "../UI/Input";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const API_KEY = "AIzaSyAeaA33_FQzcq-GcLm5gDhBeAvjaFxOMY0";
  const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

  const authFormHandler = async (event) => {
    event.preventDefault();

    const userAuthData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    console.log(userAuthData);
    console.log(document.getElementById("confirm_password").value);
    console.log(password);
    console.log(password === document.getElementById("confirm_password").value);

    try {
      if (password === false) {
        const response = await axios.post(SIGNUP_URL, userAuthData);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-full flex-wrap items-center justify-center bg-gray-100">
      <section className="h-auto w-80 p-5">
        <form onSubmit={authFormHandler} className="border border-gray-400 p-4">
          <h1 className="py-4 text-center text-2xl font-medium text-black">
            Sign Up
          </h1>
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-700"
              >
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
                className="mt-1 block w-full rounded-md border-2 border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:border-opacity-80 focus:bg-sky-100 focus:outline-none"
                placeholder="Email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-base font-medium text-gray-700"
              >
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
                className="mt-1 block w-full rounded-md border-2 border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:border-opacity-80 focus:bg-sky-100 focus:outline-none"
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
                // value={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete=""
                className="mt-1 block w-full rounded-md border-2 border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:border-opacity-80 focus:bg-sky-100 focus:outline-none"
                placeholder="Confirm Password"
              />
            </div>
            <Input
              label="Name"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <button
              // disabled
              type="submit"
              className="w-full rounded-xl border-none bg-sky-500 py-2 text-white"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="">
          <button
            type="button"
            className="mt-4 w-full border border-emerald-800 bg-emerald-300 bg-opacity-50 px-4 py-2 text-emerald-900"
          >
            Have an ccount? Login
          </button>
        </div>
      </section>
    </div>
  );
};

export default AuthForm;
