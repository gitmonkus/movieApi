import Movie from './movies.js';

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const indexContent = document.getElementById('index-content');
const addWatchlist = document.getElementsByClassName('add-watchlist');

let holdHtml = '';
let movieArray;
let savedMovieArray = [];

searchBtn.addEventListener('click', searchForMovie);
searchInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    searchForMovie();
  }
});

function searchForMovie() {
  if (searchInput.value) {
    try {
      fetch(
        `http://www.omdbapi.com/?apikey=f6a7c3ab&type=movie&s=${searchInput.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.Error === 'Movie not found!') {
            indexContent.innerHTML = `
                              <div><p class="text">Unable to find what you're looking for.  Please try another search.</p></div>`;
          } else {
            movieArray = data;
            loopDLoop();
          }
        });
    } catch (error) {
      console.error(error);
    }
  }
}

function loopDLoop() {
  for (let movie of movieArray.Search) {
    fetch(
      `http://www.omdbapi.com/?apikey=f6a7c3ab&type=movie&plot=short&t=${movie.Title}`
    )
      .then((res) => res.json())
      .then((data) => {
        movie.Plot = data.Plot;
        movie.Genre = data.Genre;
        movie.imdbRating = data.imdbRating;
        movie.Runtime = data.Runtime;
      });
  }
  setTimeout(pushMainContentHtml, 1500);
}

function pushMainContentHtml() {
  const htmlContent = movieArray.Search.map(function (movie) {
    holdHtml += `
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
                    <p class="center add-watchlist"><img src="images/cross.png">Watchlist</p>
                </div>
                <div class="div">              
                <p>${movie.Plot}</p>
                </div>
            </div>
        </div>`;
  });

  indexContent.innerHTML = holdHtml;
  setTimeout(addWatch, 2000);
}

function addWatch() {
  searchInput.value = '';
  holdHtml = '';

  for (let i = 0; i < addWatchlist.length; i++) {
    addWatchlist[i].addEventListener('click', function () {
      savedMovieArray.push(movieArray.Search[i]);
      savedMovieArray = JSON.stringify(savedMovieArray);
      localStorage.setItem('movies', savedMovieArray);
      savedMovieArray = JSON.parse(savedMovieArray);
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('movies')) {
    savedMovieArray = localStorage.getItem('movies');
    savedMovieArray = JSON.parse(savedMovieArray);
    console.log(savedMovieArray);
  }
});
