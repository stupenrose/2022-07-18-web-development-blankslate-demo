console.log("Hello world")

let introField = document.querySelector(".intro-field")
let button = document.querySelector("button")

button.onclick = function(){
    let intro = introField.value
    console.log("I can't believe you said " + intro)
}