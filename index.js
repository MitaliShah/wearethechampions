import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://wearethechampions-9c220-default-rtdb.firebaseio.com/"
}
// Firebase initial setup
const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");

// Getting the values from elements
let textAreaforEndorsement = document.querySelector("#endorsement-text");
let publishBtn = document.querySelector("#publish-btn");
let allEndorsementsContainer = document.querySelector(".endorsements-container");
let fromInput = document.querySelector("#input-field-from");
let toInput = document.querySelector("#input-field-to");

// Event listener that would check if the input values exisits and if they do it would push the data to the database using the push method.
publishBtn.addEventListener("click", function() {
    let valueFromTextArea = textAreaforEndorsement.value;
    let valueFromInput = fromInput.value;
    let valueToInput = toInput.value;

    if(!valueFromTextArea || !valueFromInput || !valueToInput){
        alert("Please add Endorsement, From and To");
        return;
    }
    push(endorsementsInDB, {valueFromTextArea, valueFromInput, valueToInput});

    clearTextAreaforEndorsement();
})

// onValue event Will trigger once with the initial data and each time the data changes.
onValue(endorsementsInDB, handleValues);

// 
function handleValues(snapshot) {
    if(snapshot.exists()){
        allEndorsementsContainer.innerHTML = "";
        let endorsementsArray = Object.entries(snapshot.val()).reverse();

        clearEndorsementsContainer();
        for(let i = 0; i < endorsementsArray.length; i++){
            let currentendorsement = endorsementsArray[i];           
            let currentEndorsementID = currentendorsement[0];
            let currentEndorsementValue = currentendorsement[1];

            const { valueFromTextArea, valueFromInput, valueToInput } = currentEndorsementValue;

            appendEndorsementListToParagraph(currentEndorsementID,valueFromTextArea, valueFromInput, valueToInput)
        }
    }    else {
        allEndorsementsContainer.innerHTML = `No Endorsements yet.`;
    }
}

function clearEndorsementsContainer(){
    allEndorsementsContainer.innerHTML = ``;
}

function clearTextAreaforEndorsement() {
    textAreaforEndorsement.value = "";
    fromInput.value = "";
    toInput.value = "";
}

function appendEndorsementListToParagraph(id,valueFromTextArea, valueFromInput, valueToInput) {

    let newPara = document.createElement("section");
    newPara.innerHTML = `        
        <h6>From: ${valueFromInput}</h6>
        <p>${valueFromTextArea}</p>
        <h6>To: ${valueToInput}</h6>
    `
    newPara.addEventListener("dblclick", function() {
        let exactLocationOfEndorsementToRemove = ref(database, `endorsements/${id}`);
        remove(exactLocationOfEndorsementToRemove);
    })

    allEndorsementsContainer.append(newPara);
}
