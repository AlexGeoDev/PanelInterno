import React from "react";

function renderHeaders(props) {
  let headers = [];
  headers = props.cols.map(c => {
    return <th>{c.label}</th>;
  });
  return headers;
}

function renderValues(item, props) {
  let values = [];
  values = props.cols.map(c => {
    return (
      <td>
        {c.value.includes('option') ?
          <button
            onClick={() => {
              if (item[c.value].event) {
                item[c.value].event(item)
              }
            }}
          >
            {item[c.value].action}
          </button>
          :
          <span>
            {item[c.value]}
          </span>
        }
      </td>
    );
  });
  return values;
}


function TableComponent(props) {
  console.log(props);
  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th></th>
            {renderHeaders(props)}
          </tr>
        </thead>
        <tbody>
          {props.data && props.data.map(e => {
            return (
              <tr>
                <td>
                  {typeof props.multiple === 'undefined' &&
                    <input
                      type="checkbox"
                      onChange={x => {
                        if (props.onSelect) props.onSelect(x.target.checked, e);
                      }}
                    />
                  }
                </td>
                {renderValues(e, props)}
              </tr>
            );
          })}
        </tbody>
      </table>

      <style jsx>
        {
          `
            table {
              display: grid;
              border-collapse: collapse;
              min-width: 100%;
              grid-template-columns: minmax(30px, 30px) ${props.styleCols};
            }

            thead, tbody, tr {
              display: contents;
            }

            th, td {
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

export { TableComponent };