import { ts, publicKey, hash } from "./credential.js";  //importing all necessary credential from credential.js module
import {heading, favPageButton} from './navbar.js';     //importing Page heading and FavouriteTab button with eventListeners attached to them

// Accessing all necessary elements
const profileImage = document.getElementById('superhero-profile');
const profileName = document.querySelector('.search-label');
const description = document.getElementById('description');
const detailsContainer = document.getElementById('details-container'); //Main

// function to get character details using Id as a parameter
async function getCharacter(id) {
    const url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    try{
        const response = await fetch(url);
        const result = await response.json();
        const data = result.data;
        const character = data.results[0];
        renderBasicDetails(character);          //rendering basic details i.e. image, name and description of a superhero
        await getMoreDetails(character.comics.collectionURI,character.comics.available,'Comics');   //Fetching Comics details of superhero
        await getMoreDetails(character.series.collectionURI,character.series.available,'Series');   //Fetching Series details of superhero
        await getMoreDetails(character.events.collectionURI,character.events.available,'Events');   //Fetching Events details of superhero
    }catch(error){
        console.log('error while fetching character ',error);
    }
}
// Function to get more details i.e. comics, series, events of a character using URI and available infos as parameter
async function getMoreDetails(uri,total,infoType) {
    const url = `${uri}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    try {
        const response = await fetch(url);
        const result = await response.json();
        const data = result.data;
        const infoList = data.results;
        renderMoreDetails(infoList,total,infoType);         //rendering more details i.e. comics, series, events of a character
    } catch (error) {
        console.log('error while fetching more details', error);
    }
}
// Function to render basic details i.e. image, name and description of a character
function renderBasicDetails(character) {
    profileImage.src = character.thumbnail.path+'.'+character.thumbnail.extension;
    profileName.textContent = character.name;
    if (character.description == '') {
        description.className = 'data-unavailable';
        description.innerHTML = `Decription not available...`;
    } else {
        description.innerHTML = `&emsp;&emsp; ${character.description}`;
    }
}
// Function to render more details i.e. comics, series, events of a character
function renderMoreDetails(infoList,total,infoType) {
    const infoContainer = document.createElement('div');
    infoContainer.className = 'info-container';
    const infoName = document.createElement('span');
    infoName.className = 'info-type';
    infoName.textContent = `${infoType} (${total})`;
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    for (const info of infoList) {
        const infoCard = document.createElement('div');
        infoCard.className = 'info-card';
        const cardImage = document.createElement('img');
        cardImage.className = 'card-thumbnail';
        cardImage.src = info.thumbnail.path+'.'+info.thumbnail.extension;
        const cardName = document.createElement('span');
        cardName.className = 'card-name';
        cardName.textContent = info.title;

        infoCard.appendChild(cardImage);
        infoCard.appendChild(cardName);
        cardContainer.appendChild(infoCard);
    }
    infoContainer.appendChild(infoName);
    infoContainer.appendChild(cardContainer);
    detailsContainer.appendChild(infoContainer);
}

// Function call to fetch character details
getCharacter(localStorage.getItem('characterId'));