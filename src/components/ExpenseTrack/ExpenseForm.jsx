import React from "react";
import FormOverlayModal from "../UI/FormOverlayModal";
import { useDispatch, useSelector } from "react-redux";
import {
	clearForm,
	setAmount,
	setCategory,
	setEdit,
	setTitle,
} from "../../store/e-form-reducer";
import { addExpense, updateExpense } from "../../store/expense-action-thunks";
import { uiThemeActions } from "../../store/ui-theme-reducer";

const options = [
	"Grocery",
	"Petrol",
	"Salary",
	"Snacks",
	"Tech",
	"Subscriptions",
	"Electricity",
	"Movies",
	"Shopping",
	"vacation",
];

const ExpenseForm = () => {
	const dispatch = useDispatch();
	const { amount, title, category } = useSelector(
		(state) => state.expenseForm,
	);
	const userID = useSelector((state) => state.auth.userID);
	const isEditID = useSelector((state) => state.expenseForm.isEditID);

	const handleExpense = (event) => {
		event.preventDefault();

		const expense = {
			amount: amount,
			title: title,
			category: category,
		};
		// console.log(expense);
		if (!isEditID) {
			dispatch(addExpense(expense, userID));
		} else {
			// console.log(expense, isEditID);
			dispatch(updateExpense(expense, isEditID, userID));
		}
	};

	const handleAmountChange = (event) => {
		dispatch(setAmount(event.target.value));
	};

	const handleTitleChange = (event) => {
		dispatch(setTitle(event.target.value));
	};

	const handleCategoryChange = (event) => {
		dispatch(setCategory(event.target.value));
	};

	const handleCloseForm = () => {
		dispatch(uiThemeActions.setFormDisplay(false));
		dispatch(clearForm());
		dispatch(setEdit(false));
	};

	return (
		<FormOverlayModal onClose={handleCloseForm}>
			<div className="rounded-lg bg-blue-900 p-4 text-white shadow-2xl shadow-black">
				<form
					onSubmit={handleExpense}
					className="w-96 px-1 py-6 max-xs:w-[315px]"
				>
					<section className="flex w-full flex-col gap-5 font-medium">
						<div className="mx-auto w-full">
							<label
								htmlFor="e-amount"
								className="block text-sm font-medium"
							>
								Expense Amount
							</label>
							<input
								id="e-amount"
								name="e-amount"
								type="number"
								value={amount}
								onChange={handleAmountChange}
								placeholder="$ Amount"
								required
								className="mt-1 w-full rounded-md border border-none bg-white p-2 text-black placeholder-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
							/>
						</div>

						<div className="mx-auto w-full">
							<label
								htmlFor="e-title"
								className="block text-sm font-medium"
							>
								Title
							</label>
							<input
								id="e-title"
								name="e-title"
								type="text"
								value={title}
								onChange={handleTitleChange}
								placeholder="Title"
								required
								className="mt-1 w-full rounded-md border border-none bg-white p-2 text-black placeholder-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
							/>
						</div>

						<div className="mx-auto w-full">
							<label
								htmlFor="e-category"
								className="block text-sm font-medium"
							>
								Expense Category
							</label>
							<select
								id="e-category"
								value={category}
								onChange={handleCategoryChange}
								required
								className="mt-1 block w-full rounded-md border-none bg-white p-2 text-black focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
							>
								<option value="" disabled>
									Select an option
								</option>
								{/* Placeholder */}
								{options.map((option, index) => (
									<option key={index} value={option}>
										{option}
									</option>
								))}
							</select>
						</div>
					</section>

					<div className="mx-auto mt-8">
						<button
							type="submit"
							className="rounded-md bg-blue-500 px-3 py-1 hover:bg-blue-600"
						>
							{!isEditID ? "Add" : "Update"}
						</button>
					</div>
				</form>
				<button
					type="button"
					onClick={handleCloseForm}
					className="absolute right-2 top-3 rounded bg-red-500 px-2 font-bold text-white hover:bg-rose-600"
				>
					X
				</button>
			</div>
		</FormOverlayModal>
	);
};

export default ExpenseForm;
