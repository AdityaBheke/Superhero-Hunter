import { ts, publicKey, hash } from "./credential.js";
import {heading, favPageButton} from './navbar.js';
import { renderList } from "./characterList.js";

// Home Page
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-button');

window.onload = ()=>{
  fetchList();
};

searchInput.addEventListener('keyup',()=>{
  fetchList(searchInput.value);
})

async function fetchList(name){
  let url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  if(!name){
    url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  }
    try {
      const response = await fetch(url);
      const result = await response.json();
      const data = await result.data;
      console.log("Home page data",data.results);
      renderList(data.results);
    } catch (error) {
        console.log("Error in fetching List of characters",error);
    }
}




