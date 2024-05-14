//This module to render List of superhero characters

//Accessing container to display list of superhero characters in it
const listContainer = document.getElementById('character-list');

let favouriteCharacters = []; 
// Checking if there are any favorite characters already present in localStorage
if (JSON.parse(localStorage.getItem('favourites'))) {
    favouriteCharacters = JSON.parse(localStorage.getItem('favourites'));
}
// Creating superhero character card and rendering it
function renderList(list) {
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
      favouriteIcon.innerHTML = isFavourite(characterId);
      favouriteIcon.addEventListener('click',(event)=>{
        favouriteIcon.innerHTML = addToFavourites(characterId,favouriteIcon.innerHTML);
        event.stopPropagation();
      })
      characterCard.addEventListener('click',()=>{
        localStorage.setItem('characterId',characterId);
        window.location.href = 'character.html';
      })
      characterCard.appendChild(characterProfile);
      characterCard.appendChild(characterName);
      characterCard.appendChild(favouriteIcon);
      listContainer.appendChild(characterCard);
    }
  }

  // Function to add superhero character to favorites or remove from favorites if it is already added
  function addToFavourites(characterId,icon){
    if (!favouriteCharacters.includes(characterId)) {
      favouriteCharacters.push(characterId);
    }else{
      favouriteCharacters = favouriteCharacters.filter((favouriteId)=>{return favouriteId != characterId});
    }
    localStorage.setItem('favourites',JSON.stringify(favouriteCharacters));
    return isFavourite(characterId);
  }

  // Function to set 'favorite' icon
  function isFavourite(id) {
    if (favouriteCharacters.includes(id)) {
        return '<i class="fa-solid fa-heart" aria-hidden="true"></i>';
    } else {
        return '<i class="fa-regular fa-heart" aria-hidden="true"></i>';
    }
  }

  export {renderList};