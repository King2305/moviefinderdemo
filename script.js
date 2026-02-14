const APIKEY = "5b839802";
const searchbtn = document.getElementById("search");
const searchinput = document.getElementById("searchbar");
const moviecontainer = document.getElementById("moviecontainer");

searchbtn.addEventListener("click", searchmovies);

function searchmovies() {
    const moviename = searchinput.value;

    fetch(`https://www.omdbapi.com/?s=${moviename}&apikey=${APIKEY}`)
    .then(response => response.json())
    .then(data => {
        moviecontainer.innerHTML = "";

        if(data.Search) {
            data.Search.forEach(movie => {
                getMovieDetails(movie.imdbID);
            });
        } else {
            moviecontainer.innerHTML = "<p>No Movies Found.</p>";

        }
    });
}


function getMovieDetails(imdbID) {
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${APIKEY}`)
        .then(response => response.json())
        .then(movie => {
            const moviecard = document.createElement("div");
            moviecard.classList.add("movie-card");

            moviecard.innerHTML = `
                <img src = "${movie.Poster}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
                <p>${movie.Plot}</P>
            `;
            moviecontainer.appendChild(moviecard);
        });
}