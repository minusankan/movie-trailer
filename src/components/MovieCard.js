import React from "react";

//Movie Card Component
const MovieCard = ({ movie, onPlayClicked }) => {

  const defaultImageURL =
    "https://in.bmscdn.com/iedb/movies/images/mobile/thumbnail/medium/final-score-et00099648-26-03-2019-05-03-04.jpg";

  //formats the date
  const getDisplayDate = () => {
    const today = new Date();
    const releaseDate = new Date(movie.ShowDate);

    // If the movie is already released
    if (today > releaseDate) {
      const options = { month: "short", year: "numeric" };
      return releaseDate.toLocaleDateString(undefined, options);
    } else {
      const options = { day: "2-digit", month: "long" };
      return releaseDate.toLocaleDateString(undefined, options);
    }
  };

  //Rating icon based on % score
  const getRatingIcon = (percentage) => {
    if (percentage > 85) return "👍";
    if (percentage > 50) return "🔶";
    return "👎";
  };

  //Number formating for votes
  function formatVoteCount(count) {
    if (count < 1_000) return `${count}`;
    if (count < 1_000_000) return `${(count / 1_000).toFixed(1)}K`;
    return `${(count / 1_000_000).toFixed(2)}M`;
  }

  //backup image incase of the image is undefined
  const imageUrl = movie?.EventImageUrl || defaultImageURL;

  return (
    <div className="movie" onClick={() => onPlayClicked(movie)}>
      <img
        src={imageUrl}
        alt={movie.EventTitle}
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultImageURL; //backup image incase of the image fails to load ? it was failing 404's.
        }}
      />
      <div className="movie-date-tag">{getDisplayDate()}</div>
      <div className="rating-tag">
        <div className="rating-content">
          <span className="rating-icon">
            {getRatingIcon(movie.ratings.wtsPerc)}
          </span>
          <span className="rating-percentage">{movie.ratings.wtsPerc}%</span>
        </div>
        <span className="rating-votes">
          {formatVoteCount(movie.ratings.totalWTSCount)} 🗳️
        </span>
      </div>
      <div className="play-icon"></div>
      <div className="movie-title">{movie.EventTitle}</div>
    </div>
  );
}

export default MovieCard;
