var scanf = require('scanf');
var sha256 = require('js-sha256');


console.log("Entrez le mots a hash")

let mot = scanf('%s');

var hash = sha256.create();
hash.update(mot);
//hash.array();

console.log(hash.hex())