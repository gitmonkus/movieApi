class Movie {
  constructor(data) {
    Object.assign(this, data);
  }

  compileMovieHtml() {
    const { Search } = this;
    let holdHtml = '';

    for (let movie of Search) {
      holdHtml += `
        <div class="movie-content">
            <img src="${movie.Poster}">
            <div>
                <p>Title: ${movie.Title}</p>
                <p>Rating: ${movie.imdbRating}</p>
                <p>Year: ${movie.Year}</p>
                <p>Genre: ${movie.Genre}</p>
                <p>Plot: ${movie.Plot}</p>
            </div>
        </div>`;
    }
    return holdHtml;
  }

  conpileWatchlistHtml(data) {
    let holdWatchHtml = '';
    data.map(function (movie) {
      holdWatchHtml += `
                    <div class="movie-content">
                        <img src="${movie.Poster}">
                        <div>
                            <div class="flex div">
                                <p class="movie-title">${movie.Title}</p>
                                <p class="center"><img src="images/star.png">${movie.imdbRating}</p>
                            </div>
                            <div class="flex div">
                                <p>${movie.Runtime}</p>
                                <p>${movie.Genre}</p>
                                <p class="center remove-watchlist"><img src="images/remove.png">Remove</p>
                            </div>
                            <div class="div">              
                            <p>${movie.Plot}</p>
                            </div>
                        </div>
                    </div>`;
    });
    return holdWatchHtml;
  }
}
export default Movie;
