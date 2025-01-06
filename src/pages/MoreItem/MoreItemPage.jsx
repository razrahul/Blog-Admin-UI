import React, { useState } from "react";
import "./MoreItemPage.scss";

const MoreItemPage = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionaChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="more-item-page">
      <h2>More Item Page</h2>
      <div className="dropdown-container">
        <label htmlFor="dropdown">Choose an Option:</label>
        <select
          id="dropdown"
          value={selectedOption}
          onChange={handleOptionaChange}
        >
          <option value="" disabled>
            Select the Category
          </option>
          <option value="Category Section">Category</option>
          <option value="Role">Role</option>
          <option value="Option 3">Option 3</option>
        </select>
      </div>
      <div className="selected-option">
        {selectedOption ? (
          <p>Selected Option :{selectedOption}</p>
        ) : (
          <p>Please select a category</p>
        )}
      </div>
    </div>
  );
};

export default MoreItemPage;
