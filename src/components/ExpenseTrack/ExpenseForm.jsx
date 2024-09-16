import React, { useState } from "react";
import useExpense from "../../store/expense-context";

const options = [
	"Grocery",
	"Petrol",
	"Salary",
	"Electricity",
	"Movies",
	"Shopping",
];

const ExpenseForm = () => {
	const [amount, setAmount] = useState("");
	const [descripition, setDescripition] = useState("");
	const [category, setCategory] = useState("");

	const { addtoExpenseList } = useExpense();

	const handleExpense = (event) => {
		event.preventDefault();

		const expense = {
			amount: amount,
			descripition: descripition,
			category: category,
		};
		console.log(expense);
		addtoExpenseList(expense);
	};

	return (
		<div>
			<form onSubmit={handleExpense}>
				<div className="mx-auto mt-8 w-64">
					<label
						htmlFor="money"
						className="block text-sm font-medium text-gray-700"
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
					/>
				</div>

				<div className="mx-auto mt-8 w-64">
					<label
						htmlFor="descripition"
						className="block text-sm font-medium text-gray-700"
					>
						Descripition
					</label>
					<input
						id="descripition"
						name="descripition"
						type="text"
						value={descripition}
						onChange={(e) => setDescripition(e.target.value)}
						required
					/>
				</div>

				<div className="mx-auto mt-8 w-64">
					<label
						htmlFor="category"
						className="block text-sm font-medium text-gray-700"
					>
						Expense Category
					</label>
					<select
						id="category"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						required
						className="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
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

				<div className="mx-auto mt-8 w-64">
					<button
						type="submit"
						className="rounded-md bg-blue-500 px-2 py-1 hover:bg-blue-600"
					>
						Add
					</button>
				</div>
			</form>
		</div>
	);
};

export default ExpenseForm;
