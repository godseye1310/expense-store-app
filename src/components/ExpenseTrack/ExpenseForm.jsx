import React from "react";
import FormOverlayModal from "../UI/FormOverlayModal";
import useDisplay from "../../store/display-ctx";
import { useDispatch, useSelector } from "react-redux";
import {
	clearForm,
	setAmount,
	setCategory,
	setEdit,
	setTitle,
} from "../../store/e-form-reducer";
import { addExpense, updateExpense } from "../../store/expense-action-thunks";

const options = [
	"Grocery",
	"Petrol",
	"Salary",
	"Electricity",
	"Movies",
	"Shopping",
	"vacation",
];

const ExpenseForm = () => {
	// const [amount, setAmount] = useState("");
	// const [title, setTitle] = useState("");
	// const [category, setCategory] = useState("");
	// const { setExpense, addtoExpenseList, editExpense, expenseUpdateHandler } =useExpense();
	// const {
	// 	amount,
	// 	setAmount,
	// 	title,
	// 	setTitle,
	// 	category,
	// 	setCategory,
	// } = setExpense;

	const dispatch = useDispatch();
	const { amount, title, category } = useSelector(
		(state) => state.expenseForm,
	);
	const userID = useSelector((state) => state.auth.userID);
	const isEditID = useSelector((state) => state.expenseForm.isEditID);

	const { setExpenseFormDisplay } = useDisplay();

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
		setExpenseFormDisplay(false);
		dispatch(clearForm());
		dispatch(setEdit(false));
	};

	return (
		<FormOverlayModal onClose={handleCloseForm}>
			<div className="relative rounded-lg bg-blue-900 p-8 text-white shadow-2xl shadow-black">
				<form onSubmit={handleExpense} className="py-6">
					<section className="flex flex-col gap-5 font-medium">
						<div className="mx-auto w-64">
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
								required
								className="mt-1 w-full rounded-md border border-none bg-white p-2 text-black focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
							/>
						</div>

						<div className="mx-auto w-64">
							<label
								htmlFor="e-title"
								className="block text-sm font-medium"
							>
								title
							</label>
							<input
								id="e-title"
								name="e-title"
								type="text"
								value={title}
								onChange={handleTitleChange}
								required
								className="mt-1 w-full rounded-md border border-none bg-white p-2 text-black focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
							/>
						</div>

						<div className="mx-auto w-64">
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

					<div className="mx-auto mt-8 w-64">
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
