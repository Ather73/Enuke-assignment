import * as React from "react";
// import "./style.css";
import axios from "axios";

export default function App() {
  // console.log(data);
  const [tableData, setTableData] = React.useState();
  console.log("table data", tableData);

  const url =
    "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo";

  const fetchData = async () => {
    const resp = await axios.get(url);
    setTableData(resp.data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  // Object.keys(data['Time Series (5min)']).map((item, index) => {
  //   console.log(Object.keys(data['Time Series (5min)'])[index]);
  // });

  return (
    <div>
      <table className="table table-striped table-bordered border-dark m-2">
        <thead className="text-primary border-dark " style={{verticalAlign:'middle'}}>
          <th className="text-center "  style={{height: "50px",border:'1px solid black'}}>DateTime</th>
          <th className="text-center "  style={{height: "50px",border:'1px solid black'}}>Open</th>
          <th className="text-center "  style={{height: "50px",border:'1px solid black'}}>High</th>
          <th className="text-center "  style={{height: "50px",border:'1px solid black'}}>Low</th>
          <th className="text-center "  style={{height: "50px",border:'1px solid black'}}>Close</th>
          <th className="text-center "  style={{height: "50px",border:'1px solid black'}}>Volume</th>
        </thead>
        <tbody>
          {tableData &&
            Object.keys(tableData["Time Series (5min)"]).map((item, index) => {
              return (
                <tr>
                  <td className="text-center">{Object.keys(tableData["Time Series (5min)"])[index]}</td>
                  {Object.keys(tableData["Time Series (5min)"][item]).map(
                    (valuedata) => {
                      return (
                        <td className="text-center">
                          {tableData["Time Series (5min)"][item][valuedata]}
                        </td>
                      );
                    }
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
