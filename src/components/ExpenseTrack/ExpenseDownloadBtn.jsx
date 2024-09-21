import React from "react";
import { FaFileDownload } from "react-icons/fa";

const ExpenseDownloadBtn = ({ expenseList }) => {
	const downloadExpenseCSV = () => {
		console.log("downloaded");

		// const expenseHeader = expenseList.map((list) => Object.keys(list))[0];
		// console.log(expenseHeader);

		const headers = ["ID", "Amount", "title", "Category"];
		const csvRows = [
			headers.join(","), // Headers
			...expenseList.map(
				(expense) =>
					[
						expense.id,
						expense.amount,
						expense.title,
						expense.category,
					].join(","), // Data rows
			),
		];
		// console.log(csvRows);

		// Step 2: Create a Blob from CSV rows
		const csvContent = csvRows.join("\n");
		const blob = new Blob([csvContent], { type: "text/csv" });
		const url = URL.createObjectURL(blob);

		// Step 3: Create a link and trigger the download
		const link = document.createElement("a");
		link.href = url;
		link.download = "expenses.csv";
		link.click();
		URL.revokeObjectURL(url); // Cleanup
	};

	return (
		<button
			onClick={downloadExpenseCSV}
			className="absolute right-3 top-16 flex items-center gap-1 rounded-2xl bg-sky-600 px-2 py-2 text-sm font-bold text-gray-300 hover:bg-blue-600"
		>
			<FaFileDownload className="size-6" /> Expense
		</button>
	);
};

export default ExpenseDownloadBtn;
