import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
	name: "theme",
	initialState: {
		darkMode: false,
		isPremium: false,
	},
	reducers: {
		toggleDarkMode: (state) => {
			state.darkMode = !state.darkMode;
		},
		activePremium: (state) => {
			state.isPremium = true;
		},
	},
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
