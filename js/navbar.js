// Navbar
// Accessing navbar elements
const heading = document.querySelector('.heading');
const favPageButton = document.querySelector('nav .black-button'); 

heading.addEventListener('click',()=>{
  window.location.href = 'index.html';
})

favPageButton.addEventListener('click',()=>{
  window.location.href = 'favourites.html';
})

export {heading,favPageButton};