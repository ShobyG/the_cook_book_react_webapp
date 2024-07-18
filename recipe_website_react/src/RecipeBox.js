import "font-awesome/css/font-awesome.min.css";
import ReviewForm from "./ReviewForm";
import { useState } from "react";

const renderStars = (rating) => {
  const maxStars = 5;
  const fullStarsCount = Math.floor(rating);
  const hasHalfStar = rating - fullStarsCount >= 0.5;
  const starsArray = [];

  for (let i = 0; i < maxStars; i++) {
    if (i < fullStarsCount) {
      starsArray.push(
        <i key={i} className="fa fa-star" aria-hidden="true"></i>
      );
    } else if (i === fullStarsCount && hasHalfStar) {
      starsArray.push(
        <i key={i} className="fa fa-star-half-o" aria-hidden="true"></i>
      );
    } else {
      starsArray.push(
        <i key={i} className="fa fa-star-o" aria-hidden="true"></i>
      );
    }
  }

  return starsArray;
};

export default function RecipeBox({
  recipeList,
  selectedIndex,
  setSelectedIndex,
}) {
  const handleOnClick = (index) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  return selectedIndex !== null ? (
    <RecipeFullLoad
      recipe={recipeList[selectedIndex]}
      handleClose={handleClose}
    />
  ) : (
    <div>
      <ul>
        {recipeList.map((recipe, index) => (
          <RecipeHeader
            key={recipe.id}
            recipe={recipe}
            selectedIndex={handleOnClick}
            handleOnClick={(i) => setSelectedIndex(i)}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
}

function RecipeHeader({ recipe, index, handleOnClick }) {
  return (
    <li className="card" value={index} onClick={(e) => handleOnClick(index)}>
      <div className="thumbnail">
        <img src={recipe.image_url} alt={recipe.title} />
      </div>
      <div className="content">
        <div className="header">
          <h3>{recipe.title}</h3>
          <div className="row">
            <em>{recipe.cusine}</em>
            <div className="rating">
              {renderStars(recipe.average_rating.toFixed(1))}
              <span>{recipe.average_rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <p>{recipe.description}</p>
      </div>
    </li>
  );
}

function RecipeFullLoad({ recipe, handleClose }) {
  const [isReviewed, setIsReviewed] = useState(false);

  return (
    <div className="recipecontainer">
      <button onClick={handleClose} className="close-button">
        ❌
      </button>
      <img src={recipe.image_url} alt={recipe.title} />
      <h2> {recipe.title}</h2>
      <p> {recipe.description}</p>
      <div className="prep-row">
        <p>
          <span className="highlight">PreTime:</span>
          {Math.floor(Number(recipe.prep_time) / 60) > 0 && (
            <>{Math.floor(Number(recipe.prep_time) / 60)} Hours </>
          )}
          {Number(recipe.prep_time) % 60 > 0 && (
            <>{Number(recipe.prep_time) % 60} Minutes </>
          )}
        </p>
        <p>
          <span className="highlight">CookTime:</span>
          {Math.floor(Number(recipe.cook_time) / 60) > 0 && (
            <>{Math.floor(Number(recipe.cook_time) / 60)} Hours </>
          )}
          {Number(recipe.cook_time) % 60 > 0 && (
            <>{Number(recipe.cook_time) % 60} Minutes</>
          )}
        </p>
      </div>
      <ul>
        <h3>Ingredients</h3>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <ul>
        <h3> Instructions </h3>
        {recipe.instructions.map((step, index) => (
          <div key={index}>
            <h4> Step:{index + 1}</h4> <li>{step}</li>
          </div>
        ))}
      </ul>
      <ul>
        <h3> User Reviews </h3>
        {recipe.reviews.map((review, index) => (
          <div key={index}>
            <p>
              {review.username}: {renderStars(review.rating)}
            </p>
            <p> {review.comment} </p>
          </div>
        ))}
      </ul>
      <>
        {!isReviewed && (
          <ReviewForm recipeId={recipe.id} setIsReviewed={setIsReviewed} />
        )}
      </>
      <button onClick={handleClose}> Back To Recipies </button>
    </div>
  );
}
