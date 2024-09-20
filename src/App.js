import React, { useEffect, useState } from "react";
import RootLayout from "./components/Layout/RootLayout";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
	useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import Profile from "./pages/Profile";
import ForgorPassword from "./pages/ForgorPassword";
import ExpensePage from "./pages/ExpensePage";
import { DisplayProvider } from "./store/display-ctx";
import About from "./pages/About";
import Products from "./pages/Products";
import { useDispatch, useSelector } from "react-redux";
import { authActions, fetchProfile } from "./store/auth-reducer";

let isInitialLoad = true;

function App() {
	const dispatch = useDispatch();

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	// const navigateTo = useNavigate();
	const [isLoadingAuth, setIsLoadingAuth] = useState(true); // To handle the initial loading state

	useEffect(() => {
		// console.log(isLoggedIn);
		// Check if token exists in localStorage
		const storedToken = localStorage.getItem("token");
		if (storedToken && isInitialLoad) {
			// Dispatch the login action with the token from localStorage
			dispatch(authActions.handleLogIn(storedToken));
			// dispatch(fetchProfile(storedToken));
		}
		isInitialLoad = false;
		// Once token is checked and dispatched, stop loading
		setIsLoadingAuth(false);
	}, [dispatch, isLoggedIn]);

	// Avoid rendering routes until we check for token
	if (isLoadingAuth) {
		return <div>Loading...</div>; // loading spinner
	}

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
				{ path: "/about", element: <About /> },
				{ path: "/products", element: <Products /> },
				{
					path: "/profile",
					element: isLoggedIn ? <Profile /> : <Navigate to="/" />,
				},
				{
					path: "/forgot-password",
					element: !isLoggedIn ? <ForgorPassword /> : <Home />,
				},
				{
					path: "/user-expense",
					element: isLoggedIn ? <ExpensePage /> : <Navigate to="/" />,
				},
			],
		},
	]);
	return (
		<DisplayProvider>
			<RouterProvider router={router} />
		</DisplayProvider>
	);
}

export default App;
