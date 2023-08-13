import React from "react";
import { formatVoteCount } from "../utils/utilities";

//Move Trailer PopUp
const MovieTrailerPopup = ({ onClick, movie }) => {
  //handles when clicked outside of the popup.
  const handleClose = (e) => {
    // Check if the click was directly on the trailer-modal
    if (e.target.classList.contains("trailer-modal")) {
      onClick();
    }
  };

  //generates filled and empty stars based on the % score
  const ratingComponent = () => {
    const filledStars = Math.round((movie?.ratings?.wtsPerc / 100) * 5);
    return [...Array(5)].map((_, i) => {
      return <span key={i}>{i < filledStars ? "🟊" : "☆"}</span>;
    });
  };

  return (
    <div className="trailer-modal" onClick={handleClose}>
      <div className="trailer-content">
        <div className="trailer-video">
          <iframe
            width="560"
            height="315"
            src={movie.TrailerURL.replace("watch?v=", "embed/")}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <div className="trailer-description">
          <h3>{movie.EventTitle}</h3>
          <div className="rating-stars">{ratingComponent()} <span className={"rating-votes"} key="votes">{`(${formatVoteCount(movie.ratings.totalWTSCount)} votes)`} </span></div>
          <div className="tag-container">
            {movie?.EventGenre?.split("|").map((genre) => (
              <div className="tag">{genre}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieTrailerPopup;
