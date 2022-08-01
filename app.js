console.log("Hello world")

let loadingPanel = document.querySelector(".loading-panel")
let introPanel = document.querySelector(".intro-panel")
let gamePanel = document.querySelector(".game-panel")
let userNameArea = gamePanel.querySelector(".user-name-area")
let introField = document.querySelector(".intro-field")
let choosePlayerAButton = document.querySelector(".choose-player-a-button")
let choosePlayerBButton = document.querySelector(".choose-player-b-button")
let playerA = document.querySelector(".person-a")
let playerB = document.querySelector(".person-b")

let playerSlot;
let player;
let otherPlayer;


holler.onLoad(()=>{

    holler.me((user)=>{
        loadingPanel.style.display="none"
        introPanel.style.display="block"
        console.log("user stuff is", user)
        userNameArea.textContent = user.name
    })

    holler.onClientEvent(event=>{
        console.log(`Client event received: ${event}`)
        if(event.indexOf(playerSlot) == -1){
            let newPositionOtherPlayer = parseInt(event)
            setPosition(otherPlayer, newPositionOtherPlayer)
        }
    })

    function startGame(chosenPlayer){
        playerSlot = chosenPlayer
        if(playerSlot == "a"){
            player = playerA
            otherPlayer = playerB
        }else{
            player = playerB
            otherPlayer = playerA
        }
        gamePanel.style.display = "block"
        introPanel.style.display = "none"
        console.log("player is", playerSlot, player)
    }

    choosePlayerAButton.onclick = function(){
        startGame("a")
    }

    choosePlayerBButton.onclick = function(){
        startGame("b")
    }

    let position = window.visualViewport.width / 2
    let velocity = 0

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

    }

    function setPosition(player, position){
        if(player){
            player.style.left = position + "px"
        }
    }

    const doNextFrame = ()=>{
        let oldPosition = position
        position = position + velocity
        setPosition(player, position)

        if(oldPosition!==position){
            holler.appInstance.notifyClients(position + " " + playerSlot)
        }
        setTimeout(doNextFrame)
    }

    doNextFrame()
})

