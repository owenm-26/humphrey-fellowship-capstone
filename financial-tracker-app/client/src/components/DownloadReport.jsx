import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "antd";
import dayjs from "dayjs";

// eslint-disable-next-line react/prop-types
function DownloadReport({ data, currentView }) {
  const processedData = data?.map(({ relation, _id, ...rest }) => rest);
  const preprocessData = (data, currentView) => {
    // Rename and reorder columns
    console.log("data", data);
    if (currentView === "Inventory") {
      const renamedData = processedData.map((item) => ({
        Date: dayjs(item["date"]).format("MM/DD/YYYY"),
        "Item Name": item["name"],
        "Unit Price": item["buyPrice"],
        Quantity: item["quantity"],
      }));

      const filteredData = renamedData.filter((row) => {
        return Object.keys(row).some((key) => {
          const value = row[key];
          return (
            (key.startsWith("Date") ||
              key.startsWith("Item Name") ||
              key.startsWith("Unit Price") ||
              key.startsWith("Quantity")) &&
            value !== "" &&
            value !== undefined
          );
        });
      });
      // Sort rows by date
      filteredData.sort((a, b) => {
        const dateA = dayjs(a.Date, "MM/DD/YYYY");
        const dateB = dayjs(b.Date, "MM/DD/YYYY");
        return dateA - dateB;
      });
      console.log("renamedData", renamedData);
      console.log("length", filteredData.length);
      return filteredData;
    }
  };

  // creates excel sheet and downloads
  const handleDownload = () => {
    const readyData = preprocessData(data, currentView);
    console.log(readyData);
    if (!readyData) {
      alert("No data to download");
      return;
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(readyData);
    XLSX.utils.book_append_sheet(workbook, worksheet, `${currentView}`);

    // Set column widths
    const columnWidths = [
      { wpx: 100 }, // Date
      { wpx: 200 }, // Item Name
      { wpx: 100 }, // Unit Price
      { wpx: 100 }, // Quantity
    ];

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

  return <Button onClick={handleDownload}>Download Report</Button>;
}

export default DownloadReport;
