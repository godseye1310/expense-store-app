import axios from "axios";
import React, { useState } from "react";
import Input from "../UI/Input";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const API_KEY = "AIzaSyAeaA33_FQzcq-GcLm5gDhBeAvjaFxOMY0";
  const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

  const authFormHandler = async (event) => {
    event.preventDefault();

    const userAuthData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    setErrorMessage("");

    try {
      if (password === document.getElementById("confirm_password").value) {
        const response = await axios.post(SIGNUP_URL, userAuthData);
        console.log(response.data);
      } else {
        setErrorMessage("Password doesnt Match");
        setIsErrorVisible(true);
        setTimeout(() => setIsErrorVisible(false), 3000);
      }
    } catch (error) {
      if (error.response.data.error.message === "EMAIL_EXISTS") {
        setErrorMessage("*Email is Already Registered");
        setIsErrorVisible(true);
      } else if (
        error.response.data.error.message ===
        "WEAK_PASSWORD : Password should be at least 6 characters"
      ) {
        setErrorMessage(
          "*Weak Password, Password should be at least 6 characters",
        );
        setIsErrorVisible(true);
      }
      setTimeout(() => setIsErrorVisible(false), 3000);
    }
  };
  return (
    <div className="image-container relative flex h-full w-full items-center justify-center bg-gray-100">
      <section className="h-auto w-96 p-5">
        <form onSubmit={authFormHandler} className="border border-gray-400 p-4">
          <h1 className="mb-6 py-4 text-center text-2xl font-medium text-black">
            Sign Up
          </h1>
          <div className="flex flex-col gap-6">
            {/* Email Input */}
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus={true}
            />

            {/* Password Input */}
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Confirm Password Input */}

            <Input
              label="Confirm Password"
              id="confirm_password"
              name="confirm_password"
              type="password"
            />
          </div>

          <div className="relative space-y-1 pt-2">
            <span
              className={`block transform px-2 text-sm font-medium text-red-600 transition-all duration-300 ease-in ${isErrorVisible ? "visible translate-y-0" : "invisible -translate-y-2"}`}
            >
              {errorMessage || "&nbsp;"}
            </span>
            <button
              // disabled
              type="submit"
              className="w-full rounded-xl border-none bg-blue-500 py-2 text-white hover:bg-blue-600 focus:bg-blue-500 disabled:bg-opacity-70"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="">
          <button
            type="button"
            className="mt-4 w-full border border-emerald-800 bg-emerald-300 bg-opacity-50 px-4 py-2 text-emerald-900 hover:bg-opacity-75"
          >
            Have an Account? Login
          </button>
        </div>
      </section>
    </div>
  );
};

export default AuthForm;
