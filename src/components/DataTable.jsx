import { Button, Input, Table } from "reactstrap";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

const DataTable = ({ row, data, onDelete }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const allSelected = selectedRows.length === data.length;
  const isIndeterminate = selectedRows.length > 0 && !allSelected;

  const handleSelectAll = () => {
    if (selectedRows.length > 0 && !allSelected) {
      // If some are selected, clear all selections
      setSelectedRows([]);
    } else if (!allSelected) {
      // If none are selected, select all rows
      setSelectedRows(data.map((row) => row.id));
    } else {
      // If all are selected, clear all selections
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id)); // Deselect
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <>
      <div
        className="d-sm-flex gap-2"
        style={{ visibility: selectedRows.length > 0 ? "visible" : "hidden" }}
      >
        {"Selected: " + selectedRows.length}
        <Button
          size={"sm"}
          onClick={() => onDelete(selectedRows)}
          className={"bi bi-trash"}
        />
      </div>

      <Table size={"sm"} hover bordered striped>
        <thead>
          <tr>
            <th style={{ width: "34px" }}>
              <Input
                type="checkbox"
                checked={allSelected}
                innerRef={(input) => {
                  if (input) input.indeterminate = isIndeterminate;
                }}
                onChange={handleSelectAll}
              />
            </th>
            {row.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((rowData) => (
            <tr key={rowData.id} onClick={()=> navigate(`/inventory/edit/${rowData.id}`)}>
              <td style={{ width: "34px" }}>
                <Input
                  type="checkbox"
                  checked={selectedRows.includes(rowData.id)}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRowSelect(rowData.id)
                  }}
                />
              </td>
             {row.map((key) => (
                <td key={key} >{rowData[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default DataTable;
