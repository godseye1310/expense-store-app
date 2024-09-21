import { createSlice } from "@reduxjs/toolkit";

const uiThemeSlice = createSlice({
	name: "theme",
	initialState: {
		darkMode: false,
		isPremium: false,
		message: {
			isVisible: false,
			info: "",
			clxName: "",
		},
		logInfo: {
			isVisible: false,
			info: "",
		},
		isEformDisplay: false,
		prfoileInfo: false,
	},
	reducers: {
		toggleDarkMode: (state) => {
			state.darkMode = !state.darkMode;
		},
		setDarkMode: (state, action) => {
			state.darkMode = action.payload;
		},
		activePremium: (state, action) => {
			state.isPremium = action.payload;
		},
		setExpenseinfo(state, action) {
			state.message = {
				isVisible: action.payload.isVisible,
				info: action.payload.info,
				clxName: action.payload.clxName,
			};
		},
		setLogInfo(state, action) {
			state.logInfo = {
				isVisible: action.payload.isVisible,
				info: action.payload.info,
			};
		},
		setFormDisplay(state, action) {
			state.isEformDisplay = action.payload;
		},
		setProfileinfo(state, action) {
			state.prfoileInfo = action.payload;
		},
	},
});

export const uiThemeActions = uiThemeSlice.actions;
export default uiThemeSlice.reducer;
