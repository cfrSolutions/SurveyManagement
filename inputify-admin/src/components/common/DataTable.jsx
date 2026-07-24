import "../../styles/table.css";

function DataTable({
  columns,
  data
}) {

  return (

    <div className="table-wrapper">

      <table className="enterprise-table">

        <thead>

          <tr>

            {columns.map((col) => (
              <th key={col.key}>
                {col.label}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {data.map((row,index)=>(

            <tr key={index}>

              {columns.map((col)=>(
                <td key={col.key}>
                  {row[col.key]}
                </td>
              ))}

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default DataTable;