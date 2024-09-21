import { createSlice } from "@reduxjs/toolkit";

const uiThemeSlice = createSlice({
	name: "theme",
	initialState: {
		darkMode: false,
		isPremium: false,
		message: {
			status: "",
			info: "",
			clxName: "",
		},
	},
	reducers: {
		toggleDarkMode: (state) => {
			state.darkMode = !state.darkMode;
		},
		activePremium: (state, action) => {
			state.isPremium = action.payload;
		},
		expenseinfo(state, action) {
			state.message = {
				status: action.payload.status,
				info: action.payload.info,
				clxName: action.payload.clxName,
			};
		},
	},
});

export const uiThemeActions = uiThemeSlice.actions;
export default uiThemeSlice.reducer;
