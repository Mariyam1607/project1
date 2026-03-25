const characters = [
    "hurrem",
    "suleyman",
    "ibrahim",
    "mahidevran",
    "mihrimah",
    "selim",
    "mustafa",
    "hatice",
    "rustem",
    "bali_bey"
]

const matchSound = new Audio("sounds/match.mp3")

const game = document.querySelector("#game")

let firstCard = null
let secondCard = null
let moves = 0
let time = 0
let matched = 0
let level = 12
let timer = null

const movesEl = document.querySelector("#moves")
const timeEl = document.querySelector("#time")


document.querySelectorAll(".levels button").forEach(btn=>{
    btn.addEventListener("click",()=>{
        level = +btn.dataset.level
        startGame()
    })
})

function startGame(){

    clearInterval(timer)

    matched = 0
    moves = 0
    time = 0

    movesEl.textContent = 0
    timeEl.textContent = 0

    let selected = characters.slice(0, level/2)
    let cards = [...selected, ...selected]

    cards.sort(()=>Math.random()-0.5)
    createGame(cards)
    startTimer()
}

function createGame(cards){

    game.innerHTML = ""
    cards.forEach(name=>{
        const card = document.createElement("div")

        card.classList.add("card")

        card.dataset.name = name
        card.innerHTML = `
        <div class="front"></div>
        <div class="back">
        <img src="images/${name}.jpg">
        </div>
        `

        card.addEventListener("click",flipCard)

        game.appendChild(card)
    })
}
function flipCard(){

    if(this === firstCard) return
    this.classList.add("flip")
    if(!firstCard){
        firstCard = this
    }else{
        secondCard = this
        moves++
        movesEl.textContent = moves

        checkMatch()
    }
}
function checkMatch(){

    if(firstCard.dataset.name === secondCard.dataset.name){

        matchSound.play()

        matched += 2

        firstCard = null
        secondCard = null

        if(matched == level){
            showWin()
        }

    }else{

        setTimeout(()=>{

            if(firstCard && secondCard){
                firstCard.classList.remove("flip")
                secondCard.classList.remove("flip")
            }


            // firstCard.classList.remove("flip")
            // secondCard.classList.remove("flip")

            firstCard = null
            secondCard = null

        },1000)

    }

}

function startTimer(){

    clearInterval(timer)

    timer = setInterval(()=>{

        time++

        timeEl.textContent = time

    },1000)

}

function showWin(){

    clearInterval(timer)

    document.querySelector("#win").style.display = "flex"

    document.querySelector("#winMoves").textContent = moves

    document.querySelector("#winTime").textContent = time

}

function restartGame(){

    document.querySelector("#win").style.display = "none"

    clearInterval(timer)

    time = 0
    moves = 0
    matched = 0

    movesEl.textContent = 0
    timeEl.textContent = 0

    game.innerHTML = ""

}