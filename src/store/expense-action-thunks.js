import axios from "axios";
import { expenseActions } from "./expense-reducer";
import { clearForm } from "./e-form-reducer";

const RTDB_URL = `https://expense-store-app-default-rtdb.asia-southeast1.firebasedatabase.app`;

export const addExpense = (expenseItem, userID) => {
	return (dispatch) => {
		const addExpenseItem = async () => {
			try {
				const response = await axios.post(
					`${RTDB_URL}/${userID}/userExpense.json`,
					expenseItem,
				);
				console.log(response.data);
				console.log(
					response.status,
					response.statusText,
					"Expense ADD Success",
				);
				// console.log({ ...expenseItem, id: response.data.name });
				const newExpense = { ...expenseItem, id: response.data.name };
				dispatch(expenseActions.addtoExpenseList(newExpense));
				dispatch(clearForm());
			} catch (error) {
				console.log(error.response.data);
			} finally {
			}
		};
		addExpenseItem();
	};
};

export const fetchExpense = (userID) => {
	return (dispatch) => {
		const fetchExpenseList = async () => {
			try {
				console.log("fetch ID: ", userID);

				const response = await axios.get(
					`${RTDB_URL}/${userID}/userExpense.json`,
				);
				// console.log(response.data);
				console.log(
					response.status,
					response.statusText,
					"Expense Fetch Success",
				);

				let fetchList = [];
				if (response.data) {
					let fetchList = Object.keys(response.data).map((key) => {
						return { ...response.data[key], id: key };
					});
					// console.log(fetchList);
					dispatch(expenseActions.fetchExpenseList(fetchList));
				} else {
					dispatch(expenseActions.fetchExpenseList(fetchList));
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchExpenseList();
	};
};

export const deleteExpense = (id, userID) => {
	return (dispatch) => {
		const deleteExpenseItem = async () => {
			try {
				const response = await axios.delete(
					`${RTDB_URL}/${userID}/userExpense/${id}.json`,
				);
				console.log(
					response.status,
					response.statusText,
					"Expense Delete Success",
				);
				if (response.status === 200) {
					console.log("Expense successfuly deleted");
					dispatch(expenseActions.expenseDeleteHandler(id));
				}
			} catch (error) {
				console.log(error);
			}
		};
		deleteExpenseItem();
	};
};

export const updateExpense = (updateItem, id, userID) => {
	return (dispatch) => {
		const updateExpenseItem = async () => {
			try {
				const response = await axios.put(
					`${RTDB_URL}/${userID}/userExpense/${id}.json`,
					updateItem,
				);
				// console.log(response.data);
				console.log(
					response.status,
					response.statusText,
					"Expense Update Success",
				);
				if (response.status === 200) {
					// console.log(updateItem, id);
					dispatch(
						expenseActions.expenseUpdateHandler({
							...response.data,
							id: id,
						}),
					);
					dispatch(clearForm());
				}
			} catch (error) {
				console.log(error);
			}
		};
		updateExpenseItem();
	};
};
