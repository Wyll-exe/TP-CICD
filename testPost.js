// OBJETS
const words = ["abacule", "baliverne", "calembredaine", "dégingandé", "effluve", "faribole", "grimoire", "histrion", "inexorable", "jocrisse", "kakistocratie", "létal", "mélancolie", "nécropole", "opalescent", "quolibet", "rhododendron", "sépulcral", "tintinnabuler", "ubiquité", "vespéral", "xylophage", "zéphyr"];


function random() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

const randomWord = random();

fetch('http://localhost:3000/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word: randomWord })
})
.then(response => response.json())
.then(data => console.log("Objet ajouté :", data))
.catch(error => console.error("Erreur !", error));
