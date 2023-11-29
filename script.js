// API Details -TMDB
// API Key
"5459fc617cc9ed0079435a7812c1a5a6"
// API Read Access Token
const apiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDU5ZmM2MTdjYzllZDAwNzk0MzVhNzgxMmMxYTVhNiIsInN1YiI6IjY1NjczMjhjYThiMmNhMDEyYzE0YWYxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4E4vt2-udFejHBwa-LU2t6cTBUxImI4ty_AfNjDrxFs"

const baseUrl = "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
const movieImgUrl = "https://api.themoviedb.org/3/"

window.onload = function() {
    if (window.jQuery) {  
        let allMovies = []

        // On page load fetch all movies from API
        getMoviesFromTMDB().then(data => {
            console.log(data);
            // Access the data here and manipulate the DOM
            const moviesContainer = document.querySelector('.row');
            let payload = data.results;
            allMovies = payload;

            console.log(payload)
            if (Array.isArray(payload)) {
                payload.forEach(movie => {
                    const movieCard = `
                        <div class="col-sm-3">
                            <div class="card">
                                <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" class="card-img-top" alt="${movie.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${movie.title}</h5>
                                    <p class="card-text">${movie.overview.substring(0,100) + "..."}</p>
                                    <a href="/movies/${movie.title}/${movie.id}" class="btn btn-primary">Watch This Movie</a>
                                </div>
                            </div>
                        </div>`;
                    
                    moviesContainer.innerHTML += movieCard;
                });
            } else {
                console.error('Data is not an array.');
            }
        }).catch(error => {
            console.error('Error fetching movie data:', error);
        });
        
        // Search to fiilter movies on page
        const searchInput = document.getElementById('searchInput');

        searchInput.addEventListener('input', function(event) {
            const searchTerm = event.target.value.toLowerCase().trim();
            const filteredMovies = allMovies.filter(movie => {
                return movie.title.toLowerCase().includes(searchTerm);
            });
            renderMovies(filteredMovies); // Function to render filtered movies
        });


        // On click movie detail page

    } else {
        // jQuery is not loaded
        alert("Doesn't Work");
    }
}


function getMoviesFromTMDB() {
    const settings = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + apiToken
        }
    };

    return fetch(baseUrl, settings)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('There was a problem fetching the data:', error);
        });
}

function renderMovies(movies) {
    const moviesContainer = document.querySelector('.row'); 
    
    // Clear the existing movies before rendering the filtered ones
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        // Create a card element for each movie and append it to the container
        const movieCard = document.createElement('div');
        movieCard.classList.add('col-sm-3', 'mb-3');
        movieCard.innerHTML = `
            <div class="card">
                <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.overview.substring(0,100) + "..."}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>`;
        moviesContainer.appendChild(movieCard);
    });
}

