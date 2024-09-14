import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const RootLayout = () => {
  return (
    <main className="">
      <Header />
      <div className="relative h-full w-full">
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
