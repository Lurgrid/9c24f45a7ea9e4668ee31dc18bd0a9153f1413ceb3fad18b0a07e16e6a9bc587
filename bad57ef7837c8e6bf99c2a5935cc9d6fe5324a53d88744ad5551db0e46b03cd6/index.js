const Instagram = require('instagram-web-api')
const fs = require('fs');
//fs.writeFileSync('./cible/cible.json', JSON.stringify(cible, null , 4));

const username = "edouard.haddag@gmail.com"
const password = "1618Lu.Lu@Grid17"
const client = new Instagram({ username, password })
client
  .login()
  .then(() => {
    client
      .getProfile()
      .then(console.log)
  })
  