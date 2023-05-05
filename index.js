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
let allEndorsementsContainer = document.querySelector(".endorsements-container");

publishBtn.addEventListener("click", function() {    
    let valueFromTextArea = textAreaforEndorsement.value;
    if(!valueFromTextArea){
        alert("Please add Endorsement");
        return;
    }
    push(endorsementsInDB, valueFromTextArea);
    clearTextAreaforEndorsement();
})

onValue(endorsementsInDB, function(snapshot) {
    if(snapshot.exists()){
        let endorsementsArray = Object.entries(snapshot.val());

        clearEndorsementsContainer();

        for(let i = 0; i < endorsementsArray.length; i++){
            let currentendorsement = endorsementsArray[i];
            let currentEndorsementID = currentendorsement[0];
            let currentEndorsementValue = currentendorsement[1]
            appendEndorsementListToParagraph(currentEndorsementID,currentEndorsementValue)
        }
    }    else {
        allEndorsementsContainer.innerHTML = `No Endorsements yet.`;
    }
})

function clearEndorsementsContainer(){
    allEndorsementsContainer.innerHTML = ``;
}

function clearTextAreaforEndorsement() {
    textAreaforEndorsement.value = "";
}

function appendEndorsementListToParagraph(id,value) {
    let newPara = document.createElement("p");
    newPara.textContent = value;

    newPara.addEventListener("click", function() {
        let exactLocationOfEndorsementToRemove = ref(database, `endorsements/${id}`);
        remove(exactLocationOfEndorsementToRemove);
    })

    allEndorsementsContainer.append(newPara);
}
