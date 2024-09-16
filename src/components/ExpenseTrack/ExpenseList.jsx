import React from "react";
import useExpense from "../../store/expense-context";

const ExpenseList = () => {
	const { expenseList } = useExpense();
	return (
		<div className="mt-3 bg-gray-400 px-5 py-8">
			<h1 className="pb-8 text-2xl font-semibold">ExpenseList</h1>
			<div>
				<ul className="w-1/2 list-none bg-blue-300">
					{expenseList.map((item, i) => {
						return (
							<li key={i} className="flex justify-evenly gap-2">
								<span>${item.amount}</span>
								<span>{item.category}</span>
								<span>{item.descripition}</span>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default ExpenseList;
