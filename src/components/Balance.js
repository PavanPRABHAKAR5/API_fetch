import React from "react";
import { useState, useEffect } from "react";
import "./Balance.css"
import SavingsIcon from "@mui/icons-material/Savings";

const Balance = () => {
  const [input, setInput] = useState([]);

  useEffect(() => {
    fetch("https://sim.iamvouched.com/v1/escrow/fetch_escrow_account_balance", {
      method: "POST",
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwNjA1OTliMi0xZGM4LTQ4MzUtYjRkNS05NjliNDdkNDQzNmYiLCJuYW1lIjoiWFlaIEludmVzdG1lbnQgVGVjaG5vbGdvaWVzIFB2dCBMdGQiLCJyZWciOiJXOEo1OXVQZ0RzVThCVW03QXVZQyIsImNvbmZpZyI6Inh5ekludmVzdCIsImlhdCI6MTY2MjQ5Mjc3NX0.umqDcA_8qP9A6EkKQoBKh_f6aURNwZNAdCztgU6baBk",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ escrow_id: "project-0812-23432" }),
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        setInput(jsonRes.data);
      });
  }, []);

  console.log(input);
  return (
    <div>
      <div className="container">
        <div>
          <SavingsIcon className="icon" fontSize="large" />
        </div>
        <div className="info-box">
            <h3>Avaliable Balance</h3>
           <p>₹ {input.balance}</p>
        </div>
      </div>
    </div>
  );
};

export default Balance;
