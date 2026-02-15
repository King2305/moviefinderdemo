
const APIKEY = "e06c3d22d279ad102169cc68c3f7409e";
const searchbtn = document.getElementById("search");
const searchinput = document.getElementById("searchbar");
const moviecontainer = document.getElementById("moviecontainer");
const genreselection = document.getElementById("genreselection");

searchbtn.addEventListener("click", searchmovies);
searchinput.addEventListener("keydown",  function(event){
     if (event.key == "Enter"){
        event.preventDefault()
        searchmovies();
     }


})



function searchmovies() {
    const moviename = searchinput.value.trim();
    const selectedgenre  = genreselection.value;

    let url;

    if (moviename !== "") {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${moviename}`;
    }
    else if (selectedgenre !== "") {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&with_genres=${selectedgenre}`;
    }

    else {
        moviecontainer.innerHTML = "<p> PLS SELECT  A GENRE OR TYPE  A MOVIE NAME. </P>";
        return;
    }

    fetch(url)
        .then(response => response.json())
        .then( data => {
            console.log(data);
            moviecontainer.innerHTML = "";

            let results = data.results || [];

            if (moviename !== "" && selectedgenre ){
                results = results.filter(movie =>
                    movie.genre_ids.includes(Number(selectedgenre))
                );
            }

            if (results.length > 0) {
                results.forEach(movie => {
                    displayMovie(movie)
                });

            } else{
                moviecontainer.innerHTML = "<p>no movies found</p>";
            }

        })

        .catch(error =>  console.log(error));
}

/*function searchmovies() {
    const moviename = searchinput.value;

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${moviename}`)
    .then(response => response.json())
    .then(data => {
        moviecontainer.innerHTML = "";

        if(data.results && data.results.length > 0) {
            data.results.forEach(movie => {
                displayMovie(movie);
            });
        } else {
            moviecontainer.innerHTML = "<p>No Movies Found.</p>";

        }
    })
    .catch(error => console.log(error));
}*/


function displayMovie(movie) {
    const moviecard = document.createElement("div");
    moviecard.classList.add("moviecard");
    
    const posterURL = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

    moviecard.innerHTML = `
        <img src = "${posterURL}" alt = "${movie.title}">
        <h3>${movie.title}</h3>
        <p>${movie.release_date || "No release date"}</p>
        <p>${movie.overview || "No description available"}</p>
    
    `;

    moviecontainer.appendChild(moviecard);  
}

function fetchTrending() {
    fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${APIKEY}`)
        .then(res => res.json())
        .then(data => {
            const trendingContainer = document.getElementById("trending");
            trendingContainer.innerHTML = "";

            data.results.forEach(show => {
                const posterURL = show.poster_path
                    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                    : "https://via.placeholder.com/500x750";

                const card = document.createElement("div");
                card.classList.add("movie-card");

                card.innerHTML = `
                    <img src="${posterURL}">
    
                `;

                trendingContainer.appendChild(card);
            });
        });
}


function fetchTopAiring() {
    fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${APIKEY}`)
        .then(res => res.json())
        .then(data => {
            const topContainer = document.getElementById("top-airing");
            topContainer.innerHTML = "";

            data.results.forEach((show, index) => {
                const aircard = document.createElement("div");
                aircard.classList.add("movie-cards");

                aircard.innerHTML = `
                    <h3>${index+1} . ${show.name}</h3>
                `;

                topContainer.appendChild(aircard);
            });
        });
}

window.addEventListener("DOMContentLoaded", () => {
    fetchTrending();
    fetchTopAiring();
});

const trendingContainer = document.getElementById("trending");
const topContainer = document.getElementById("top-airing");
