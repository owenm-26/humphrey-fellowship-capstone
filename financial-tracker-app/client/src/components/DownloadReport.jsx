import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "antd";

// eslint-disable-next-line react/prop-types
function DownloadReport({ data, currenView }) {
  const handleData = () => {};
  const handleDownload = () => {
    console.log(data);
    if (!data) {
      alert("No data to download");
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, `${currenView}`);

    const downloadMe = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Convert buffer to Blob
    const blob = new Blob([downloadMe], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    // Save file using FileSaver.js
    saveAs(blob, `${currenView}.xlsx`);
  };

  return <Button onClick={handleDownload}>Download Report</Button>;
}

export default DownloadReport;
