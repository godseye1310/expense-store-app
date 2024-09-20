import { createSlice } from "@reduxjs/toolkit";

const initialState = { expenseList: [] };
const expenseSlice = createSlice({
	name: "expense",
	initialState: initialState,
	reducers: {
		addtoExpenseList(state, action) {
			state.expenseList = [...state.expenseList, action.payload];
		},
		fetchExpenseList(state, action) {
			state.expenseList = action.payload;
		},
		expenseDeleteHandler(state, action) {
			state.expenseList = state.expenseList.filter(
				(item) => item.id !== action.payload,
			);
		},
		expenseUpdateHandler(state, action) {
			//  TC:O(n) SC:O(1) less //flexible if new properties were added
			let updateItem = state.expenseList.find(
				(item) => item.id === action.payload.id,
			);
			if (updateItem) {
				updateItem.amount = action.payload.amount;
				updateItem.title = action.payload.title;
				updateItem.category = action.payload.category;
			}

			//  TC:O(n) SC:O(1) // most optimal overall
			// const updateIndex = state.expenseList.findIndex(
			// 	(item) => item.id === action.payload.id
			// );
			// if (updateIndex !== -1) {
			// 	state.expenseList[updateIndex] = { ...state.expenseList[updateIndex], ...action.payload };
			// }

			// TC:O(n) SC:O(n) //creates new array //high space complexity
			// state.expenseList = state.expenseList.map((item) => {
			// 	return item.id === action.payload.id
			// 		? { ...item, ...action.payload }
			// 		: item;
			// });
		},
	},
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
