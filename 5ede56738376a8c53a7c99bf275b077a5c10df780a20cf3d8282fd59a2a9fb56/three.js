const fs = require('fs');
const got = require('got');

async function lessboublon(){
    let MapCilbe = new Map();
    const cible2 = JSON.parse(fs.readFileSync('./cible/cible.json'));
    console.log(cible2.users.length+" Users total")

    cible2.users.forEach(element => {
        MapCilbe.set(element.pk, element);
    });
    console.log(MapCilbe.size+" Users less doublon")

    let users = []
    MapCilbe.forEach(element => {
        users.push(element)
    })
    cible2.users = users
    fs.writeFileSync('./cible/cible.json', JSON.stringify(cible2, null , 4));
}
lessboublon()