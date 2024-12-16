const filmsList = document.getElementById("films");
const poster = document.getElementById("movie-poster");
const title = document.getElementById("movie-title");
const description = document.getElementById("movie-description");
const runtime = document.getElementById("movie-runtime");
const showtime = document.getElementById("movie-showtime");
const tickets = document.getElementById("movie-tickets");
const buyTicketBtn = document.getElementById("buy-ticket-btn");

let currentFilm ;

// Create a film menu item
function createFilmMenuItem(film) {
  const li = document.createElement("li");
  li.textContent = film.title;
  li.classList.add("film-item");
  li.addEventListener("click", () => displayFilmDetails(film));
  filmsList.appendChild(li);
}
// Fetch and display the first film details
fetch("http://localhost:3000/films/1")
  .then(response => response.json())
  .then(data => displayFilmDetails(data))
  .catch(error=>console.error('Error fetching movie:', error));


// Fetch and display all films in the menu
fetch("http://localhost:3000/films")
  .then(response => response.json())
  .then(data => {
    filmsList.innerHTML = ""; 
    data.forEach(film => createFilmMenuItem(film));
  })
  .catch(error=>console.error('Error fetching movies:', error));

// Display the film details
function displayFilmDetails(film) {
  currentFilm = film;
  poster.src = film.poster;
  title.textContent = film.title;
  description.textContent = film.description;
  runtime.textContent = film.runtime;
  showtime.textContent = film.showtime;
  updateAvailableTickets(film);
}

// Update available tickets
function updateAvailableTickets(film) {
  const availableTickets = film.capacity - film.tickets_sold;
  tickets.textContent = availableTickets;
  tickets.classList.toggle("sold-out", availableTickets === 0);
  buyTicketBtn.disabled = availableTickets === 0;
}

// Handle ticket purchase
buyTicketBtn.addEventListener("click", () => {
  if (currentFilm) {
    if (currentFilm.tickets_sold < currentFilm.capacity) {
      currentFilm.tickets_sold++;
      updateAvailableTickets(currentFilm);
    }
  }
});

