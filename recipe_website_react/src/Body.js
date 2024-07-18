import "./index.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeBox from "./RecipeBox";
import FilterBox from "./FilterBox";

export default function Body() {
  const [recipeList, setRecipeList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filteredItems, setFilteredItems] = useState([...recipeList]);

  useEffect(() => {
    axios
      .get(
        "http://ec2-18-222-136-252.us-east-2.compute.amazonaws.com:5000/recipes/items/"
      )
      .then((response) => setRecipeList(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    setFilteredItems([...recipeList]);
  }, [recipeList]);
  return (
    <div className="body-container">
      {selectedIndex === null && (
        <FilterBox
          recipeList={recipeList}
          setFilteredItems={setFilteredItems}
        />
      )}
      <RecipeBox
        recipeList={filteredItems}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      ></RecipeBox>
    </div>
  );
}
