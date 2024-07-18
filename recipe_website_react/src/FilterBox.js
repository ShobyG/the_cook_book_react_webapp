import React, { useState, useEffect } from "react";
import "./index.css";

export default function FilterBox({ recipeList, setFilteredItems }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [cuisineType, setCuisineType] = useState("All");
  const allCuisineTypes = Array.from(
    new Set(recipeList.map((item) => item.cusine))
  );
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleFilterChange = (e) => {
    setCuisineType(e.target.value);
    console.log(cuisineType);
  };

  useEffect(() => {
    if (searchTerm === "" && cuisineType === "All") {
      setFilteredItems(recipeList);
    } else {
      setFilteredItems(
        recipeList.filter(
          (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (cuisineType !== "All" ? item.cusine === cuisineType : true)
        )
      );
    }
  }, [searchTerm, recipeList, setFilteredItems, cuisineType]);
  return (
    <div className="filters-box">
      <input
        type="text"
        placeholder="Search the recipe"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select value={cuisineType} onChange={handleFilterChange}>
        <option>All</option>
        {allCuisineTypes.map((cuisine, index) => (
          <option key={index}>{cuisine}</option>
        ))}
      </select>
    </div>
  );
}
