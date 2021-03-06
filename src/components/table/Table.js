import React from 'react';

function Table(props) {
    console.log(props);
    return (

        <React.Fragment>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Identificacion</th>
                        <th>Nombre</th>
                        <th>Device</th>
                        <th>Merchant code</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map(e => {
                        return (<tr>
                            <td><input type="checkbox" onChange={(x => { if (props.onSelect) props.onSelect(x.target.checked, e) })}></input></td>
                            <td>{e.identification}</td>                            
                            <td>{e.comercialName}</td>
                            <td>{e.serialNumber}</td>
                            <td>{e.merchantCode}</td>
                            <td>{e.estado}</td>
                        </tr>);
                    })}
                </tbody>

            </table>

            <style jsx>{
                `
            table {
                display: grid;
                border-collapse: collapse;
                min-width: 100%;
                grid-template-columns: 
                  minmax(30px, 30px)
                  minmax(150px, 1fr)
                  minmax(150px, 1fr)
                  minmax(150px, 1.67fr)
                  minmax(150px, 1.67fr)
                  minmax(150px, 1.67fr);
              }
              
              thead,
              tbody,
              tr {
                display: contents;
              }
              
              th,
              td {
                padding: 15px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              
              th {
                position: sticky;
                top: 0;
                background: #6c7ae0;
                text-align: left;
                font-weight: normal;
                font-size: 1.1rem;
                color: white;
              }
              
              th:last-child {
                border: 0;
              }
              
              td {
                text-align: left;
                padding-top: 10px;
                padding-bottom: 10px;
                color: #808080;
              }
              
              tr:nth-child(even) td {
                background: #f8f6ff;
              }
            `

            }
            </style>

        </React.Fragment>


    );
}

export { Table };