//This module to render List of superhero characters

//Accessing container to display list of superhero characters in it
const listContainer = document.getElementById("character-list");

let favouriteCharacters = [];
// Checking if there are any favorite characters already present in localStorage
if (JSON.parse(localStorage.getItem("favourites"))) {
  favouriteCharacters = JSON.parse(localStorage.getItem("favourites"));
}
// Creating superhero character card and rendering it
function renderList(list, total) {
  listContainer.innerHTML = "";                                         //Removing default message
  // Checking if list is empty or not
  if (!list.length) {
    const dataUnavailable = document.createElement("span");             // Creating span to display 
    dataUnavailable.className = "data-unavailable";                     
    dataUnavailable.textContent = "Your favorites list is waiting for its first Superhero!";        // Assigning message to span
    if (total == 0) {
      dataUnavailable.textContent = "Oops, no match! Search again.";    
    }
    listContainer.appendChild(dataUnavailable);                       //Appending span to listContainer
  }
  // Iterating through Character Array
  for (const character of list) {
    const characterId = character.id;
    const characterCard = document.createElement("div");                // Creating div for character card
    characterCard.className = "superhero-card";
    const characterProfile = document.createElement("img");             // Creating img element for Profile image 
    characterProfile.className = "card-profile";
    characterProfile.src = (character.thumbnail.path).replace("http:", "https:") + "." + character.thumbnail.extension;   // Assigning img src
    const characterName = document.createElement("span");               // Creating span for character name
    characterName.className = "card-name";
    characterName.textContent = character.name;                         // Assigning name to span
    const favouriteIcon = document.createElement("button");             // Creating button for favourite icon
    favouriteIcon.className = "favourite-button";
    favouriteIcon.innerHTML = isFavourite(characterId);                 // Assigning Icon to button
    // Adding eventListener to favourite icon
    favouriteIcon.addEventListener("click", (event) => {
      favouriteIcon.innerHTML = addToFavourites(characterId);           // Function call to add character to favourites
      event.stopPropagation();                                          // Stopping event propogation so that card will not get clicked
    });
    // Adding eventListener to Card
    characterCard.addEventListener("click", () => {
      localStorage.setItem("characterId", characterId);                 // Storing character id whose details need to fetch for Superhero details page
      window.location.href = "character.html";                          // Open Superhero details page
    });
    characterCard.appendChild(characterProfile);                        // Appending profile image to card
    characterCard.appendChild(characterName);                           // Appending character name to card
    characterCard.appendChild(favouriteIcon);                           // Appending favourite icon to card
    listContainer.appendChild(characterCard);                           // Appending card to list
  }
}

// Function to add superhero character to favorites or remove from favorites if it is already added
function addToFavourites(characterId) {
  // CHecking if character is already added to favourites or not
  if (!favouriteCharacters.includes(characterId)) {
    favouriteCharacters.push(characterId);                              // If character is not added then it will added to favourites
  } else {
    favouriteCharacters = favouriteCharacters.filter((favouriteId) => {return favouriteId != characterId;}); //If character is already added then remove it from favourites
  }
  localStorage.setItem("favourites", JSON.stringify(favouriteCharacters)); //Storing array of character Ids in localStorage
  return isFavourite(characterId);                                      // Returning icon need to set for that character
}

// Function to set 'favorite' icon
function isFavourite(id) {
  if (favouriteCharacters.includes(id)) {
    return '<i class="fa-solid fa-heart" aria-hidden="true"></i>';    // If character is added to favourites then return solid heart icon
  } else {
    return '<i class="fa-regular fa-heart" aria-hidden="true"></i>';  // If character is not added to favourites then return regular heart icon
  }
}

export { renderList };
