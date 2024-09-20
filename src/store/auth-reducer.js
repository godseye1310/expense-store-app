import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	isLoggedIn: false,
	token: "",
	userID: "",
	userProfile: {},
};

const authSlice = createSlice({
	name: "authentication",
	initialState: initialState,
	reducers: {
		handleLogIn(state, action) {
			state.isLoggedIn = true;
			state.token = action.payload;
			console.log(state.isLoggedIn);
		},
		handleLogout(state) {
			state.token = null;
			state.userID = null;
			state.isLoggedIn = false;
			state.userProfile = null;
		},
		setUserID(state, action) {
			console.log(action.payload);
			state.userID = action.payload;
		},
		setUserProfile(state, action) {
			state.userProfile = { ...state.userProfile, ...action.payload };
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

const API_KEY = `AIzaSyAeaA33_FQzcq-GcLm5gDhBeAvjaFxOMY0`;
const FETCH_USER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;

export const fetchProfile = (token, navigateTo) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(FETCH_USER_URL, {
				idToken: token,
			});
			// console.log(response.data);
			const userProfileData = response.data.users[0];
			dispatch(authActions.setUserID(userProfileData.localId));
			dispatch(authActions.setUserProfile(userProfileData));
			// error
		} catch (error) {
			console.log(error.response.data);
			if (error.response.data.error.message === "INVALID_ID_TOKEN") {
				dispatch(authActions.handleLogout());
				localStorage.removeItem("token");
				navigateTo("/", { replace: true });
				alert("Session Time-out. The user must sign in again.");
			}
		}
	};
};
