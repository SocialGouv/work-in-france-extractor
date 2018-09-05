const fetch = require("node-fetch");

const endPoint = process.env.API_URL || "http://127.0.0.1:3005";

// fetch all closed dossiers
const url = `${endPoint}/stats`;

const publicData = fetch(url).then(r => r.json());

publicData.then(data => console.log(JSON.stringify(data, null, 2)));
