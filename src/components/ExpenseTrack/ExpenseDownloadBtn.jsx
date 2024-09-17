import React from "react";
import { BiDownload } from "react-icons/bi";

const ExpenseDownloadBtn = ({ expenseList }) => {
	const downloadExpenseCSV = () => {
		console.log("downloaded");
		console.log(expenseList);

		const headers = ["ID", "Amount", "Descripition", "Category"];
		const csvRows = [
			headers.join(","), // Headers
			...expenseList.map(
				(expense) =>
					[
						expense.id,
						expense.amount,
						expense.descripition,
						expense.category,
					].join(","), // Data rows
			),
		];

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
			className="absolute right-5 top-16 flex items-center gap-1 rounded-2xl bg-blue-500 px-2 py-1"
		>
			<BiDownload /> Expense
		</button>
	);
};

export default ExpenseDownloadBtn;
