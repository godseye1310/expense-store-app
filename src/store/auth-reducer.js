import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	isLoggedIn: false,
	token: "",
	userID: "",
};

const authSlice = createSlice({
	name: "authentication",
	initialState: initialState,
	reducers: {
		handleLogIn(state, action) {
			state.isLoggedIn = true;
			state.token = action.payload;
		},
		handleLogout(state) {
			state.token = null;
			state.userID = null;
			state.isLoggedIn = false;
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
			console.log(response.data);
		} catch (error) {
			console.log(error.response.data);
			if (error.response.data.error.message === "INVALID_ID_TOKEN") {
				alert("Session Time-out. The user must sign in again.");
				navigateTo("/", { replace: true });
				dispatch(authActions.handleLogout());
			}
		}
	};
};
