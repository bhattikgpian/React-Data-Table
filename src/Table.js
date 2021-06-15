import { React, useState, useEffect } from "react";
import MaterialTable from "material-table";

export const Table = () => {
	const [data, setData] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);
	const columns = [
		{
			title: "id",
			field: "id",
		},
		{
			title: "Name",
			field: "name",
		},
		{
			title: "Email",
			field: "email",
		},
		{
			title: "Role",
			field: "role",
		},
	];

	useEffect(() => {
		fetch(
			"https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
		)
			.then((resp) => resp.json())
			.then((resp) => setData(resp));
	}, []);
	const handleBulkDelete = () => {
		const updatedData = data.filter((row) => !selectedRows.includes(row));
		setData(updatedData);
	};
	return (
		<div>
			<MaterialTable
				title="Data Grid"
				data={data}
				columns={columns}
				onSelectionChange={(rows) => setSelectedRows(rows)}
				editable={{
					onRowAdd: (newRow) =>
						new Promise((resolve, reject) => {
							const updatedRows = [...data, newRow];
							setData(updatedRows);
							resolve();
						}),
					onRowDelete: (selectedRow) =>
						new Promise((resolve, reject) => {
							const index = selectedRow.tableData.id;
							const updatedRows = [...data];
							updatedRows.splice(index, 1);
							setData(updatedRows);
							resolve();
						}),
					onRowUpdate: (updatedRow, oldRow) =>
						new Promise((resolve, reject) => {
							const index = oldRow.tableData.id;
							const updatedRows = [...data];
							updatedRows[index] = updatedRow;
							setData(updatedRows);
							resolve();
						}),
				}}
				options={{
					search: true,
					paging: true,
					actionsColumnIndex: -1,
					addRowPosition: "first",
					selection: true,
				}}
				actions={[
					{
						icon: "delete",
						tooltip: "Delete all selected rows",
						onClick: () => handleBulkDelete(),
					},
				]}
			/>
		</div>
	);
};
