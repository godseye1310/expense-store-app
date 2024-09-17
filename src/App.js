import React, { useEffect } from "react";
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
// import useAuth from "./store/auth-context";
import ForgorPassword from "./pages/ForgorPassword";
import ExpensePage from "./pages/ExpensePage";
// import { ExpenseProvider } from "./store/expense-context";
import { DisplayProvider } from "./store/display-ctx";
import About from "./pages/About";
import Products from "./pages/Products";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth-reducer";

function App() {
	// const { isLoggedIn } = useAuth();

	const dispatch = useDispatch();
	useEffect(() => {
		// Check if token exists in localStorage
		const storedToken = localStorage.getItem("token");
		if (storedToken) {
			// Dispatch the login action with the token from localStorage
			dispatch(authActions.handleLogIn(storedToken));
		}
	}, [dispatch]);

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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
