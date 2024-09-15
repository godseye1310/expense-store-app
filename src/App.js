import React from "react";
// import AuthForm from "./components/Auth/AuthForm";
// import Header from "./components/Layout/Header";
import RootLayout from "./components/Layout/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    children: [
      { path: "/", element: <SignInPage /> },
      { path: "/home", element: <Home /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
