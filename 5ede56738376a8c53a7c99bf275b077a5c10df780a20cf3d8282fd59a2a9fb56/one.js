const fs = require('fs');
const got = require('got');
const headers = JSON.parse(fs.readFileSync('./headergot.json'));

async function follow(){

    const cible = JSON.parse(fs.readFileSync('./cible/cible.json'));
    let MapCilbe = new Map();
    cible.users.forEach(element => {
        MapCilbe.set(element.pk, element);
    });

    got.post(`https://www.instagram.com/web/friendships/${cible.users[0].pk}/follow/`, {headers}).then(x => {
    var json = JSON.parse(x.body)
    if(json.result === "following"){
        console.log("Follow reussi de "+cible.users[0].username)
        const death = JSON.parse(fs.readFileSync('./cible/Death.json'));
        death.users.push(cible.users[0])
        MapCilbe.delete(cible.users[0].pk)
        let users = []
        MapCilbe.forEach(element => {
            users.push(element)
        })
        cible.users = users
        fs.writeFileSync('./cible/cible.json', JSON.stringify(cible, null , 4));
        fs.writeFileSync('./cible/Death.json', JSON.stringify(death, null , 4));
    }else if (json.result === "requested"){
        console.log("Follow reussi de "+cible.users[0].username)
        const death = JSON.parse(fs.readFileSync('./cible/Death.json'));
        death.users.push(cible.users[0])
        MapCilbe.delete(cible.users[0].pk)
        let users = []
        MapCilbe.forEach(element => {
            users.push(element)
        })
        cible.users = users
        fs.writeFileSync('./cible/cible.json', JSON.stringify(cible, null , 4));
        fs.writeFileSync('./cible/Death.json', JSON.stringify(death, null , 4));
    }else{
        console.log("ERROR réponse du site inconnu")
        MapCilbe.delete(cible.users[0].pk)
        let users = []
        MapCilbe.forEach(element => {
            users.push(element)
        })
        cible.users = users
        fs.writeFileSync('./cible/cible.json', JSON.stringify(cible, null , 4));
        fs.writeFileSync('./cible/Death.json', JSON.stringify(death, null , 4));
    }
}).catch(err => {
    console.log(err)
})
}
async function run(){
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    for(let i = 0; i < 5; i++){
    follow()
    await sleep(180000)
    }
}
run()