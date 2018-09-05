const fetch = require("node-fetch");

const endPoint = process.env.API_URL || "http://127.0.0.1:3005";

// fetch all closed dossiers
const url = `${endPoint}/dump?filters={%22dossier.state%22:%22closed%22}`;

const getFieldValue = (champs, libelle) => {
  const field = champs.find(f => f.type_de_champ.libelle === libelle);
  return field && field.value;
};

const getPublicFieldValue = (doc, libelle) =>
  getFieldValue(doc.dossier.champs, libelle);

const getPrivateFieldValue = (doc, libelle) =>
  getFieldValue(doc.dossier.champs_private, libelle);

const hasExpired = doc => {
  const endDate = getPrivateFieldValue(doc, "Date de fin APT");
  return endDate && new Date(endDate) < new Date();
};

// show only 2nd char and spaces
const obfuscate = string =>
  string
    .trim()
    .split("")
    .reduce((str, char, i) => str + (i === 1 || char === " " ? char : "*"), "");

// filter out publicable values
const extractPublicData = doc => ({
  ds_id: doc.dossier.id,
  siret: doc.dossier.etablissement.siret,
  prenom: obfuscate(getPublicFieldValue(doc, "Prénom")),
  nom: obfuscate(getPublicFieldValue(doc, "Nom")),
  date_de_naissance: getPublicFieldValue(doc, "Date de naissance"),
  has_expired: hasExpired(doc),
  date_de_debut_apt: getPrivateFieldValue(doc, "Date de début APT"),
  date_de_fin_apt: getPrivateFieldValue(doc, "Date de fin APT")
});

const extractDocs = docs => docs.result.map(extractPublicData);

const publicData = fetch(url, {
  headers: {
    Authorization: process.env.TOKEN
  }
})
  .then(r => r.json())
  .then(extractDocs);

publicData.then(data => console.log(JSON.stringify(data, null, 2)));
