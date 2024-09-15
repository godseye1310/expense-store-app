import React, { useEffect, useRef, useState } from "react";
import useAuth from "../store/auth-context";
import axios from "axios";
import { VscGlobe } from "react-icons/vsc";
import { FaGithub } from "react-icons/fa";
import VerifyEmailBtn from "../components/profile/VerifyEmailBtn";

const API_KEY = `AIzaSyAeaA33_FQzcq-GcLm5gDhBeAvjaFxOMY0`;

const UPDATE_USER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
const FETCH_USER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;

const Profile = () => {
	const [displayName, setDisplayName] = useState("");
	const [photoUrl, setPhotoUrl] = useState("");
	const inputRef = useRef(null);

	const { token } = useAuth();

	let pfc = 0;

	if (displayName && photoUrl) {
		pfc = 100;
	} else if (displayName || photoUrl) {
		pfc = 50;
	}

	const handlePrfofileSubmit = async (event) => {
		event.preventDefault();

		const profileData = {
			idToken: token,
			displayName: displayName,
			photoUrl: photoUrl,
			deleteAttribute: [],
			returnSecureToken: true,
		};

		try {
			// console.log(profileData);
			const response = await axios.post(UPDATE_USER_URL, profileData);
			console.log(response.data);
		} catch (error) {
			console.log(error.response);
		}
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.post(FETCH_USER_URL, {
					idToken: token,
				});
				// console.log(response.data);
				setDisplayName(response.data.users[0].displayName);
				setPhotoUrl(response.data.users[0].photoUrl);
			} catch (error) {
				console.log(error.response.data);
			}
		};

		if (token) {
			fetchUserData();
		}
	}, [token]);

	return (
		<div className="h-full w-full pt-2">
			<div className="flex justify-between border-b-2 border-b-gray-400 px-1 pb-5 max-sm:flex-col">
				<h3 className="text-lg font-medium">
					Winners never quit, Quitters never win
				</h3>
				<div className="flex rounded-lg rounded-r-none bg-red-200 px-3 py-2 pr-0">
					<p className="w-96">
						Your Profile is <strong>{pfc}%</strong> completed. A
						complete Profile has higher chance of landing a job.{" "}
						{pfc !== 100 && (
							<span className="text-blue-600">
								Kindly Complete
							</span>
						)}
					</p>
				</div>
			</div>

			<div className="flex justify-end px-4 py-8 max-md:justify-center">
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
				</form>
				<VerifyEmailBtn />
			</div>
		</div>
	);
};

export default Profile;
