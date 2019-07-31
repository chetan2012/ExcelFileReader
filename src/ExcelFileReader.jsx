import React from "react";
import { ExcelRenderer } from "react-excel-renderer";

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

  toShortFormat = dateObject => {
    var month_names = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec"
    ];
    var day = dateObject.getDate();
    var month_index = dateObject.getMonth();
    var year = dateObject.getFullYear();
    return ` ${day < 10 ? "0" : ""}${day}-${month_names[month_index]}-${year}`;
  };
  showExcelData = () => {
    console.log(this.state.excelFileRows);
    return this.state.excelFileRows.map((rowValue, parentIndex) => {
      if (
        rowValue.length === 5 ||
        (rowValue.length === 4 && parentIndex % 2 !== 0)
      ) {
        return (
          <tr key={parentIndex}>
            {rowValue.map((value, childIndex) => {
              if (rowValue.length === 5 && parentIndex % 2 === 0) {
                if (parentIndex === 2 && childIndex === 4) {
                  return (
                    <td key={childIndex}>
                      {
                        this.toShortFormat(
                        new Date(Math.round((value - 25569) * 86400 * 1000))
                        )
                      }
                    </td>
                  );
                } else {
                  return <td key={childIndex}>{value}</td>;
                }
              } else if (rowValue.length === 4 && parentIndex % 2 !== 0) {
                if (childIndex > 1) {
                  return <td key={childIndex}>{value}</td>;
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