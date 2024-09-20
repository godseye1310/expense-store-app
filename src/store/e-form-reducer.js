import { createSlice } from "@reduxjs/toolkit";

const initialState = { amount: "", title: "", category: "", isEditID: null };
const expenseFormSlice = createSlice({
	name: "expenseForm",
	initialState,
	reducers: {
		setAmount: (state, action) => {
			state.amount = action.payload;
		},
		setTitle: (state, action) => {
			state.title = action.payload;
		},
		setCategory: (state, action) => {
			state.category = action.payload;
		},
		clearForm: (state) => {
			state.amount = "";
			state.title = "";
			state.category = "";
		},
		setEdit: (state, action) => {
			state.isEditID = action.payload;
		},
	},
});

export const { setAmount, setTitle, setCategory, clearForm, setEdit } =
	expenseFormSlice.actions;

export default expenseFormSlice.reducer;
