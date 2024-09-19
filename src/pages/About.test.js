import { render, screen } from "@testing-library/react";
import About from "./About";
import userEvent from "@testing-library/user-event";

// describe("About Component", () => {
// 	test("renders About Page as a text", () => {
// 		//Arrange
// 		render(<About />);
// 		//Act
// 		// ... nothing
// 		//Assert
// 		const aboutPageElement = screen.getByText("About Page");
// 		expect(aboutPageElement).toBeInTheDocument();
// 	});
// 	test("renders About Page exactly as a text", () => {
// 		//Arrange
// 		render(<About />);
// 		//Act
// 		// ... nothing
// 		//Assert
// 		const aboutPageExactElement = screen.getByText("About Page", {
// 			exact: true,
// 		});
// 		expect(aboutPageExactElement).toBeInTheDocument();
// 	});
// 	test("renders About page as a text", () => {
// 		render(<About />);
// 		const AboutElement = screen.getByText("about page", { exact: false });
// 		expect(AboutElement).toBeInTheDocument();
// 	});
// 	test("renders About as a text", () => {
// 		//Arrange
// 		render(<About />);
// 		//Act
// 		// ... nothing
// 		//Assert
// 		const aboutElement = screen.getByText("About", { exact: false });
// 		expect(aboutElement).toBeInTheDocument();
// 	});
// 	test("renders Page as a text", () => {
// 		render(<About />);
// 		const pageElement = screen.getByText("Page", { exact: false });
// 		expect(pageElement).toBeInTheDocument();
// 	});

// 	test("renders Contrary as text", () => {
// 		render(<About />);
// 		const AboutElement = screen.getByText("Contrary", { exact: false });
// 		expect(AboutElement).toBeInTheDocument();
// 	});
// 	test("renders popular as text", () => {
// 		render(<About />);
// 		const AboutElement = screen.getByText("popular", { exact: false });
// 		expect(AboutElement).toBeInTheDocument();
// 	});
// 	test("renders belief as text", () => {
// 		render(<About />);
// 		const AboutElement = screen.getByText("belief", { exact: false });
// 		expect(AboutElement).toBeInTheDocument();
// 	});
// 	test("renders Renaissance as text", () => {
// 		render(<About />);
// 		const AboutElement = screen.getByText("Renaissance", { exact: false });
// 		expect(AboutElement).toBeInTheDocument();
// 	});
// 	test("renders chunk as text", () => {
// 		render(<About />);
// 		const AboutElement = screen.getByText("chunk", { exact: false });
// 		expect(AboutElement).toBeInTheDocument();
// 	});
// });

describe("About Component user Interaction/ Testing User Actions", () => {
	// test("renders 'This is webapp description Section' if the button was NOT clicked", () => {
	// 	render(<About />);
	// 	const outputElement = screen.getByText(
	// 		"This is webapp description Section",
	// 	);
	// 	expect(outputElement).toBeInTheDocument();
	// });
	test("renders 'changed!' as a text if the button was Clicked", async () => {
		//Arrange
		render(<About />);

		//Act
		const buttonELement = screen.getByRole("button");
		userEvent.click(buttonELement);

		//Assert
		const outputElement = await screen.findByText("Changed!", {
			exact: false,
		});
		expect(outputElement).toBeInTheDocument();
	});

	// test("doesnt renders This is webapp description Section if button was clicked", () => {
	// 	//Arrange
	// 	render(<About />);
	// 	//Act
	// 	const buttonELement = screen.getByRole("button");
	// 	userEvent.click(buttonELement);
	// 	//Assert
	// 	const outputElement = screen.queryByText(
	// 		"This is webapp description Section",
	// 		{ exact: true },
	// 	);
	// 	expect(outputElement).toBeNull();
	// });
});

describe("Aysnc About Component Testing", () => {
	test("renders Post if Request succeeds", async () => {
		//Arrange
		render(<About />);

		//Assert
		const listItemElement = await screen.findAllByRole("listitem");
		expect(listItemElement).not.toHaveLength(0);

		// Assert
		const outputElement = await screen.findByText("nesciunt quas odio", {
			exact: false,
		});
		expect(outputElement).toBeInTheDocument();
	});

	test("renders posts if request succeeds", async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => [{ id: "p1", title: "First post" }],
		});
		render(<About />);

		const listItemElements = await screen.findAllByRole("listitem");
		expect(listItemElements).not.toHaveLength(0);
	});

	test("check post length if request succeeds", async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => [{ id: "p1", title: "First post" }],
		});
		render(<About />);

		const listItemElements = await screen.findAllByRole("listitem");
		expect(listItemElements).not.toHaveLength(0);
	});

	test("check post texts if request succeeds", async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => [{ id: "p1", title: "First post" }],
		});
		render(<About />);

		const listItemElements = await screen.findAllByRole("listitem");
		expect(listItemElements).not.toHaveLength(0);
		const outputElement = await screen.findByText("First post", {
			exact: false,
		});
		expect(outputElement).toBeInTheDocument();
	});

	test("check post if request succeeds", async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => [{ id: "p1", title: "First post" }],
		});
		render(<About />);

		const listItemElements = await screen.findAllByRole("listitem");
		expect(listItemElements).toHaveLength(1);
	});
});
