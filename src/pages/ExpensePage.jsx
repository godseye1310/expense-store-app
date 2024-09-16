import React from "react";
import ExpenseForm from "../components/ExpenseTrack/ExpenseForm";
import ExpenseList from "../components/ExpenseTrack/ExpenseList";

const ExpensePage = () => {
	return (
		<div>
			<ExpenseForm />
			<ExpenseList />
		</div>
	);
};

export default ExpensePage;
