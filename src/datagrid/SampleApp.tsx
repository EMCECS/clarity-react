import * as React from "react";
import {normalColumns, normalRows, customRows, footer} from "./DataGridValues";
import {DataGrid, GridSelectionType} from "./DataGrid";
import {Button} from "../forms/button";

type SampleAppState = {
    records: any[];
    selectAll: boolean;
};

export class SampleApp extends React.PureComponent {
    state: SampleAppState = {
        records: normalRows,
        selectAll: false,
    };

    handleSelectAll(value: boolean) {
        const {records} = this.state;
        records.forEach(row => {
            row["isSelected"] = value;
        });
        this.setState(
            {
                records: [...records],
            },
            () => {},
        );
    }

    handleRowSelect(rowID: any, selectionType: GridSelectionType) {
        const {records} = this.state;
        records.forEach(row => {
            if (row["rowID"] === rowID) {
                const value = !row["isSelected"];
                row["isSelected"] = value;
            } else if (selectionType === GridSelectionType.SINGLE) {
                row["isSelected"] = false;
            }
        });
        this.setState({
            records: [...records],
            //selectAll: allTrueOnKey(rows, "isSelected"),
        });
    }

    handleEditClick() {
        const {records} = this.state;
        let selectedRowId;
        records.forEach(row => {
            if (row["isSelected"] === true) {
                selectedRowId = row["rowID"];
            }
        });
        alert("selecte row: " + selectedRowId);
    }

    rowsSelected(): number {
        let counter: number = 0;
        this.state.records.forEach(row => {
            if (row["isSelected"]) counter++;
        });
        return counter;
    }

    render() {
        return (
            <div>
                {this.rowsSelected() < 2 && <Button onClick={this.handleEditClick.bind(this)}>Edit</Button>}

                <DataGrid
                    columns={normalColumns} //prettier
                    selectionType={GridSelectionType.MULTI}
                    data={this.state.records}
                    onRowSelect={this.handleRowSelect.bind(this)}
                    onSelectAll={this.handleSelectAll.bind(this)}
                />
            </div>
        );
    }
}
