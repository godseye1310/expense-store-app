import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("renders Home as a text", () => {
	//Arrangle
	render(<Header />);
	//Act
	//..nothing
	//Assert
	const navHomeElement = screen.getByText("Home", {
		exact: false,
	});
	expect(navHomeElement).toBeInTheDocument();
});
