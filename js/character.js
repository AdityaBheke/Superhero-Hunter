import { ts, publicKey, hash } from "./credential.js";  //importing all necessary credential from credential.js module
import {heading, favPageButton} from './navbar.js';     //importing Page heading and FavouriteTab button with eventListeners attached to them

// Accessing all necessary elements
const profileImage = document.getElementById('superhero-profile');
const profileName = document.querySelector('.search-label');
const description = document.getElementById('description');

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
    const url = `${uri}?limit=50&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
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
    profileImage.src = character.thumbnail.path+'.'+character.thumbnail.extension;      // Assigning Superhero img src
    profileName.textContent = character.name;                                           // Assigning Superhero Name 
    // Checking if Description of Superhero is available or not
    if (character.description == '') {
        description.className = 'data-unavailable';
        description.innerHTML = `Decription not available`;
    } else {
        description.className = '';
        description.innerHTML = `&emsp;&emsp; ${character.description}`;
    }
}
// Function to render more details i.e. comics, series, events of a character
function renderMoreDetails(infoList,total,infoType) {
    const infoContainer = document.getElementById(infoType);    //Accessing Infocontainer for particular info (Comics/Events/Serires)
    infoContainer.innerHTML = '';
    const infoName = document.createElement('span');            // Creating span for Info Heading i.e. Comics/ Series/ Events
    infoName.className = 'info-type';
    infoName.textContent = `${infoType} (${total})`;            // Assigning info heading and total no. of Comics/Events/Serires
    const cardContainer = document.createElement('div');        // Crating div for horizontal list of cards
    cardContainer.className = 'card-container';
    for (const info of infoList) {
        const infoCard = document.createElement('div');         // Creating div acting as a Card
        infoCard.className = 'info-card';
        const cardImage = document.createElement('img');        // Image for card
        cardImage.className = 'card-thumbnail';
        cardImage.src = info.thumbnail.path+'.'+info.thumbnail.extension;   // Assigning image src
        const cardName = document.createElement('span');        // Span for Card Name
        cardName.className = 'card-name';
        cardName.textContent = info.title;                      // Assigning card name

        infoCard.appendChild(cardImage);                        // Appending Image in card
        infoCard.appendChild(cardName);                         // Appending card name in card
        cardContainer.appendChild(infoCard);                    // Appending Card in List of cards
    }
    infoContainer.appendChild(infoName);                        // Appending Info heading in InfoContianer for particular Info
    infoContainer.appendChild(cardContainer);                   // Appending Card List in info container
}
// Function call to fetch character details
getCharacter(localStorage.getItem('characterId'));