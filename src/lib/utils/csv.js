import * as XLSX from 'xlsx';

const exportCSV = (csvData, fileName) => {
  const fileType = 'application/octet-stream;charset=UTF-8';
  const fileExtension = '.csv';
  const ws = XLSX.utils.json_to_sheet(csvData);
  const csv = XLSX.utils.sheet_to_csv(ws);
  const data = new Blob([csv], { type: fileType });

  let link = document.createElement('a');
  link.href = window.URL.createObjectURL(data);
  link.download = `${fileName}${fileExtension}`;
  link.click();
};

export {
  exportCSV,
};