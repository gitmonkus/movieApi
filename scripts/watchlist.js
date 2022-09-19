import Movie from './movies.js';

const watchlistContent = document.getElementById('watchlist-content');
const removeWatchlist = document.getElementsByClassName('remove-watchlist');
// let holdWatchHtml = '';
let watchArray;

const getMovie = new Movie();

function loadLocalStorage() {
  watchArray = localStorage.getItem('movies');
  watchArray = JSON.parse(watchArray);
  getWatchlistHtml();
}

function getWatchlistHtml() {
  if (watchArray.length == 0) {
    watchlistContent.innerHTML = `
      <div class="blank-list">
      <p>Your watchlist is looking a little empty...</p>
      <div class="cross-list">
        <img src="images/cross.png" alt="add movies link" />
        <p><a href="index.html">Let's add some movies!</a></p>
      </div>`;
  } else {
    watchlistContent.innerHTML = getMovie.conpileWatchlistHtml(watchArray);
    removeFromWatchlist();
  }
}

function removeFromWatchlist() {
  for (let i = 0; i < removeWatchlist.length; i++) {
    removeWatchlist[i].addEventListener(
      'click',
      function () {
        delete watchArray[i];
        watchArray = watchArray.filter(function () {
          return !null;
        });
        watchArray.sort();
        localStorage.clear();
        console.log(watchArray);
        watchArray = JSON.stringify(watchArray);
        localStorage.setItem('movies', watchArray);

        loadLocalStorage();
      },
      false
    );
  }
}

document.addEventListener('DOMContentLoaded', loadLocalStorage);
