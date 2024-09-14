import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center py-2">
      <h1 className="pl-5 text-4xl text-sky-500">MyWebLink</h1>
      <nav className="px-5">
        <ul className="flex gap-8">
          <li className="">
            <NavLink to="/home">Home</NavLink>
          </li>
          <li className="">
            <NavLink>Products</NavLink>
          </li>
          <li className="">
            <NavLink>About us</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
