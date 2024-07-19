import React, { useState } from "react";

export default function StarRating({ rating, onRatingChange }) {
  const [hover, setHover] = useState(null);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onRatingChange(ratingValue)}
              style={{ display: "none" }}
            />
            <i
              className={`fa fa-star ${
                ratingValue <= (hover || rating) ? "checked" : ""
              }`}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}
