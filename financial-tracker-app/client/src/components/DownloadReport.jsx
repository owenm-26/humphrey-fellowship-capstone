import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button, DatePicker, Form } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function DownloadReport({ data, currentView }) {
  const [startDate, setStartDate] = useState(dayjs().format("MM/DD/YYYY")); //the earlier end of range
  const [endDate, setEndDate] = useState(dayjs().format("MM/DD/YYYY")); // the more recent end of range

  const processedData = data?.map(({ relation, _id, ...rest }) => rest);
  const preprocessData = (data, currentView) => {
    let renamedData;
    // Rename and reorder columns
    if (currentView === "Inventory") {
      renamedData = processedData.map((item) => ({
        Date: dayjs(item["date"]).format("MM/DD/YYYY"),
        "Item Name": item["name"],
        "Unit Price": `$${item["buyPrice"]}`,
        Quantity: item["quantity"],
      }));
    } else if (currentView == "Sales") {
      renamedData = processedData.map((item) => ({
        Date: dayjs(item["date"]).format("MM/DD/YYYY"),
        "Item Name": item["name"],
        "Sale Price": `$${item["sellCost"]}`,
        Quantity: item["quantity"],
      }));
    } else {
      // currentView == "Expenses   "
      renamedData = processedData.map((item) => ({
        Date: dayjs(item["date"]).format("MM/DD/YYYY"),
        "Item Name": item["name"],
        Cost: `$${item["cost"]}`,
      }));
    }

    const filteredData = renamedData.filter((row) => {
      return Object.keys(row).some((key) => {
        const value = row[key];
        return value !== "" && value !== undefined;
      });
    });
    // Sort rows by date
    filteredData.sort((a, b) => {
      const dateA = dayjs(a.Date, "MM/DD/YYYY");
      const dateB = dayjs(b.Date, "MM/DD/YYYY");
      return dateA - dateB;
    });
    return filteredData;
  };

  // creates excel sheet and downloads
  const handleDownload = () => {
    const readyData = preprocessData(data, currentView);
    if (!readyData) {
      alert("No data to download");
      return;
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(readyData);
    XLSX.utils.book_append_sheet(workbook, worksheet, `${currentView}`);

    let columnWidths;
    // Set column widths
    if (currentView !== "Expenses") {
      columnWidths = [
        { wpx: 100 }, // Date
        { wpx: 200 }, // Item Name
        { wpx: 100 }, // Unit Price
        { wpx: 100 }, // Quantity
      ];
    } else {
      columnWidths = [
        { wpx: 100 }, // Date
        { wpx: 200 }, // Item Name
        { wpx: 100 }, // Cost
      ];
    }

    worksheet["!cols"] = columnWidths;

    const downloadMe = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Convert buffer to Blob
    const blob = new Blob([downloadMe], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    // Save file using FileSaver.js
    saveAs(blob, `${currentView}.xlsx`);
  };

  return (
    <>
      <DatePicker
        defaultValue={dayjs(startDate, "MM/DD/YYYY")}
        onChange={(date, dateString) => {
          setStartDate(dateString);
          console.log(dateString);
        }}
        format="MM/DD/YYYY"
        style={{ borderRadius: 5, width: "12vw", margin: "2vw" }}
      />
      <DatePicker
        defaultValue={dayjs(endDate, "MM/DD/YYYY")}
        onChange={(date, dateString) => {
          setEndDate(dateString);
          console.log(dateString);
        }}
        format="MM/DD/YYYY"
        style={{ borderRadius: 5, width: "12vw", margin: "2vw 0 vh" }}
      />

      <Button onClick={handleDownload}>Download {currentView} Report</Button>
    </>
  );
}

export default DownloadReport;
