
function voices() {
    for(let voice of SpeechSynthesis.getVoices()) {
        console.log(voice);
    }
}

speechSynthesis.addEventListener("voiceschanged", voices);
function convertText(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech); //spaek the speech/utternace
}

conversionBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    if(inputField.value !== "") {
        convertText(inputField.value);
        alert("i am segun");
    }
});