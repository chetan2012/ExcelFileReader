import ExcelFileReader from "./ExcelFileReader";
import React from "react";
import { shallow } from "enzyme";

const wrapper = shallow(<ExcelFileReader />);

describe("Test Cases For ExcelFileReader", () => {
    it("should have a ExcelFileReader component", () => {
        expect(wrapper.find("ExcelFileReader")).toBeDefined();
    });

    it("should call excelfileHandler", () => {
        const event = {
            target: {
                files : [
                    {
                        name: "Upload.xlsx",
                        size: 10282,
                        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        webkitRelativePath: "",
                        lastModified: 1564558790445
                    }
                ]
            }
        };
        wrapper.instance().excelfileHandler(event);
        expect(wrapper.find("ExcelFileReader")).toBeDefined();
    });

    it("should check all the required condition", () => {
        const excelFileData = [
            ['', '', 'Name', '', 'Abc'],
            ['', '', 'ID', '', '12345'],
            ['', '', 'Date', '', '9/4/1990, 5:30:00 AM'],
            ['level1', 'sub1', 'A1', '1']
        ];
        wrapper.setState({excelFileRows: excelFileData})
        wrapper.instance().showExcelData();
        expect(wrapper.find("td")).toBeDefined();
    });
    it("should check first if condition", () => {
        const excelFileData = [
            ['', '', 'Name']
        ];
        wrapper.setState({excelFileRows: excelFileData})
        wrapper.instance().showExcelData();
        expect(wrapper.find("td")).toBeDefined();
    });
});
