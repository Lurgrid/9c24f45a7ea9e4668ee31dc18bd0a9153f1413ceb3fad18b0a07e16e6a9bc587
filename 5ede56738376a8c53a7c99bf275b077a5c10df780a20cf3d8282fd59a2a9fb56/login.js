const fs = require('fs');
const got = require('got');
var scanf = require('scanf');

console.log("Entrez une votre email de compte instagram")
let username = scanf("%s").slice(0, -1)
console.log("Entrez une votre mots de passe")
let password = scanf("%s").slice(0, -1)
console.clear()

const createEncPassword = pwd => {
    return `#PWD_INSTAGRAM_BROWSER:0:${Date.now()}:${pwd}`
  }

async function addCookie(InitCookie, addCookie){
    allcookie = []
    InitCookie.split("; ").forEach(element => {
        allcookie.push(element)
    })
    addCookie.forEach(element => {
        allcookie.push(element.split(";")[0])
    })
    Cookie = new Map()
    allcookie.forEach(element => {
        Cookie.set(element.split("=")[0], element)
    });
    allcookie = []
    Cookie.forEach(element => {
        allcookie.push(element)
    })
    return allcookie.join("; ")
}
async function login(){
    const x = await got("https://www.instagram.com/data/shared_data/");
    var json = JSON.parse(x.body)

    headers = {
        'User-Agent': "SAGBrowser",
        'Accept-Language': json.locale,
        'X-Instagram-AJAX': 1,
        'X-CSRFToken': json.config.csrf_token,
        'X-Requested-With': 'XMLHttpRequest',
        Referer: "https://www.instagram.com",
        accept: 'application/json'
    }
    const form = { username, enc_password: createEncPassword(password) }
    const y = await got.post("https://www.instagram.com/accounts/login/ajax/", {headers, form: form})
    .catch(err => {
        console.log("----- ECHEC DE LA CONNECTION ("+err.name +") -----")
        console.log("- Possibly too many connection requests -")
        return
    })
    if(y === undefined){
        return
    }
    var jsony = JSON.parse(y.body)
    if(jsony.authenticated){
        console.log("----- CONNECTION REUSSI -----")
    }else{
        console.log("----- ECHEC DE LA CONNECTION -----")
        return
    }
    let allcookie = []
    y.headers["set-cookie"].forEach(element => {
        allcookie.push(element.split(";")[0])
    })
    const headers2 = JSON.parse(fs.readFileSync('./header.json'));
    let thecookie = allcookie.join("; ")
    headers2.Cookie = thecookie
    fs.writeFileSync('./header.json', JSON.stringify(headers2, null , 4));

    const w = await got("https://www.instagram.com/data/shared_data/", {headers: headers2});
    headers2.Cookie = await addCookie(headers2.Cookie, w.headers["set-cookie"])
    fs.writeFileSync('./header.json', JSON.stringify(headers2, null , 4));
}
login()