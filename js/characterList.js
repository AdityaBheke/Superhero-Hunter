const listContainer = document.getElementById('character-list');

let favouriteCharacters = []; 
if (JSON.parse(localStorage.getItem('favourites'))) {
    favouriteCharacters = JSON.parse(localStorage.getItem('favourites'));
}

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
    if (!favouriteCharacters.includes(characterId)) {
      favouriteCharacters.push(characterId);
    }else{
      favouriteCharacters = favouriteCharacters.filter((favouriteId)=>{return favouriteId != characterId});
    }
    localStorage.setItem('favourites',JSON.stringify(favouriteCharacters));
    console.log(JSON.parse(localStorage.getItem('favourites')));
    return isFavourite(characterId);
  }

  function isFavourite(id) {
    if (favouriteCharacters.includes(id)) {
        return '<i class="fa-solid fa-heart" aria-hidden="true"></i>';
    } else {
        return '<i class="fa-regular fa-heart" aria-hidden="true"></i>';
    }
  }

  export {renderList};