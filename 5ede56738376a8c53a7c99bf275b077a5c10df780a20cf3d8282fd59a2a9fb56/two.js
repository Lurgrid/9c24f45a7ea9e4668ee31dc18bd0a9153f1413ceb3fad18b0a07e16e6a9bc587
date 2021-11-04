const fs = require('fs');
const got = require('got');
const headers = JSON.parse(fs.readFileSync('./header.json'));
const cible = JSON.parse(fs.readFileSync('./cible/cible.json'));

console.log(cible)
got("https://i.instagram.com/api/v1/friendships/1459119278/followers/?count=9", {headers}).then(x => {
    var json = JSON.parse(x.body)
    json.users.forEach(x => {
        cible.users.push(x)
    })
    fs.writeFileSync('./cible/cible.json', JSON.stringify(cible, null , 4));
    const cible2 = JSON.parse(fs.readFileSync('./cible/cible.json'));
    cible2.users = [...new Set(cible2.users)]

    fs.writeFileSync('./cible/cible.json', JSON.stringify(cible, null , 4));

})