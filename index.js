import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://wearethechampions-9c220-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");


let textAreaforEndorsement = document.querySelector("#endorsement-text");
let publishBtn = document.querySelector("#publish-btn");

publishBtn.addEventListener("click", function() {
    let valueFromTextArea = textAreaforEndorsement.value;
    console.log(valueFromTextArea);
})