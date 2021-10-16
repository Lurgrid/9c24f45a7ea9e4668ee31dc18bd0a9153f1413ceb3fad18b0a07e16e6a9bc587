const fs = require('fs');
const got = require('got')

let MDR = JSON.parse(fs.readFileSync('./response.json'));
console.log(Object.keys(MDR.users).length)
fs.writeFileSync('./response.json', JSON.stringify(MDR, null , 4));


const headers = {
    "HOST": "www.instagram.com",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
    "Accept": "*/*",
    "Accept-Language": "fr,qu;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
    "X-CSRFToken": "y9F4S6bLBVYI1O1228giGn0zoMAApEBr",
    "X-Instagram-AJAX": "1cb3c391e22f",
    "X-IG-App-ID": "936619743392459",
    "X-ASBD-ID": "437806",
    "X-IG-WWW-Claim": "hmac.AR0pMiY8rzKUZlPPbv8x5YD-YUMFcA6Ht8S__TqBUN9OyFus",
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Requested-With": "XMLHttpRequest",
    "Origin": "https://www.instagram.com",
    "DNT": "1",
    "Connection": "keep-alive",
    "Content-Length": "0",
    "TE": "Trailers",
    "cookie": `csrftoken=y9F4S6bLBVYI1O1228giGn0zoMAApEBr; mid=YF-O4AALAAHmOZ1TYuRVIaBf_j5G; ig_did=6DF9B383-D219-4ADD-89C5-25A1391DFDCD; ds_user_id=41961195089; shbid="18438\\05441961195089\\0541656637949:01f799619088a50454fc94e04d80264c4bdd1274b60067ea0540793ef8dd8d2b76af9dce"; shbts="1625101949\\05441961195089\\0541656637949:01f791d93090c5a5a22bbcd317c63205aa2c61613e11752ec428be16e7727df32b5393ca"; rur="VLL\\05441961195089\\0541656641146:01f77dd0150aa8afc8ee0729a3cac079520df792b506f9eefe61e707bb4b8b81cad63057"; sessionid=41961195089%3AsdANgDQzLgWjFo%3A22`
}

got.post("https://www.instagram.com/web/friendships/13752250447/follow/", {headers}).then(x => {
    var json = JSON.parse(x.body)
    if(json.result === "following"){
        console.log("Follow reussi")
    }else if (json.result === "requested"){
        console.log("Follow en attente")
    }else{
        console.log("ERROR réponse du site inconnu")
    }
}).catch(err => {
    console.log(err)
})