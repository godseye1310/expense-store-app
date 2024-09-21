import React, { useContext, useState } from "react";
// import { useLocation } from 'react-router-dom';

export const DisplayContext = React.createContext();

export const DisplayProvider = ({ children }) => {
	const [expenseFormDisplay, setExpenseFormDisplay] = useState(false);

	const [popupVisible, setPopupVisible] = useState(false);
	const handlePopupDisplay = () => {
		setPopupVisible(true);
		setTimeout(() => setPopupVisible(false), 1500);
	};
	const value = {
		expenseFormDisplay,
		setExpenseFormDisplay,
		popupVisible,
		setPopupVisible,
		handlePopupDisplay,
	};

	return (
		<DisplayContext.Provider value={value}>
			{children}
		</DisplayContext.Provider>
	);
};

const useDisplay = () => useContext(DisplayContext);

export default useDisplay;
