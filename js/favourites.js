import { ts, publicKey, hash } from "./credential.js"; //importing all necessary credential from credential.js module
import { heading, favPageButton } from "./navbar.js"; //importing Page heading and FavouriteTab button with eventListeners attached to them
import { renderList } from "./characterList.js"; //importing renderList function from characterList.js module

//Favourite Page

// Get Array of characters using array of characterId as parameter
async function fetchFavourites(idArray) {
  let charactersArray = [];
  //Checking if array of characterId is empty or not
  if (idArray) {
    // Iterating through Id Array fetching data of each character
    for (const id of idArray) {
      let url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
      try {
        const response = await fetch(url);
        const result = await response.json();
        const data = await result.data;
        charactersArray = charactersArray.concat(data.results); //Concatinating fetched array of character to empty characterArray
      } catch (error) {
        console.log("Error in fetching Character by Id", error);
      }
    }
  }
  renderList(charactersArray); //rendering fetched characters
}

//Initial fetching and rendering favourite characters
fetchFavourites(JSON.parse(localStorage.getItem("favourites")));
