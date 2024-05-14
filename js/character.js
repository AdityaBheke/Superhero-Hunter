import { ts, publicKey, hash } from "./credential.js";  //importing all necessary credential from credential.js module
import {heading, favPageButton} from './navbar.js';     //importing Page heading and FavouriteTab button with eventListeners attached to them

const profileImage = document.getElementById('superhero-profile');
const profileName = document.querySelector('.search-label');
const description = document.getElementById('description');
const detailsContainer = document.getElementById('details-container'); //Main

async function getCharacter(id) {
    const url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    try{
        const response = await fetch(url);
        const result = await response.json();
        const data = result.data;
        const character = data.results[0];
        renderBasicDetails(character);
        await getMoreDetails(character.comics.collectionURI,character.comics.available,'Comics');
        await getMoreDetails(character.series.collectionURI,character.series.available,'Series');
        await getMoreDetails(character.events.collectionURI,character.events.available,'Events');
    }catch(error){
        console.log('error while fetching character ',error);
    }
}
async function getMoreDetails(uri,total,infoType) {
    const url = `${uri}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    try {
        const response = await fetch(url);
        const result = await response.json();
        const data = result.data;
        const infoList = data.results;
        renderMoreDetails(infoList,total,infoType);
    } catch (error) {
        console.log('error while fetching more details', error);
    }
}
function renderBasicDetails(character) {
    profileImage.src = character.thumbnail.path+'.'+character.thumbnail.extension;
    profileName.textContent = character.name;
    description.innerHTML = `&emsp;&emsp; ${character.description}`;
}

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