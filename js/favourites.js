import { ts, publicKey, hash } from "./credential.js";
import {heading, favPageButton} from './navbar.js';
const listContainer = document.getElementById('homepage-list');

//Favourite Page
// Get Array of character objects by accepting array containing ids of characters as parameter
async function getCharacterById(idArray) {
    listContainer.innerHTML = '';
  for (const id of idArray) {
    let url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    try {
        const response = await fetch(url);
        const result = await response.json();
        const data = await result.data;
        console.log("Favourite page data",data.results);
        renderCard(data.results);
      } catch (error) {
          console.log("Error in fetching Character by Id",error);
      }
  }
}

function renderCard(list) {
    for (const character of list) {
      const characterId = character.id;
      const characterCard = document.createElement('div');
      characterCard.className = 'superhero-card';
      const characterProfile = document.createElement('img');
      characterProfile.className = 'card-profile';
      characterProfile.src = character.thumbnail.path + '.' + character.thumbnail.extension;
      const characterName = document.createElement('span');
      characterName.className = 'card-name';
      characterName.textContent = character.name;
      const favouriteIcon = document.createElement('button');
      favouriteIcon.className = 'favourite-button';
      favouriteIcon.innerHTML = '<i class="fa-regular fa-heart" aria-hidden="true"></i>';
      favouriteIcon.addEventListener('click',()=>{
        favouriteIcon.innerHTML = addToFavourites(characterId,favouriteIcon.innerHTML);
      })
      characterCard.appendChild(characterProfile);
      characterCard.appendChild(characterName);
      characterCard.appendChild(favouriteIcon);
      listContainer.appendChild(characterCard);
    }
  }
  
if(JSON.parse(localStorage.getItem('favourites'))){
    getCharacterById(JSON.parse(localStorage.getItem('favourites')));
}
