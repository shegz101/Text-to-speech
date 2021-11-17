const inputField = document.getElementById("inputMe");
let voiceList = document.querySelector("select");
const conversionBtn = document.getElementById("convertSpeech");

let synth = speechSynthesis,
isSpeaking = true;

voices();

function voices() {
    for(let voice of synth.getVoices()) {
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend",option);
    }
}

synth.addEventListener("voiceschanged", voices);

conversionBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    if(inputField.value !== "") {
        if(!synth.speaking){
            convertText(inputField.value);
        }
        if(inputField.value.lenght > 60){
             if(isSpeaking) {
                 synth.resume();
                 isSpeaking = false;
                 conversionBtn.innerHTML = "Pause Speech";
             }else{
                 synth.pause();
                 isSpeaking = true;
                 conversionBtn.innerHTML = "Resume Speech";
             }

             setInterval(() => {
                      if(!synth.speaking && !isSpeaking){
                          isSpeaking = true;
                          conversionBtn.innerText = "Convert To Speech";
                      }
             });
        }else{
            conversionBtn.innerText = "Convert To Speech";
        }
    }
});

function convertText(text) {
    let speech = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()) {
        if(voice.name === voiceList.value) {
            speech.voice = voice;
        }
    }
    synth.speak(speech); //spaek the speech/utternace
}
