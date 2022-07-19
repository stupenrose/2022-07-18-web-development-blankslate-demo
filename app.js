console.log("Hello world")

let introField = document.querySelector(".intro-field")
let button = document.querySelector("button")

button.onclick = function(){
    let intro = introField.value
    let message = "I can't believe you said " + intro
    console.log(message)

    const sendMessageResponseArea = document.querySelector('.response-to-send-message')

    sendMessageResponseArea.textContent = message
}

console.log("document is ", document)
const stopButton = document.querySelector('.stop-button')
const startButton = document.querySelector('.start-button')

// startButton.innerText = "fooo"
// startButton.style["background"] = "green"

startButton.onclick = function() {
    const buttonMessage = document.querySelector('.start-message')
    buttonMessage.textContent = "santa cruz.  how you doin?"
    buttonMessage.style["background"] = "green"
    buttonMessage.style["color"] = "white"
}

stopButton.onclick = function() {

    const otherMessage = document.querySelector('.end-message')
    otherMessage.textContent = "teenagers smell"
}