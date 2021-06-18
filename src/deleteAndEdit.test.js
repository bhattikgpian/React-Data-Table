import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Table } from "./Table";

describe("User", () => {
	test("test to render user data", async () => {
		render(<Table userId={TableData[1].id} />);

		await waitFor(() => {
			expect(
				screen.getByText(`Name: ${TableData[1].name}`)
			).toBeInTheDocument();
			expect(
				screen.getByText(`Email: ${TableData[1].email}`)
			).toBeInTheDocument();
			expect(
				screen.getByText(`Id: ${TableData[1].id}`)
			).toBeInTheDocument();
			expect(
				screen.getByText(`Role: ${TableData[1].role}`)
			).toBeInTheDocument();
		});
	});

	test("test to thorw if something went wrong", () => {
		// should throw some error if unable to fetch users
	});

	test("update user", async () => {
		render(<Table userId={TableData[1].id} setSelectedUser={jest.fn} />);

		const updateButton = await screen.findByText("Edit");
		fireEvent.click(updateButton);

		await waitFor(() => {
			expect(screen.getByText(`Name: Sai`)).toBeInTheDocument();
		});
	});

	test("delete user", async () => {
		render(<Table userId={TableData[1].id} setSelectedUser={jest.fn} />);

		const deleteButton = await screen.findByText("Delete");
		fireEvent.click(deleteButton);

		await waitFor(() => {});
	});
});
