import React, { useState } from "react";
import axios from "axios";

export default function ReviewForm({
  recipeId,
  setIsReviewed,
  handleReviewedRecipe,
}) {
  const [formData, setFormData] = useState({
    recipe: recipeId,
    username: "",
    rating: "",
    comment: "",
  });

  // function handleIsReviewed() {
  //   setIsReviewed(true);
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate and update form data
    if (name === "rating" && value > 5) {
      return; // Prevent setting rating above 5
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (formData.username === "") {
      alert("Please enter your name.");
      return;
    }
    if (formData.rating === "") {
      alert("Please leave a rating.");
      return;
    }
    console.log(formData);
    const jsonString = JSON.stringify(formData);
    console.log(jsonString);
    try {
      const response = await axios.post(
        "http://ec2-18-222-136-252.us-east-2.compute.amazonaws.com:5000/recipes/reviews/",
        jsonString,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Review submitted:", response.data);
      // handleIsReviewed();
      handleReviewedRecipe(recipeId);
      // Reset form or handle success
    } catch (error) {
      console.error("Failed to submit review:", error);
      // Handle error
    }
  };
  return (
    <div className="review-form">
      <h3>Leave a review</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="What's your name"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            placeholder="How did you like the recipe (1-5)"
            value={formData.rating}
            onChange={handleChange}
            max="5"
            min="1"
          />
        </div>
        <div>
          <label>Comments:</label>
          <textarea
            name="comment"
            placeholder="Leave your comments here"
            value={formData.comment}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Submit your review</button>
        </div>
      </form>
    </div>
  );
}
