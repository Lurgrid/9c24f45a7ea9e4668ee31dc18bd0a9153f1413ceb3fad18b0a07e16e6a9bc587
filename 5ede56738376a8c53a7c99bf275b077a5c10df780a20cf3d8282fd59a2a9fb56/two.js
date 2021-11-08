const fs = require('fs');
const got = require('got');
const headers = JSON.parse(fs.readFileSync('./header.json'));

async function ranger(x){
    const cible = JSON.parse(fs.readFileSync('./cible/cible.json'));
    var json = JSON.parse(x.body)
    json.users.forEach(x => {
        cible.users.push(x)
    })
    fs.writeFileSync('./cible/cible.json', JSON.stringify(cible, null , 4));
}
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

async function Getusers(){
    let para = "";
    for(var i = 0; i < 3; i++){
        console.log("Requete numero "+i)
        await got("https://i.instagram.com/api/v1/friendships/1459119278/followers/?count=9999&max_id="+para, {headers}).then(x => {
            console.log(x)
            console.log(JSON.parse(x.body).next_max_id)
            para = JSON.parse(x.body).next_max_id
            ranger(x);
        }).catch(err => {
            console.log("Requete numero "+i+" A une erreur")
            console.log(err)
        })
    }
    return true
}

async function run(){
    await Getusers()
    lessboublon()
}

run()
