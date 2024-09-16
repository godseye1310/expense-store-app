import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";

const ExpenseContext = React.createContext();

const RTDB_URL = `https://expense-store-app-default-rtdb.asia-southeast1.firebasedatabase.app/userExpense`;

export const ExpenseProvider = ({ children }) => {
	const [expenseList, setExpenseList] = useState([]);

	const addtoExpenseList = async (item) => {
		try {
			const response = await axios.post(`${RTDB_URL}.json`, item);
			// console.log(response.data);
			setExpenseList((prev) => [
				...prev,
				{ ...item, id: response.data.name },
			]);
		} catch (error) {
			console.log(error.response.data);
		}
	};

	const fetchExpenseList = useCallback(async () => {
		try {
			const response = await axios.get(`${RTDB_URL}.json`);
			// console.log(response.data);
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

	const expenseCtx = {
		expenseList,
		addtoExpenseList,
		fetchExpenseList,
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
