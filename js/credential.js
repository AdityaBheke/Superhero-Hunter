// Creating a Hash
const ts = ((new Date()).getTime()).toString();
const privateKey = 'e99b92619caa0536ef5b1dfe483652a7361c94cc';
const publicKey = '013197631fe0d1dff2d0fad660597495';
const hash = CryptoJS.MD5(ts+privateKey+publicKey).toString();

export {ts, publicKey, hash};