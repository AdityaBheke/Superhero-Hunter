import { ts, publicKey, hash } from "./credential.js";
import {heading, favPageButton} from './navbar.js';
let favouriteCharacters = [];


// Home Page
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-button');
const listContainer = document.getElementById('homepage-list');

window.onload = ()=>{
  defaultList();
};
searchInput.addEventListener('keyup',()=>{
  defaultList(searchInput.value);
})

async function defaultList(name){
  let url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  if(!name){
    url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  }
    try {
      const response = await fetch(url);
      const result = await response.json();
      const data = await result.data;
      console.log("Home page data",data.results);
      renderElement(data.results);
    } catch (error) {
        console.log("Error in fetching",error);
    }
}

function renderElement(list) {
  listContainer.innerHTML = '';
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


function addToFavourites(characterId,icon){
  let iconHtml = '<i class="fa-regular fa-heart" aria-hidden="true"></i>';

  if (icon == '<i class="fa-regular fa-heart" aria-hidden="true"></i>') {
    favouriteCharacters.push(characterId);
    iconHtml = '<i class="fa-solid fa-heart" aria-hidden="true"></i>';
  }else{
    favouriteCharacters = favouriteCharacters.filter((favouriteId)=>{return favouriteId != characterId});
  }

  localStorage.setItem('favourites',JSON.stringify(favouriteCharacters));
  console.log(JSON.parse(localStorage.getItem('favourites')));
  return iconHtml;
}