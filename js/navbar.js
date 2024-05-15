// Navbar
// Accessing navbar elements
const heading = document.querySelector('.heading');
const favPageButton = document.querySelector('nav .black-button'); 

heading.addEventListener('click',()=>{
  window.location.href = 'index.html';      //open Home page when user clicks AppName/Logo
})

favPageButton.addEventListener('click',()=>{
  window.location.href = 'favourites.html';   //open Favourites page when user clicks Favourite button
})

export {heading,favPageButton};