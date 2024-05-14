import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
function App() {
  const [apiData, setApiData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        console.log("called");
        const res = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const data = await res.data;
        setApiData(data);
        console.log(apiData);
      } catch (err) {
        alert("failed to fetch data");
      }
    })();
  }, []);
  return (
    <>
      <h1>Employee Data Table</h1>
      <table>
        <thead className="thead">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {apiData.slice(index, index + 10).map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="tableButtons">
        <button
          onClick={() => {
            if (index > 0) {
              setIndex((prev) => prev - 10);
            }
            if (pageNo > 1) {
              setPageNo((prev) => prev - 1);
            }
          }}
        >
          Previous
        </button>{" "}

        <span>{pageNo}</span>{" "}

        <button
          onClick={() => {
            if (pageNo <= Math.floor(apiData.length / 10)) {
              setIndex((prev) => prev + 10);
              setPageNo((prev) => prev + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
