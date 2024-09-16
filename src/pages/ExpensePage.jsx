import React from "react";
import ExpenseForm from "../components/ExpenseTrack/ExpenseForm";
import ExpenseList from "../components/ExpenseTrack/ExpenseList";
import useDisplay from "../store/display-ctx";

const ExpensePage = () => {
	const { expenseFormDisplay, setExpenseFormDisplay } = useDisplay();
	return (
		<div className="relative h-full w-full">
			{expenseFormDisplay && <ExpenseForm />}
			<ExpenseList />
			<button
				type="button"
				onClick={() => {
					setExpenseFormDisplay(true);
				}}
				className="absolute left-1/2 top-1 rounded-full bg-blue-600 px-2.5 py-2 text-3xl font-extrabold leading-none text-white"
			>
				+
			</button>
		</div>
	);
};

export default ExpensePage;
