import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "./App";
function ExpenseForm() {
  const [formData, setFormData] = useState({ item: "", amount: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any action with formData here, e.g., send it to the server
    const postData = async () => {
      try {
        const res = await axios.post(`${baseURL}/`, formData);
        console.log("res", res);
      } catch (error) {
        console.log("error", error);
      }
    };
    postData();
    console.log(formData);
    // Reset the form fields
    setFormData({ item: "", amount: "" });
  };

  return (
    <div>
      <h3>Expense Form</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="item">Item:</label>
          <input
            type="text"
            id="item"
            name="item"
            value={formData.item}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
