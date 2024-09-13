import React from "react";

const Header = () => {
  return (
    <header className="flex items-center py-2">
      <h1 className="text-4xl text-sky-500">MyWebLink</h1>
      <nav className="px-5">
        <ul className="flex gap-8">
          <li className="">Home</li>
          <li className="">Products</li>
          <li className="">About us</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
