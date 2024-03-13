import React, { useState } from "react";

const Keypad = () => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (number) => {
     // Check if input value ends with "=" followed by a number
  if (/\=\d$/.test(inputValue)) {
    // If so, add a line break before appending the new number
    setInputValue((prevValue) => prevValue + "\n" + number);
  } else {
    // Otherwise, just append the number
    setInputValue((prevValue) => prevValue + number);
  }
  };

  const handleClear = () => {
    setInputValue("");
  };

  const handleMathSymbolClick = (symbol) => {
    setInputValue((prevValue) => prevValue + symbol);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-4">
        {/* Number Keypad */}
        <div className="col-span-1">
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
              <button
                key={number}
                onClick={() => handleKeyPress(number)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                {number}
              </button>
            ))}
            
          </div>
        </div>
        {/* Input Box */}
        <div className="col-span-1">
          <input
            type="text"
            value={inputValue}
            readOnly
            className="border border-gray-300 p-2 mb-4 w-full h-80 text-center"
          />
          <button onClick={handleClear} className="bg-red-500 text-white p-2 w-full rounded col-span-3">
              Clear
            </button>
        </div>
        {/* Math Symbols Keypad */}
        <div className="col-span-1">
          <div className="grid grid-cols-2 gap-2">
            {["+", "-", "*", "/", "="].map((symbol) => (
              <button
                key={symbol}
                onClick={() => handleMathSymbolClick(symbol)}
                className="bg-green-500 text-white p-2 rounded"
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Keypad;
