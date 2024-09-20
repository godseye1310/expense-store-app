import axios from "axios";
import { expenseActions } from "./expense-reducer";

const RTDB_URL = `https://expense-store-app-default-rtdb.asia-southeast1.firebasedatabase.app/userExpense`;

export const addExpense = (expenseItem) => {
	return (dispatch) => {
		const addExpenseItem = async () => {
			try {
				const response = await axios.post(
					`${RTDB_URL}.json`,
					expenseItem,
				);
				console.log(response.data);
				console.log(
					response.status,
					response.statusText,
					"Expense ADD Success",
				);
				// setExpenseList((prev) => [
				// 	...prev,
				// 	{ ...item, id: response.data.name },
				// ]);

				console.log({ ...expenseItem, id: response.data.name });
				const newExpense = { ...expenseItem, id: response.data.name };

				dispatch(expenseActions.addtoExpenseList(newExpense));
			} catch (error) {
				console.log(error.response.data);
			}
		};
		addExpenseItem();
	};
};

export const fetchExpense = () => {
	return (dispatch) => {
		const fetchExpenseList = async () => {
			try {
				const response = await axios.get(`${RTDB_URL}.json`);
				// console.log(response.data);
				console.log(
					response.status,
					response.statusText,
					"Expense Fetch Success",
				);
				const fetchList = Object.keys(response.data).map((key) => {
					return { ...response.data[key], id: key };
				});
				// console.log(fetchList);
				dispatch(expenseActions.fetchExpenseList(fetchList));
			} catch (error) {
				console.log(error);
			}
		};
		fetchExpenseList();
	};
};

export const deleteExpense = (id) => {
	return (dispatch) => {
		const deleteExpenseItem = async () => {
			try {
				const response = await axios.delete(`${RTDB_URL}/${id}.json`);
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

export const updateExpense = (updateItem, id) => {
	return (dispatch) => {
		const updateExpenseItem = async () => {
			try {
				const response = await axios.put(
					`${RTDB_URL}/${id}.json`,
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
				}
			} catch (error) {
				console.log(error);
			}
		};
		updateExpenseItem();
	};
};
