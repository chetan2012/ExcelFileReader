import React from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";

class ExcelFileReader extends React.Component {
  state = {
    excelFileRows: []
  };

  excelfileHandler = event => {
    let excelFileObj = event.target.files[0];
    ExcelRenderer(excelFileObj, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        this.setState({
          excelFileRows: response.rows
        });
      }
    });
  };
  showExcelData = () => {
    return this.state.excelFileRows.map((rowValue, parentIndex) => {
      if (
        rowValue.length === 5 ||
        (rowValue.length === 4 && parentIndex % 2 !== 0)
      ) {
        return (
          <tr key = {parentIndex}>
            {rowValue.map((value, childIndex) => {
              if (rowValue.length === 5) {
                if (parentIndex === 2 && childIndex === 4) {
                  return (
                    <td key = {childIndex}>
                      {new Date(
                        Math.round((value - 25569) * 86400 * 1000)
                      ).toLocaleString()}
                    </td>
                  );
                } else {
                  return <td key = {childIndex}>{value}</td>;
                }
              } else if (rowValue.length == 4 && parentIndex % 2 != 0) {
                if (childIndex > 1) {
                  return <td key = {childIndex}>{value}</td>;
                }
              }
            })}
          </tr>
        );
      }
    });
  };

  render() {
    return (
      <div className="col-sm-12 Header pb-15">
        <input
          type="file"
          onChange={this.excelfileHandler}
          style={{ padding: "10px" }}
        />
        <table>{this.showExcelData()}</table>
      </div>
    );
  }
}

export default ExcelFileReader;
