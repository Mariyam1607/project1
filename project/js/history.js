// TAB SLIDER

const tabContentBlocks = document.querySelectorAll(".tab_content_block")
const tabContentItems = document.querySelectorAll(".tab_content_item")
const tabContentItemsParent = document.querySelector(".tab_content_items")

let curIndex = 0


const hideTabContent = ()=> {
    tabContentBlocks.forEach(tabBlock => {
        tabBlock.style.display = "none"
    })
    tabContentItems.forEach(tabItem => {
        tabItem.classList.remove("tab_content_item_active")
    })
}
const showTabContent = (i = 0) => {
    tabContentBlocks[i].style.display = "block"
    tabContentItems[i].classList.add("tab_content_item_active")
}


hideTabContent()
showTabContent()

tabContentItemsParent.onmousemove = (event) => {
    if (event.target.classList.contains("tab_content_item")) {
        tabContentItems.forEach((tabItem, tabIndex) => {
            if (event.target === tabItem) {
                hideTabContent()
                showTabContent(tabIndex)
            }
        })
    }
}
const autoTabSlider = () => {
    curIndex++

    if (curIndex >= tabContentBlocks.length) {
        curIndex = 0
    }

    hideTabContent()
    showTabContent(curIndex)
}

setInterval(autoTabSlider, 3000)


// SLIDER

const cards = document.querySelectorAll(".card_treasures")

cards.forEach(card => {
    card.addEventListener("click", () => {

        cards.forEach(c => {
            c.classList.remove("active")
        })

        card.classList.add("active")

    })
})

// QUIZ //

const questions = [
    {
        question:"Какое качество тебе ближе?",
        answers:[
            {text:"Лидерство", role:"sultan"},
            {text:"Хитрость", role:"haseki"},
            {text:"Мудрость", role:"vizir"},
            {text:"Смелость", role:"warrior"}
        ]
    },

    {
        question:"Где бы ты чувствовал себя лучше?",
        answers:[
            {text:"На троне", role:"sultan"},
            {text:"В гареме", role:"haseki"},
            {text:"В совете дивана", role:"vizir"},
            {text:"На поле боя", role:"warrior"}
        ]
    },

    {
        question:"Что для тебя важнее?",
        answers:[
            {text:"Власть", role:"sultan"},
            {text:"Влияние", role:"haseki"},
            {text:"Стратегия", role:"vizir"},
            {text:"Честь", role:"warrior"}
        ]
    }
]
const questionEl = document.querySelector(".question")
const answersEl = document.querySelector(".answers")
const resultEl = document.querySelector(".result")
const progressBar = document.querySelector(".progress_bar")
const restartBtn = document.querySelector(".restart_btn")

let currentQuestion = 0

let score = {
    sultan:0,
    haseki:0,
    vizir:0,
    warrior:0
}

function showQuestion(){
    const q = questions[currentQuestion]

    questionEl.style.opacity = 0
    answersEl.style.opacity = 0

    setTimeout(()=>{

        questionEl.textContent = q.question
        answersEl.innerHTML = ""

        q.answers.forEach(answer=>{

            const btn = document.createElement("button")
            btn.textContent = answer.text

            btn.onclick = ()=>{
                score[answer.role]++
                nextQuestion()
            }
            answersEl.append(btn)
        })
        questionEl.style.opacity = 1
        answersEl.style.opacity = 1
    },300)
    updateProgress()
}
function nextQuestion(){
    currentQuestion++
    if(currentQuestion < questions.length){
        showQuestion()
    }else{
        showResult()
    }
}
function updateProgress(){
    const percent = (currentQuestion / questions.length) * 100
    progressBar.style.width = percent + "%"
}
function showResult(){
    answersEl.innerHTML = ""
    questionEl.textContent = "Результат"

    let maxRole = Object.keys(score).reduce((a,b)=>score[a]>score[b]?a:b)

    if(maxRole==="sultan"){
        resultEl.textContent="👑 Вы Султан — лидер Османской империи"
    }
    if(maxRole==="haseki"){
        resultEl.textContent="💎 Вы Хасеки султан — влиятельная женщина дворца"
    }
    if(maxRole==="vizir"){
        resultEl.textContent="📜 Вы Великий визирь — мудрый советник султана"
    }

    if(maxRole==="warrior"){
        resultEl.textContent="⚔ Вы Янычар — храбрый воин"
    }
    restartBtn.style.display = "inline-block"
    progressBar.style.width = "100%"
}
restartBtn.onclick = () => {
    currentQuestion = 0
    score = {
        sultan:0,
        haseki:0,
        vizir:0,
        warrior:0
    }
    resultEl.textContent=""
    restartBtn.style.display="none"

    showQuestion()
}
showQuestion()

// CONVERTER

// const somInput = document.querySelector("#som")
// const usdInput = document.querySelector("#usd")
// const tlInput = document.querySelector("#tl")
//
// const converter = (element, targetElement1, targetElement2) => {
//     element.oninput = () => {
//         const request = new XMLHttpRequest()
//         request.open("GET", "/data/converter.json")
//         request.setRequestHeader("Content-type", "application/json")
//         request.send()
//
//         request.onload = () => {
//             const  data = JSON.parse(request.response)
//
//             if (element.id === "som") {
//                 targetElement1.value = (element.value / data.usd).toFixed(2)
//                 targetElement2.value = (element.value / data.tl).toFixed(2)
//
//             }
//             if (element.id === "usd") {
//                 targetElement1.value = (element.value * data.usd).toFixed(2)
//                 targetElement2.value = ((element.value * data.usd) / data.tl).toFixed(2)
//             }
//
//             if (element.id === "tl") {
//                 targetElement1.value = (element.value * data.tl).toFixed(2)
//                 targetElement2.value = ((element.value * data.tl) / data.usd).toFixed(2)
//             }
//             if (!element.value) { somInput.value = usdInput.value = tlInput.value = "" }
//
//         }
//     }
// }
// converter(somInput, usdInput, tlInput)
// converter(usdInput, somInput, tlInput)
// converter(tlInput, somInput, usdInput)

/////

const video = document.querySelector("#player");

function playVideo() {
    video.play();
}

function pauseVideo() {
    video.pause();
}

