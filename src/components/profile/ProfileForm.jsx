import React from "react";
import { VscGlobe } from "react-icons/vsc";
import { FaGithub } from "react-icons/fa";
import VerifyEmailBtn from "./VerifyEmailBtn";
import { MdVerified } from "react-icons/md";

const ProfileForm = ({
	handlePrfofileSubmit,
	displayName,
	setDisplayName,
	inputRef,
	photoUrl,
	setPhotoUrl,
	isVerified,
}) => {
	//User Profile
	return (
		<form
			onSubmit={handlePrfofileSubmit}
			className="relative w-3/4 border-b-2 border-b-gray-600 bg-white px-2 py-8 shadow-lg shadow-slate-500 max-md:w-full"
		>
			<div className="items- inline-flex gap-1 pr-4">
				<h1 className="pb-8 text-3xl leading-normal underline">
					Contact Details
				</h1>
				<img
					src={photoUrl}
					alt={displayName}
					className="size-12 rounded-full"
				/>
			</div>
			<section className="flex w-full justify-evenly gap-x-3 max-md:flex-col max-md:gap-5">
				<div className="flex w-1/2 max-md:w-full max-md:justify-between max-xs:flex-col">
					<label
						htmlFor="name"
						className="flex w-1/3 items-start gap-1 text-start max-xs:w-full"
					>
						<FaGithub className="inline-block text-2xl" />
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
						className="w-2/3 rounded border-2 border-gray-300 bg-white px-3 py-1 outline-none focus:border-gray-500 max-xs:w-full"
					/>
				</div>
				<div className="flex w-1/2 items-baseline max-md:w-full max-md:justify-between max-xs:flex-col">
					<label
						htmlFor="pfpurl"
						className="flex w-1/3 items-start gap-1 text-start max-xs:w-full"
					>
						<VscGlobe className="inline-block text-2xl" />
						Profile Photo URL
					</label>
					<input
						id="pfpurl"
						name="pfpurl"
						type="url"
						value={photoUrl}
						onChange={(e) => setPhotoUrl(e.target.value)}
						required
						className="w-2/3 rounded border-2 border-gray-300 bg-white px-3 py-1 outline-none focus:border-gray-500 max-xs:w-full"
					/>
				</div>
			</section>
			<div className="mt-6 space-x-1">
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
					type="button"
					className="absolute bottom-8 right-3 rounded border-2 border-red-500 bg-white px-2 py-0.5 font-medium text-red-400 hover:bg-rose-100"
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
