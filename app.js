console.log("Hello world")

let loadingPanel = document.querySelector(".loading-panel")
let introPanel = document.querySelector(".intro-panel")
let gamePanel = document.querySelector(".game-panel")
let userNameArea = gamePanel.querySelector(".user-name-area")
let introField = document.querySelector(".intro-field")
let choosePlayerAButton = document.querySelector(".choose-player-a-button")
let choosePlayerBButton = document.querySelector(".choose-player-b-button")

let availableImages = [
    "person1.gif",
    "person2.gif",
    "person3.gif",
    "person4.gif",
]

function makeCharacter(id, image){
    let imageTag = document.createElement("img")
    imageTag.src = image
    imageTag.setAttribute("class", "person")

    let character = {
        id:id,
        imageName:image,
        image:imageTag,
        velocity:0,
        position:(window.visualViewport.width / 2)
    }

    gamePanel.appendChild(imageTag)
    characters.push(character)

    return character
}

let player;
let characters = [];
let myName = "??"

holler.onLoad(()=>{

    holler.me((user)=>{
        loadingPanel.style.display="none"
        introPanel.style.display="block"

        availableImages.forEach(image=>{
            let button = document.createElement("img")
            button.classList = "character-option"
            button.src = image

            button.onclick = ()=>{
                startGame(image)
            }

            introPanel.appendChild(button)
        })

        console.log("user stuff is", user)
        userNameArea.textContent = user.name
        myName = user.name
    })

    holler.onClientEvent(message=>{
        console.log(`Client event received: ${message}`)
        let playerUpdate = JSON.parse(message)

        if(playerUpdate.id != player?.id){

            let otherPlayer = characters.find(o=>o.id == playerUpdate.id)
            if(!otherPlayer){
                otherPlayer = makeCharacter(playerUpdate.id, playerUpdate.imageName)
            }

            otherPlayer.position = playerUpdate.position
            otherPlayer.velocity = playerUpdate.velocity
            setPosition(otherPlayer)
        }
    })

    function startGame(imageName){
        player = makeCharacter(myName + "-" + imageName, imageName)
        gamePanel.style.display = "block"
        introPanel.style.display = "none"
        console.log("player is", player)
    }

    document.onkeydown = (keyEvent)=>{
        console.log("Keypressed: " + keyEvent.key)
        switch(keyEvent.key){
            case "a": 
            case "ArrowLeft":
                player.velocity = player.velocity -1
                break;
            case "d": 
            case "ArrowRight":
                player.velocity = player.velocity +1
                break;
        }
        console.log("Current velocity is", player.velocity)

    }

    function setPosition(player){
        if(player){
            player.image.style.left = player.position + "px"
        }
    }

    const doNextFrame = ()=>{
        
        characters.forEach(character=>{
            character.position = character.position + character.velocity
            setPosition(character)
        })

        setTimeout(doNextFrame)
    }

    doNextFrame()



    const sendPosition = ()=>{
        if(player){
            holler.appInstance.notifyClients(JSON.stringify({
                id:player.id,
                position:player.position,
                velocity:player.velocity,
                imageName:player.imageName
            }))
        }
        setTimeout(sendPosition, 10)
    }
    sendPosition()
})

