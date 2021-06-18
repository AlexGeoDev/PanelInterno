import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import LlevateloBusiness from '../../business/LlevateloBusiness';
import loading from '../../lib/ui/loading';



function AumentoCupoComercioView() {

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  // process CSV data
  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    const columns = headers.map(c => ({
      name: c,
      selector: c,
    }));

    columns.push({ name: "success", selector: "success" })
    setData(list);
    setColumns(columns);
  }


  // handle file upload
  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  }


  const ProcessCommerceIncrease = async () => {
    let datatmp = [...data]
    loading.showLoadingScreen();
    for (let element of datatmp) {
      const success = await LlevateloBusiness.CommerceIncrease(element);
      element.success = success ? "Cupo aumentado exitosamente" : "Cupo NO aumentado";
      console.log(element, success);
    }
    loading.hideLoadingScreen();
    console.log(datatmp)
    setData(datatmp);
  };

  const columnas = [
    { name: "merchantCode", selector: "merchantCode" },
    { name: "description", selector: "description" },
    { name: "assignedCredit", selector: "assignedCredit" },
    { name: "userApprove", selector: "userApprove" },
    { name: "success", selector: "success" }
  ]

  return (
    <div>
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}

      />
      <DataTable
        pagination
        highlightOnHover
        columns={columnas}
        data={data}

      />
      <button
        type="button"
        className="mx-2 btn btn-outline-primary right"
        onClick={() => ProcessCommerceIncrease()}
      >
        Procesar
      </button>
    </div>

  );

}

export default AumentoCupoComercioView;