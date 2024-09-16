import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";

const ExpenseContext = React.createContext();

const RTDB_URL = `https://expense-store-app-default-rtdb.asia-southeast1.firebasedatabase.app/userExpense`;

export const ExpenseProvider = ({ children }) => {
	const [amount, setAmount] = useState("");
	const [descripition, setDescripition] = useState("");
	const [category, setCategory] = useState("");

	const [expenseList, setExpenseList] = useState([]);

	const addtoExpenseList = useCallback(async (item) => {
		try {
			const response = await axios.post(`${RTDB_URL}.json`, item);
			// console.log(response.data);
			console.log(
				response.status,
				response.statusText,
				"Expense ADD Success",
			);
			setExpenseList((prev) => [
				...prev,
				{ ...item, id: response.data.name },
			]);
		} catch (error) {
			console.log(error.response.data);
		}
	}, []);

	const fetchExpenseList = useCallback(async () => {
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

			setExpenseList(fetchList);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		fetchExpenseList();
	}, [fetchExpenseList]);

	const expenseDeleteHandler = async (id) => {
		try {
			const response = await axios.delete(`${RTDB_URL}/${id}.json`);
			console.log(
				response.status,
				response.statusText,
				"Expense Delete Success",
			);
			if (response.status === 200) {
				setExpenseList((prevItem) => {
					return prevItem.filter((item) => item.id !== id);
				});
				console.log("Expense successfuly deleted");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const expenseUpdateHandler = useCallback(async (updateItem, id) => {
		// console.log(updateItem, id);
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
			setExpenseList((prev) =>
				prev.map((item) => {
					return item.id === id ? { ...item, ...updateItem } : item;
				}),
			);
			console.log("Expense successfuly updated");
		} catch (error) {
			console.log(error.response.data);
		}
	}, []);

	const [editExpense, setEditExpense] = useState();
	const handleEditExpenseData = (item) => {
		// console.log(item);
		setEditExpense(item);
		setAmount(item.amount);
		setDescripition(item.descripition);
		setCategory(item.category);
	};

	const expenseCtx = {
		setExpense: {
			amount,
			setAmount,
			descripition,
			setDescripition,
			category,
			setCategory,
		},
		expenseList,
		addtoExpenseList,
		fetchExpenseList,
		expenseDeleteHandler,

		handleEditExpenseData,
		editExpense,
		expenseUpdateHandler,
	};

	// console.log(expenseList);
	return (
		<ExpenseContext.Provider value={expenseCtx}>
			{children}
		</ExpenseContext.Provider>
	);
};

const useExpense = () => useContext(ExpenseContext);

export default useExpense;
