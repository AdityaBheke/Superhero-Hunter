import { ts, publicKey, hash } from "./credential.js";
import { heading, favPageButton } from "./navbar.js";
import { renderList } from "./characterList.js";

//Favourite Page
// Get Array of character objects by accepting array containing ids of characters as parameter
async function getCharacterById(idArray) {
    let charactersArray = [];
  for (const id of idArray) {
    let url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    try {
        const response = await fetch(url);
        const result = await response.json();
        const data = await result.data;
        console.log("Favourite page data",data.results);
        charactersArray = charactersArray.concat(data.results);
      } catch (error) {
          console.log("Error in fetching Character by Id",error);
      }
  }
  renderList(charactersArray);
}

if(JSON.parse(localStorage.getItem('favourites'))){
    getCharacterById(JSON.parse(localStorage.getItem('favourites')));
}else{
    getCharacterById([]);
}
