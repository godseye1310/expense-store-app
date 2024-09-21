import React from "react";
import { VscGlobe } from "react-icons/vsc";
import { FaGithub, FaUserCircle } from "react-icons/fa";
import VerifyEmailBtn from "./VerifyEmailBtn";
import { MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";

const ProfileForm = ({
	handlePrfofileSubmit,
	displayName,
	setDisplayName,
	inputRef,
	photoUrl,
	setPhotoUrl,
	isVerified,
}) => {
	const darkMode = useSelector((state) => state.theme.darkMode);
	//User Profile
	return (
		<form
			onSubmit={handlePrfofileSubmit}
			className={`relative w-3/4 rounded-md border-b-2 border-b-gray-600 bg-transparent px-2 py-8 shadow-lg shadow-gray-600 max-md:w-full ${darkMode && "text-white"}`}
		>
			<div className="flex items-end gap-x-5 pb-10 pr-4 pt-5 max-xs:justify-between">
				<h1 className="text-3xl leading-normal underline">
					Contact Details
				</h1>

				{photoUrl ? (
					<img
						src={photoUrl}
						alt={displayName}
						className="size-16 rounded-full object-cover object-center"
					/>
				) : (
					<FaUserCircle className="size-10 rounded-full" />
				)}
			</div>
			<section className="flex w-full flex-wrap justify-between gap-4 max-md:flex-col max-md:gap-5">
				<div className="flex flex-grow items-center justify-between gap-2 max-md:w-full max-md:justify-between max-xs:flex-col">
					<label
						htmlFor="name"
						className="flex w-[153px] items-center gap-1 text-start max-xs:w-full"
					>
						<span>
							<FaGithub className="text-2xl" />
						</span>
						Full Name:
					</label>
					<input
						id="name"
						name="name"
						type="text"
						value={displayName}
						ref={inputRef}
						onChange={(e) => setDisplayName(e.target.value)}
						required
						className={`flex-1 rounded border-2 border-gray-300 bg-white px-3 py-1 outline-none focus:border-gray-500 max-xs:w-full ${darkMode && "text-gray-950"}`}
					/>
				</div>
				<div className="flex flex-grow items-center gap-2 max-md:w-full max-md:justify-between max-xs:flex-col">
					<label
						htmlFor="pfpurl"
						className="flex w-[153px] items-center gap-1 text-start max-xs:w-full"
					>
						<span>
							<VscGlobe className="text-2xl" />
						</span>
						Profile Photo URL
					</label>
					<input
						id="pfpurl"
						name="pfpurl"
						type="url"
						value={photoUrl}
						onChange={(e) => setPhotoUrl(e.target.value)}
						required
						className={`flex-1 rounded border-2 border-gray-300 bg-white px-3 py-1 outline-none focus:border-gray-500 max-xs:w-full ${darkMode && "text-gray-950"}`}
					/>
				</div>
			</section>
			<div className="mt-6 space-x-3 font-semibold">
				<button
					type="submit"
					className="rounded-lg bg-red-400 px-2 py-1 text-white hover:bg-red-500"
				>
					Update
				</button>
				<button
					type="button"
					onClick={() => {
						if (inputRef.current) {
							inputRef.current.focus();
						}
					}}
					className="rounded-lg bg-red-400 px-2 py-1 text-white hover:bg-red-500"
				>
					Edit
				</button>

				<button
					disabled
					type="button"
					className="absolute bottom-8 right-3 rounded border-2 border-red-500 bg-white px-2 py-0.5 font-medium text-red-400 disabled:border-opacity-50 disabled:text-gray-400 disabled:text-opacity-50 disabled:hover:bg-none"
				>
					cancel
				</button>
			</div>
			<span className="absolute right-2 top-1">
				{!isVerified && <VerifyEmailBtn />}
				{isVerified && (
					<p className="flex items-center p-0.5">
						Email Verified
						<span>
							<MdVerified className="text-green-600" />
						</span>
					</p>
				)}
			</span>
		</form>
	);
};

export default ProfileForm;
