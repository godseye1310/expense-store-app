import React, { useEffect } from "react";
import ExpenseForm from "../components/ExpenseTrack/ExpenseForm";
import ExpenseList from "../components/ExpenseTrack/ExpenseList";
import useDisplay from "../store/display-ctx";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../store/theme-reducer";
import ExpenseDownloadBtn from "../components/ExpenseTrack/ExpenseDownloadBtn";
import { fetchExpense } from "../store/expense-action-thunks";

const ExpensePage = () => {
	const { expenseFormDisplay, setExpenseFormDisplay } = useDisplay();

	const dispatch = useDispatch();
	const { userID } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(fetchExpense(userID));
	}, [dispatch, userID]);

	const handlePremium = () => {
		dispatch(themeActions.activePremium());
	};
	const isPremium = useSelector((state) => state.theme.isPremium);

	const expenseList = useSelector((state) => state.expense.expenseList);
	const totalExpense = expenseList.reduce((acc, curr) => {
		return acc + +curr.amount;
	}, 0);

	const darkMode = useSelector((state) => state.theme.darkMode);

	return (
		<div
			className={`relative h-full w-full ${darkMode ? "bg-gray-900 text-white" : "bg-gray-300"}`}
		>
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

			{totalExpense > 10000 && (
				<div>
					<button
						onClick={handlePremium}
						className="absolute right-5 top-3 rounded-md bg-amber-700 px-2 py-1"
					>
						Activate Premium
					</button>
					{isPremium && (
						<ExpenseDownloadBtn expenseList={expenseList} />
					)}
				</div>
			)}

			<div className="px-5 py-8"></div>
		</div>
	);
};

export default ExpensePage;
