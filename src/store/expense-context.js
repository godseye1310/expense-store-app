import React, { useContext, useState } from "react";

const ExpenseContext = React.createContext();

export const ExpenseProvider = ({ children }) => {
	const [expenseList, setExpenseList] = useState([]);

	const addtoExpenseList = (item) => {
		setExpenseList((prev) => [...prev, item]);
	};

	const expenseCtx = {
		expenseList,
		addtoExpenseList,
	};

	console.log(expenseList);
	return (
		<ExpenseContext.Provider value={expenseCtx}>
			{children}
		</ExpenseContext.Provider>
	);
};

const useExpense = () => useContext(ExpenseContext);

export default useExpense;
