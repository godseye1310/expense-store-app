import React, { useCallback, useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseTrack/ExpenseForm";
import ExpenseList from "../components/ExpenseTrack/ExpenseList";
import useDisplay from "../store/display-ctx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/expense-reducer";
import { themeActions } from "../store/theme-reducer";

const RTDB_URL = `https://expense-store-app-default-rtdb.asia-southeast1.firebasedatabase.app/userExpense`;

const ExpensePage = () => {
	const { expenseFormDisplay, setExpenseFormDisplay } = useDisplay();

	const dispatch = useDispatch();

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
			// setExpenseList(fetchList);
			// console.log(fetchList);
			dispatch(expenseActions.fetchExpenseList(fetchList));
		} catch (error) {
			console.log(error);
		}
	}, [dispatch]);
	useEffect(() => {
		fetchExpenseList();
	}, [fetchExpenseList]);

	const [editExpense, setEditExpense] = useState();
	const handleEditExpenseData = (item) => {
		// console.log(item);
		setEditExpense(item);
		// setAmount(item.amount);
		// setDescripition(item.descripition);
		// setCategory(item.category);
	};

	const handlePremium = () => {
		dispatch(themeActions.activePremium());
	};

	const expenseList = useSelector((state) => state.expense.expenseList);

	const totalExpense = expenseList.reduce((acc, curr) => {
		return acc + +curr.amount;
	}, 0);

	// console.log(totalExpense);
	const darkMode = useSelector((state) => state.theme.darkMode);

	return (
		<div
			className={`relative h-full w-full ${darkMode ? "bg-gray-900 text-white" : "bg-gray-300"}`}
		>
			{expenseFormDisplay && <ExpenseForm editExpense={editExpense} />}
			<ExpenseList handleEditExpenseData={handleEditExpenseData} />
			<button
				type="button"
				onClick={() => {
					setExpenseFormDisplay(true);
				}}
				className="absolute left-1/2 top-1 rounded-full bg-blue-600 px-2.5 py-2 text-3xl font-extrabold leading-none text-white"
			>
				+
			</button>

			{totalExpense > 10000 && (
				<div>
					<button
						onClick={handlePremium}
						className="absolute right-5 top-3 rounded-md bg-amber-700 px-2 py-1"
					>
						Activate Premium
					</button>
				</div>
			)}

			<div className="px-5 py-8"></div>
		</div>
	);
};

export default ExpensePage;
