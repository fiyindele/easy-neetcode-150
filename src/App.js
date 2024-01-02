//import logo from './logo.svg';
import React, { useState } from "react";
import "./App.css";

function App() {
  // state to manage the array input and result
  const [inputArray, setInputArray] = useState("");
  const [hasDuplicates, setHasDuplicates] = useState(false);

  // function to handle array input change
  const handleInputChange = (e) => {
    setInputArray(e.target.value);
  };

  //function to check for duplicates
  const checkDuplicates = () => {
    const nums = inputArray.split(",").map((num) => parseInt(num.trim(), 10));
    const uniqueSet = new Set(nums);

    // check if the size of the set is less than the length of the array
    setHasDuplicates(uniqueSet.size < nums.length);
  };

  return (
    <div className="App">
      <h1>Leetcode Check Duplicates</h1>
      <div>
        <label>Enter comma-separated numbers: </label>
        <input
          type="text"
          value={inputArray}
          onChange={handleInputChange}
          placeholder="e.g., 1, 2, 3, 4, 1"
        />
      </div>
      <button onClick={checkDuplicates}>Check for Duplicates</button>
      {typeof hasDuplicates === "boolean" && (
        <p>
          Result:{" "}
          {hasDuplicates
            ? "Some values appear more than once."
            : "All values are distinct."}
        </p>
      )}
    </div>
  );
}

export default App;
