import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import ProfileForm from "../components/profile/ProfileForm";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-reducer";
import PopupModal from "../components/UI/PopupModal";
import { FaCheckCircle } from "react-icons/fa";
import { uiThemeActions } from "../store/ui-theme-reducer";

const API_KEY = `AIzaSyAeaA33_FQzcq-GcLm5gDhBeAvjaFxOMY0`;
const UPDATE_USER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

const Profile = () => {
	const [displayName, setDisplayName] = useState("");
	const [photoUrl, setPhotoUrl] = useState("");
	const inputRef = useRef(null);
	const [isVerified, setVerified] = useState(false);

	const dispatch = useDispatch();
	const { token, userProfile } = useSelector((state) => state.auth);

	// console.log(userProfile);
	const memoizedProfile = useMemo(() => {
		return {
			displayName: userProfile.displayName || "",
			photoUrl: userProfile.photoUrl || "",
			emailVerified: userProfile.emailVerified || false,
		};
	}, [userProfile]);

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
			const response = await axios.post(UPDATE_USER_URL, profileData);
			// console.log(response.data);
			dispatch(authActions.setUserProfile(response.data));
			console.log("success");
			dispatch(uiThemeActions.setProfileinfo(true));
		} catch (error) {
			console.log(error);
		} finally {
			setTimeout(() => {
				dispatch(uiThemeActions.setProfileinfo(false));
			}, 1500);
		}
	};

	useEffect(() => {
		if (memoizedProfile) {
			setDisplayName(memoizedProfile.displayName);
			setPhotoUrl(memoizedProfile.photoUrl);
			setVerified(memoizedProfile.emailVerified);
		}
	}, [memoizedProfile, isVerified]);

	let pfc = 0;
	if (displayName && photoUrl) {
		pfc = 100;
	} else if (displayName || photoUrl) {
		pfc = 50;
	}

	const { prfoileInfo } = useSelector((state) => state.theme);
	const darkMode = useSelector((state) => state.theme.darkMode);

	return (
		<div
			className={`h-full w-full ${darkMode ? "bg-gray-900" : "bg-inherit"}`}
		>
			<div className="flex justify-between border-b-2 border-b-gray-400 bg-neutral-400 px-0 pb-5 pt-2 max-sm:flex-col">
				<h3 className="pl-1 text-lg font-medium">
					Winners never quit, Quitters never win
				</h3>
				<div className="flex rounded-lg rounded-r-none bg-red-300 px-3 py-2 pr-0">
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
			<PopupModal
				className={`left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out ${prfoileInfo ? "translate-y-20 opacity-100" : "-translate-y-12 opacity-0"}`}
			>
				<p className="flex gap-3 rounded-3xl bg-blue-600 px-3 py-2 font-bold text-gray-300">
					Saved
					<FaCheckCircle className="size-6" />
				</p>
			</PopupModal>
		</div>
	);
};

export default Profile;
