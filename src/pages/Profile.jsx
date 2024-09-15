import React, { useEffect, useRef, useState } from "react";
import useAuth from "../store/auth-context";
import axios from "axios";
import ProfileForm from "../components/profile/ProfileForm";
import { useNavigate } from "react-router-dom";

const API_KEY = `AIzaSyAeaA33_FQzcq-GcLm5gDhBeAvjaFxOMY0`;

const UPDATE_USER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
const FETCH_USER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;

const Profile = () => {
	const [displayName, setDisplayName] = useState("");
	const [photoUrl, setPhotoUrl] = useState("");
	const inputRef = useRef(null);
	const [isVerified, setVerified] = useState(false);

	const navigateTo = useNavigate();

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
				console.log(response.data);
				setDisplayName(response.data.users[0].displayName);
				setPhotoUrl(response.data.users[0].photoUrl);
				setVerified(response.data.users[0].emailVerified);
			} catch (error) {
				console.log(error.response.data);
				if (error.response.data.error.message === "INVALID_ID_TOKEN") {
					alert("Session Time-out. The user must sign in again.");
					navigateTo("/", { replace: true });
				}
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
				<ProfileForm
					handlePrfofileSubmit={handlePrfofileSubmit}
					displayName={displayName}
					setDisplayName={setDisplayName}
					inputRef={inputRef}
					photoUrl={photoUrl}
					setPhotoUrl={setPhotoUrl}
					isVerified={isVerified}
				/>
			</div>
		</div>
	);
};

export default Profile;
