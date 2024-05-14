import { ts, publicKey, hash } from "./credential.js";  //importing all necessary credential from credential.js module
import {heading, favPageButton} from './navbar.js';     //importing Page heading and FavouriteTab button with eventListeners attached to them
import { renderList } from "./characterList.js";        //importing renderList function from characterList.js

//Favourite Page

// Get Array of characters using array of characterId as parameter
async function fetchFavourites(idArray) {
    let charactersArray = [];
    //Checking if array of characterId is empty or not
    if (idArray) {
        for (const id of idArray) {
            let url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
            try {
                const response = await fetch(url);
                const result = await response.json();
                const data = await result.data;
                console.log("Favourite page data",data.results);
                charactersArray = charactersArray.concat(data.results); //Concatinating fetched array of character to empty characterArray
                const comicsUrl = `${data.results[0].comics.collectionURI}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
                console.log("url",comicsUrl);
                const comicresponse = await fetch(comicsUrl);
                const comicresult = await comicresponse.json();
                const comicdata = await comicresult.data;
                console.log(comicdata); 
              } catch (error) {
                  console.log("Error in fetching Character by Id",error);
              }
          }
    }
    //rendering fetched characters
  renderList(charactersArray);
}

//Initial fetching and rendering favourite characters
fetchFavourites(JSON.parse(localStorage.getItem('favourites')));
