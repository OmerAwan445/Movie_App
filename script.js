"use strict";
//========= API Urls ================ 
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=04c35731a5ee918f014970082a0088b1&&language=en-US&page=1`;

const IMAGE_PATH = `http://image.tmdb.org/t/p/w500`;

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&&query=`;


let mainContainer = document.querySelector("main");
const form = document.querySelector('form');
const searchTerm = document.querySelector('.search-bar');


async function fetchMovieByName(movieName) {
  const resp = await fetch(SEARCH_API + movieName);
  const respData = await resp.json();
  return respData.results ? respData.results : [];
}


async function fetchPopularMovies() {
  const resp = await fetch(API_URL);
  const respData = await resp.json();
  return respData.results;
}

async function loadPopularMovies() {
  /*  ======== Fetching popular movies by API Call ======== */
  const popularMovies = await fetchPopularMovies();
  popularMovies.forEach(movieData => {
    loadMovie(movieData);
  });
}

form.addEventListener('submit' ,async e => {
  e.preventDefault();
  mainContainer.innerHTML = '';
  const searchedMovies = await fetchMovieByName(searchTerm.value);
  searchedMovies.forEach(movieData => {
  loadMovie(movieData);
  })
  searchTerm.value = '';
})

function classNameDecision(rating) {
  if (rating >= 8) {
    return `orange`;
  }
  else if (rating >= 6.5) {
    return `blue`;
  }
  else
    return `red`;
}


// ------------- loads Movie in main container --------------
function loadMovie(movieData) {
  const { title, poster_path, vote_average ,overview } = movieData;
  if(!title || !poster_path || !vote_average) return;
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");
  movieCard.innerHTML = `
  <img src=${IMAGE_PATH + poster_path} alt="">
  <div class="movie-info">
  <h3 class="movie-title">${title}</h3>
  <span class=${classNameDecision(vote_average)}>${vote_average}</span>
  </div> 
  <div class="movie-overview" > 
  <h3>Overview</h3>
  ${overview}</div>
  `;
  mainContainer.appendChild(movieCard);
}


// =========== Initially loads Popular movies =========
loadPopularMovies();
