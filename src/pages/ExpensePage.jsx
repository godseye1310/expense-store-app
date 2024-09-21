import React, { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseTrack/ExpenseForm";
import ExpenseList from "../components/ExpenseTrack/ExpenseList";
import { useDispatch, useSelector } from "react-redux";
import { uiThemeActions } from "../store/ui-theme-reducer";
import ExpenseDownloadBtn from "../components/ExpenseTrack/ExpenseDownloadBtn";
import { FaPlus, FaPlusCircle } from "react-icons/fa";
import PopupModal from "../components/UI/PopupModal";
import { FaCircleMinus } from "react-icons/fa6";
import { RxUpdate } from "react-icons/rx";

const ExpensePage = () => {
	const [total, setTotal] = useState(0);

	const dispatch = useDispatch(true);

	const handlePremium = () => {
		dispatch(uiThemeActions.activePremium(true));
	};
	const isPremium = useSelector((state) => state.theme.isPremium);
	const expenseList = useSelector((state) => state.expense.expenseList);
	const totalExpense = expenseList.reduce((acc, curr) => {
		return acc + +curr.amount;
	}, 0);

	useEffect(() => {
		setTotal(totalExpense);

		if (totalExpense < 10000) {
			dispatch(uiThemeActions.activePremium(false));
		}
	}, [totalExpense, dispatch]);

	const darkMode = useSelector((state) => state.theme.darkMode);
	const { isEformDisplay } = useSelector((state) => state.theme);
	const { message } = useSelector((state) => state.theme);

	return (
		<div
			className={`relative h-full w-full p-0.5 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-300"}`}
		>
			{isEformDisplay && <ExpenseForm />}
			<div>
				<button
					type="button"
					onClick={() => {
						dispatch(uiThemeActions.setFormDisplay(true));
					}}
					className="absolute right-1/2 top-6 z-10 origin-center translate-x-1/2 translate-y-0 rounded-full bg-blue-600 text-3xl font-extrabold leading-none text-amber-400 transition-all duration-150 hover:bg-blue-800 hover:text-amber-500 hover:shadow-md hover:shadow-black/60 max-sm:fixed max-sm:bottom-10 max-sm:left-5 max-sm:right-auto max-sm:top-auto max-sm:translate-x-0 max-sm:bg-opacity-80"
				>
					<FaPlus className="size-16 w-full p-3 transition-all duration-300 hover:rotate-90" />
				</button>

				{total > 10000 && (
					<div className="font-semibold text-white/90">
						<button
							onClick={handlePremium}
							className="absolute right-3 top-3 rounded-md bg-gradient-to-r from-rose-500 to-amber-500 px-1.5 py-2 transition-colors duration-75 hover:from-rose-600 hover:to-amber-700"
						>
							Activate Premium
						</button>
						{isPremium && (
							<ExpenseDownloadBtn expenseList={expenseList} />
						)}
					</div>
				)}
			</div>

			<ExpenseList />
			<PopupModal
				className={`left-1/2 -translate-x-1/2 ${message.clxName} rounded-3xl py-2 font-bold text-white/75 transition-all duration-500 ease-in-out ${message.isVisible ? "translate-y-16 opacity-100" : "-translate-y-12 opacity-0"}`}
			>
				{message.info === "Expense Added" && (
					<p className="flex items-center gap-2">
						<FaPlusCircle className="size-5" />
						{message.info}
					</p>
				)}

				{message.info === "Expense Updated" && (
					<p className="flex items-center gap-2">
						{message.info}
						<RxUpdate className="size-5 animate-spin font-extrabold text-blue-600" />
					</p>
				)}

				{message.info === "Expense Deleted" && (
					<p className="flex items-center gap-2">
						<FaCircleMinus className="size-5" />
						{message.info}
					</p>
				)}
			</PopupModal>
		</div>
	);
};

export default ExpensePage;

// {/* <FaCheckCircle className="size-6" /> */}
// {/* <TiDelete className="size-9" /> */}
// {/* <IoIosInformationCircle className="size-6" /> */}
