import React from "react";
// import useExpense from "../../store/expense-context";
import useDisplay from "../../store/display-ctx";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expense-reducer";

const ExpenseList = ({ handleEditExpenseData }) => {
	// const { expenseList, expenseDeleteHandler, handleEditExpenseData } = useExpense();
	const { setExpenseFormDisplay } = useDisplay();

	const expenseList = useSelector((state) => state.expense.expenseList);

	const dispatch = useDispatch();

	const handleDelete = (id) => {
		// expenseDeleteHandler(id);
		dispatch(expenseActions.expenseDeleteHandler(id));
	};

	const handleEdit = (item) => {
		setExpenseFormDisplay(true);
		handleEditExpenseData(item);
	};

	const darkMode = useSelector((state) => state.theme.darkMode);

	return (
		<div className="relative px-5 py-8">
			<h1 className={`pb-8 text-2xl font-semibold`}>ExpenseList</h1>
			<div>
				<ul
					className={`flex w-1/2 list-none flex-col gap-2 bg-blue-300 px-1 py-4 max-sm:w-full ${darkMode ? "bg-neutral-800" : ""}`}
				>
					{expenseList.map((item) => {
						return (
							<li
								key={item.id}
								className="flex justify-evenly gap-2"
							>
								<span>${item.amount}-</span>
								<span>{item.category}-</span>
								<span>{item.descripition}-</span>
								<button
									onClick={() => handleDelete(item.id)}
									type="button"
									className="rounded-md border border-gray-600 bg-slate-500 px-1 py-0.5 hover:bg-slate-400"
								>
									Delete
								</button>
								<button
									onClick={() => handleEdit(item)}
									type="button"
									className="rounded-md border border-gray-600 bg-slate-500 px-1 py-0.5 hover:bg-slate-400"
								>
									Edit
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default ExpenseList;
