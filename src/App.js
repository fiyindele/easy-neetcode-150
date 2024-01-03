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

  //state to manage form data
  const [formData, setFormData] = useState({ nums: "", target: "" });

  // state to manage the two-sum result (indices)
  const [twoSumResult, setTwoSumResult] = useState("");

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

  // function to handle two-sum form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    //Parse the input values
    const nums = formData.nums
      .split(",")
      .map((num) => parseInt(num.trim(), 10));
    const target = parseInt(formData.target, 10);

    // call the function to find the indices
    const indices = findTwoSumindices(nums, target);

    // update the result state
    setResult(indices.join(", "));
  };

  // function to find indices of two numbers that add up to the target
  const findTwoSumindices = (nums, target) => {
    const numIndices = new Map();

    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      if (numIndices.has(complement)) {
        return [numIndices.get(complement), i];
      }
      numIndices.set(nums[i], i);
    }

    // No solution found
    return [];
  };

  // function to handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      <div className="twosum">
        <h1>Two Sum Problem Solver</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Array Of Integers (comma=separated):</label>
            <input
              type="text"
              name="nums"
              value={formData.nums}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Target Sum:</label>
            <input
              type="text"
              name="target"
              value={formData.target}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Find Indices</button>
        </form>
        {result && (
          <div>
            <h2>Result:</h2>
            <p>{`Indices: ${result}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
