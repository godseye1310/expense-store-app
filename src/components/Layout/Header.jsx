import React from 'react';

const Header = () => {
	return (
		<header className="flex text-black items-center py-4 ">
			<h1 className=" text-4xl text-sky-500">MyWebLink</h1>
			<nav className="flex px-5">
				<ul className="flex gap-8">
					<li className="text-black">Home</li>
					<li className="text-black">Products</li>
					<li className="text-black">About us</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
