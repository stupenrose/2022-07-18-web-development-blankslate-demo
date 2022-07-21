console.log("Hello world")

let introField = document.querySelector(".intro-field")
const sendMessageResponseArea = document.querySelector('.response-to-send-message')
let button = document.querySelector("button")
let player = document.querySelector(".person")

button.onclick = function(){
    let intro = introField.value
    let message = "I can't believe you said " + intro
    console.log(message)


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

let position = window.visualViewport.width / 2
let velocity = 0


let showVelocityWarnings = ()=>{
    let velocityMessage
    let velocityMessageColor

    if(velocity>5 || velocity < -5){
        velocityMessage = "Hyper speed!"
        velocityMessageColor = "red"
    }else if(velocity>2 || velocity < -2){
        velocityMessage = "Speed demon!"
        velocityMessageColor = "yellow"
    }else{
        velocityMessage = ""
        velocityMessageColor = "none"
    }
    sendMessageResponseArea.textContent = velocityMessage
    sendMessageResponseArea.style["background"] = velocityMessageColor
}

document.onkeydown = (keyEvent)=>{
    console.log("Keypressed: " + keyEvent.key)
    switch(keyEvent.key){
        case "a": 
        case "ArrowLeft":
            velocity = velocity -1
            break;
        case "d": 
        case "ArrowRight":
            velocity = velocity +1
            break;
    }
    console.log("Current velocity is", velocity)

    showVelocityWarnings()
}


const doNextFrame = ()=>{
    position = position + velocity
    player.style.left = position + "px"
    setTimeout(doNextFrame)
}

doNextFrame()