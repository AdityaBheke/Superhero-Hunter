// import md5 from 'crypto-js/md5.js';
const ts = ((new Date()).getTime()).toString();
const privateKey = 'e99b92619caa0536ef5b1dfe483652a7361c94cc';
const publicKey = '013197631fe0d1dff2d0fad660597495';
const hash = CryptoJS.MD5(ts+privateKey+publicKey).toString();

const heading = document.querySelector('h1');
const img = document.getElementById('img1');

async function getCharacterList(){
    try {
      const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
      const result = await response.json();
      const data = await result.data;
      console.log(data.results);
      renderElement(data.results);
    } catch (error) {
        console.log("Error in fetching",error);
    }
}

function renderElement(list) {
//   heading.textContent = list[0].name;
  img.src = list[0].thumbnail.path+'.'+list[0].thumbnail.extension;
}
getCharacterList();