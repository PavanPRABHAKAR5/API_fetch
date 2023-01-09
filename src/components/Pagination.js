import React from "react";
import { useState, useEffect } from "react";
import "./Table.css";


const Pagination = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("")
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handlePerPageChange = (event) => {
    setPerPage(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    fetch(
      "https://sim.iamvouched.com/v1/escrow/fetch_escrow_account_transactions",
      {
        method: "POST",
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwNjA1OTliMi0xZGM4LTQ4MzUtYjRkNS05NjliNDdkNDQzNmYiLCJuYW1lIjoiWFlaIEludmVzdG1lbnQgVGVjaG5vbGdvaWVzIFB2dCBMdGQiLCJyZWciOiJXOEo1OXVQZ0RzVThCVW03QXVZQyIsImNvbmZpZyI6Inh5ekludmVzdCIsImlhdCI6MTY2MjQ5Mjc3NX0.umqDcA_8qP9A6EkKQoBKh_f6aURNwZNAdCztgU6baBk",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ escrow_id: "av-test" }),
      }
    )
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log(jsonRes);
        setData(jsonRes.data);
      });
  }, []);

  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;

  const rows = data.filter((item)=>{
    if(search == ""){
        return item
    }else{
        if(item.tran_date.includes(search) || item.utr.toLowerCase().includes(search.toLowerCase())){
            return item;
        }
    }
}).slice(startIndex, endIndex).map((item) => (
    <>
      <tr key={item.id}>
        <td>{item.tran_date.split("T")[0]}</td>
        <td>{item.remitter_name}</td>
        <td className="debit">₹ {item.amount}</td>
        <td>{item.key_values}</td>
        <td>₹ {item.balance}</td>
        <td>{item.utr}</td>
        <td>{item.remitter_acc_no}</td>
      </tr>
    </>
  ));



  return (
    <div>
      <div className="input">
      <input type="text" placeholder='Search by Date or UTR' onChange={(event)=>setSearch(event.target.value)} />
      </div>
      <table className="table">
        <thead className="header">
          <tr>
            <th>Date</th>
            <th>Contact Name</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>A/C Balance</th>
            <th>UTR/BankRRN</th>
            <th>A/C no /UPI</th>
          </tr>
        </thead>
        <tbody> 
          {rows}
        </tbody>
      </table>
      <div className="pagination">
        <div>Page: {page}</div>
        <div>
          Per page:
          <select onChange={handlePerPageChange} value={perPage}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
        <div className="Pagination_button">
          <button
            onClick={(event) => handlePageChange(event, page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <button onClick={(event) => handlePageChange(event, page + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
