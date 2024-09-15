import React from "react";
// import AuthForm from "./components/Auth/AuthForm";
// import Header from "./components/Layout/Header";
import RootLayout from "./components/Layout/RootLayout";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import Profile from "./pages/Profile";
import useAuth from "./store/auth-context";
import ForgorPassword from "./pages/ForgorPassword";

function App() {
	const { isLoggedIn } = useAuth();
	const router = createBrowserRouter([
		{
			path: "/",
			element: <RootLayout />,
			id: "root",
			children: [
				{
					path: "/",
					element: <SignInPage />,
				},
				{ path: "/home", element: <Home /> },
				{
					path: "/profile",
					element: isLoggedIn ? <Profile /> : <Navigate to="/" />,
				},
				{
					path: "/forgot-password",
					element: !isLoggedIn ? <ForgorPassword /> : <Home />,
				},
			],
		},
	]);
	return <RouterProvider router={router} />;
}

export default App;
