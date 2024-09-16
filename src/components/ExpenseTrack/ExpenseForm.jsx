import React from "react";
import useExpense from "../../store/expense-context";
import FormOverlayModal from "../UI/FormOverlayModal";
import useDisplay from "../../store/display-ctx";

const options = [
	"Grocery",
	"Petrol",
	"Salary",
	"Electricity",
	"Movies",
	"Shopping",
];

const ExpenseForm = () => {
	// const [amount, setAmount] = useState("");
	// const [descripition, setDescripition] = useState("");
	// const [category, setCategory] = useState("");
	const { setExpense, addtoExpenseList, editExpense, expenseUpdateHandler } =
		useExpense();
	const {
		amount,
		setAmount,
		descripition,
		setDescripition,
		category,
		setCategory,
	} = setExpense;
	const { setExpenseFormDisplay } = useDisplay();

	const handleExpense = (event) => {
		event.preventDefault();

		const expense = {
			amount: amount,
			descripition: descripition,
			category: category,
		};
		// console.log(expense);
		if (!editExpense) {
			addtoExpenseList(expense);
		} else {
			// console.log(editExpense);
			expenseUpdateHandler(expense, editExpense.id);
		}
	};

	const handleCloseForm = () => {
		setExpenseFormDisplay(false);
		setAmount("");
		setDescripition("");
		setCategory("");
	};

	return (
		<FormOverlayModal onClose={handleCloseForm}>
			<div className="relative rounded-lg bg-blue-900 p-8 text-white shadow-2xl shadow-black">
				<form onSubmit={handleExpense} className="py-6">
					<section className="flex flex-col gap-5 font-medium">
						<div className="mx-auto w-64">
							<label
								htmlFor="money"
								className="block text-sm font-medium"
							>
								Expense Amount
							</label>
							<input
								id="money"
								name="money"
								type="number"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								required
								className="mt-1 w-full rounded-md border border-none bg-white p-2 text-black focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
							/>
						</div>

						<div className="mx-auto w-64">
							<label
								htmlFor="descripition"
								className="block text-sm font-medium"
							>
								Descripition
							</label>
							<input
								id="descripition"
								name="descripition"
								type="text"
								value={descripition}
								onChange={(e) =>
									setDescripition(e.target.value)
								}
								required
								className="mt-1 w-full rounded-md border border-none bg-white p-2 text-black focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
							/>
						</div>

						<div className="mx-auto w-64">
							<label
								htmlFor="category"
								className="block text-sm font-medium"
							>
								Expense Category
							</label>
							<select
								id="category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
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
							Add
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
