import { ts, publicKey, hash } from "./credential.js"; //importing all necessary credential from credential.js module
import { heading, favPageButton } from "./navbar.js"; //importing Page heading and FavouriteTab button with eventListeners attached to them
import { renderList } from "./characterList.js"; //importing renderList function from characterList.js

// Home Page
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-button");

// Initial Rendering of default list
window.onload = () => {
  fetchList(searchInput.value);
};
// Filtering the list of superhero characters on every letter pressed
searchInput.addEventListener("keyup", () => {
  fetchList(searchInput.value);
});
// fetch list of characters on click of searchButton using the name provided from searchInput
searchButton.addEventListener("click", () => {
  fetchList(searchInput.value);
});

// Fetching list of characters by accepting name as parameter
async function fetchList(name) {
  // If name or letters are provided then fetch only those characters whose name starts with given letters
  let url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&limit=99&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  if (!name) {
    // If name is not provided then fetch all characters
    url = `https://gateway.marvel.com:443/v1/public/characters?limit=99&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  }
  try {
    const response = await fetch(url);
    const result = await response.json();
    const data = await result.data;
    renderList(data.results, data.total); //rendering the fetched data
  } catch (error) {
    console.log("Error in fetching List of characters", error);
  }
}
