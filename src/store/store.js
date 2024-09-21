import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-reducer";
import eFormReducer from "./e-form-reducer";
import expenseReducer from "./expense-reducer";
import uiThemeReducer from "./ui-theme-reducer";

const store = configureStore({
	reducer: {
		auth: authReducer,
		expenseForm: eFormReducer,
		expense: expenseReducer,
		theme: uiThemeReducer,
	},
});

export default store;
