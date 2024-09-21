import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense } from "../../store/expense-action-thunks";
import {
	setAmount,
	setCategory,
	setEdit,
	setTitle,
} from "../../store/e-form-reducer";
import { RiDeleteBin5Line } from "react-icons/ri";
import { HiPencilAlt } from "react-icons/hi";
import { uiThemeActions } from "../../store/ui-theme-reducer";

const ExpenseList = () => {
	const expenseList = useSelector((state) => state.expense.expenseList);
	const userID = useSelector((state) => state.auth.userID);
	const dispatch = useDispatch();

	const handleDelete = (id) => {
		dispatch(deleteExpense(id, userID));
	};

	const handleEdit = (item) => {
		dispatch(uiThemeActions.setFormDisplay(true));
		// console.log(item);
		dispatch(setAmount(item.amount));
		dispatch(setTitle(item.title));
		dispatch(setCategory(item.category));
		dispatch(setEdit(item.id));
	};

	const darkMode = useSelector((state) => state.theme.darkMode);

	return (
		<div className="-z-10 mt-6 px-3 py-8 max-xs:px-1">
			<h1 className={`pb-8 text-4xl font-semibold max-xs:text-2xl`}>
				Expense List
			</h1>
			<div className="relative max-w-full">
				<ul
					className={`flex w-fit flex-1 list-none flex-col gap-2 rounded-lg bg-white/30 p-6 px-1 py-4 text-black/90 backdrop-blur-md max-md:w-full ${darkMode ? "bg-slate-900" : ""}`}
				>
					<div className="absolute left-0 top-0 -z-10 h-full w-full rounded-xl bg-teal-600 bg-opacity-65"></div>
					<li
						className={`grid w-full grid-cols-9 items-center justify-items-start gap-3 rounded-md bg-blue-900 bg-opacity-75 px-2 py-5 text-gray-300 max-md:grid-cols-10 max-xs:gap-x-1 max-xs:text-sm`}
					>
						<div className="col-span-1 self-center text-left font-bold max-md:col-span-2">
							Amount
						</div>
						<div className="col-span-3 self-center text-left font-bold">
							Title
						</div>
						<div className="col-span-2 self-center text-left font-bold">
							Category
						</div>
						<div className="col-span-1 self-center text-left font-bold"></div>
						<div className="col-span-1 self-center text-left font-bold"></div>
					</li>
					{expenseList.map((item) => {
						return (
							<li
								key={item.id}
								className={`grid w-full grid-cols-9 items-center justify-items-start gap-3 rounded px-2 py-4 transition-all duration-300 ease-in-out hover:shadow-sm hover:shadow-gray-800 max-md:grid-cols-10 max-xs:gap-x-1 max-xs:text-sm ${darkMode ? "text-gray-200 hover:bg-black/35" : "text-black/75 hover:bg-black/30"}`}
							>
								<div className="col-span-1 self-center text-left font-bold max-md:col-span-2">
									${item.amount}
								</div>
								<div className="col-span-3 self-center text-left">
									{item.title}
								</div>
								<div className="col-span-2 self-center text-left font-semibold">
									{item.category}
								</div>
								<button
									onClick={() => handleDelete(item.id)}
									type="button"
									className="col-span-1 self-center justify-self-center rounded bg-red-500 p-1 px-0.5 text-gray-100 hover:bg-rose-600 hover:text-white"
								>
									<RiDeleteBin5Line className="text-lg" />
								</button>
								<button
									onClick={() => handleEdit(item)}
									type="button"
									className="col-span-1 self-center justify-self-center rounded bg-blue-500 p-1 text-amber-500 hover:bg-amber-600 hover:text-white"
								>
									<HiPencilAlt className="text-lg" />
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
