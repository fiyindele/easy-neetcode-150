//import logo from './logo.svg';
import React, { useState } from "react";
import "./App.css";

function areAnagrams(str1, str2) {
  const sortedStr1 = str1.split("").sort().join("");
  const sortedStr2 = str2.split("").sort().join("");
  return sortedStr1 === sortedStr2;
}

function App() {
  // state to manage the array input and result
  const [inputArray, setInputArray] = useState("");
  const [hasDuplicates, setHasDuplicates] = useState(false);

  const [string1, setString1] = useState("");
  const [string2, setString2] = useState("");
  const [result, setResult] = useState(null);

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

  const handleCheckAnagram = (e) => {
    e.preventDefault();

    //check if input strings are an anagram
    const isAnagram = areAnagrams(string1, string2);

    //update the result state
    setResult(isAnagram);
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

      <div className="anagram">
        <h1>Leetcode Anagram Checker</h1>
        <form onSubmit={handleCheckAnagram}>
          <label>String 1:</label>
          <input
            type="text"
            value={string1}
            onChange={(e) => setString1(e.target.value)}
          />

          <label>String 2:</label>
          <input
            type="text"
            value={string2}
            onChange={(e) => setString2(e.target.value)}
          />

          <button type="submit">Check For Anagram</button>
        </form>

        {result != null && (
          <p className={result ? "success" : "error"}>
            {result ? "Anagrams!" : "Not Anagrams!"}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
