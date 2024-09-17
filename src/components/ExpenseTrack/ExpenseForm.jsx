import React, { useCallback, useState } from "react";
// import useExpense from "../../store/expense-context";
import FormOverlayModal from "../UI/FormOverlayModal";
import useDisplay from "../../store/display-ctx";
import axios from "axios";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense-reducer";

const RTDB_URL = `https://expense-store-app-default-rtdb.asia-southeast1.firebasedatabase.app/userExpense`;
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
	const [amount, setAmount] = useState("");
	const [descripition, setDescripition] = useState("");
	const [category, setCategory] = useState("");
	// const { setExpense, addtoExpenseList, editExpense, expenseUpdateHandler } =useExpense();
	// const {
	// 	amount,
	// 	setAmount,
	// 	descripition,
	// 	setDescripition,
	// 	category,
	// 	setCategory,
	// } = setExpense;
	const dispatch = useDispatch();

	const { setExpenseFormDisplay } = useDisplay();

	const handleExpense = (event) => {
		event.preventDefault();

		const expense = {
			amount: amount,
			descripition: descripition,
			category: category,
		};
		// console.log(expense);
		// if(!editExpense)
		if (true) {
			addtoExpenseList(expense);
		} else {
			// 	// console.log(editExpense);
			const id = "editing item id";
			expenseUpdateHandler(expense, id);
		}
	};

	const addtoExpenseList = useCallback(
		async (item) => {
			try {
				const response = await axios.post(`${RTDB_URL}.json`, item);
				// console.log(response.data);
				console.log(
					response.status,
					response.statusText,
					"Expense ADD Success",
				);
				// setExpenseList((prev) => [
				// 	...prev,
				// 	{ ...item, id: response.data.name },
				// ]);
				dispatch(
					expenseActions.addtoExpenseList({
						...item,
						id: response.data.name,
					}),
				);
			} catch (error) {
				console.log(error.response.data);
			}
		},
		[dispatch],
	);

	const expenseUpdateHandler = useCallback(
		async (updateItem, id) => {
			// console.log(updateItem, id);
			try {
				const response = await axios.put(
					`${RTDB_URL}/${id}.json`,
					updateItem,
				);
				console.log(response);
				console.log(
					response.status,
					response.statusText,
					"Expense Update Success",
				);
				// setExpenseList((prev) =>
				// 	prev.map((item) => {
				// 		return item.id === id ? { ...item, ...updateItem } : item;
				// 	}),
				// );
				// console.log({ ...updateItem, id: id });

				dispatch(
					expenseActions.expenseUpdateHandler({
						...updateItem,
						id: id,
					}),
				);
				console.log("Expense successfuly updated");
			} catch (error) {
				console.log(error.response.data);
			}
		},
		[dispatch],
	);

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
