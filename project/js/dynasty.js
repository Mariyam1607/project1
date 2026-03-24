
const dynasty = [
    {
        sultan: "Селим I",
        sultanImg:"https://s1.stc.all.kpcdn.net/putevoditel/serialy/wp-content/uploads/2022/07/m_0-7.jpg",

        wife: "Айше Хафса",
        wifeImg:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvGB2BgDw847NMGchvQLaCO-6LYNiU6BH20Q&s"
    },
    {
        sultan: "Сулейман",
        sultanImg: "https://citaty.info/files/characters/68939.jpg",

        wife: "Хюррем Султан",
        wifeImg: "https://static.wikia.nocookie.net/muhtesemyuzyil/images/a/ac/%D0%A5%D1%8E%D1%80%D1%80%D0%B5%D0%BC%D0%B0%D0%B2%D0%B01.jpg/revision/latest?cb=20210328103214&path-prefix=ru"
    },
    {
        sultan: "Селим II",
        sultanImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGJcWLGV2sPycsC3l2jMrWgmxlRsh2V-Y6Yw&s",

        wife: "Нурбану Султан",
        wifeImg: "https://img.wattpad.com/0375ac65f9b5f9a7fc1c5d7091353a49e06fc387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f34316f72523745525556657668413d3d2d34372e313632393661646237646536353335373535333635353831343938322e6a7067"
    },
    {
        sultan: "Мурад III",
        sultanImg: "https://s16.stc.all.kpcdn.net/putevoditel/serialy/wp-content/uploads/2020/10/Screenshot_2020-10-20-SHehzade-Murad-syn-Nurbanu-1-tys-izobrazhenii-nai-deno-v-YAndeks-Kartinkah.jpg",

        wife: "Сафие Султан",
        wifeImg: "https://static.wikia.nocookie.net/muhtesemyuzyil/images/3/3f/Safiye_Sultan.jpg/revision/latest/scale-to-width-down/1200?cb=20170510074945&path-prefix=ru"
    }
]

const tree = document.querySelector("#dynasty_tree")

dynasty.forEach((couple,index)=>{

    const row = document.createElement("div")
    row.className = "dynasty-row"

    row.innerHTML = `
<div class="person">
    <img src="${couple.sultanImg}" alt="">
    <p class="person-name">${couple.sultan}</p>
</div>

<div class="person">
    <img src="${couple.wifeImg}" alt="">
    <p class="person-name">${couple.wife}</p>
</div>
`
    tree.appendChild(row)


    if(index < dynasty.length-1){

        const line = document.createElement("div")
        line.className = "dynasty-line"

        tree.appendChild(line)

    }

})

const rows = document.querySelectorAll(".dynasty-row")

function revealDynasty(){

    rows.forEach((row,i)=>{
        const position = row.getBoundingClientRect().top

        if(position < window.innerHeight - 100){
            setTimeout(()=>{
                row.classList.add("show")
            }, i * 300)
        }
    })
}
window.addEventListener("scroll", revealDynasty)
revealDynasty()


// move block

const parentBlock = document.querySelector(".parent_block")
const childBlock = document.querySelector(".child_block")
const compass = document.querySelector(".compass")
const arrow = document.querySelector(".route-arrow")

let pos = 0

let angle = 0

let posX = 0
let posY = 0

let direction = "right"

const maxWidth = parentBlock.clientWidth - childBlock.offsetWidth
const maxHeight = parentBlock.clientHeight - childBlock.offsetHeight

const moveBlock = () => {
    if(direction === "right"){
        posX++
        if(posX >= maxWidth){
            direction = "down"
        }
    }
    else if(direction === "down"){
        posY++
        if(posY >= maxHeight){
            direction = "left"
        }
    }
    else if(direction === "left"){
        posX--
        if(posX <= 0){
            direction = "up"
        }
    }
    else if(direction === "up"){
        posY--
        if(posY <= 0){
            direction = "right"
        }
    }
    childBlock.style.left = posX + "px"
    childBlock.style.top = posY + "px"

    requestAnimationFrame(moveBlock)
}
moveBlock()

setInterval(() => {
    angle += 1
    compass.style.transform = `rotate(${angle}deg)`
}, 40)

document.addEventListener("mousemove", (e) => {
    const x = e.clientX
    const y = e.clientY

    const rect = compass.getBoundingClientRect()

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI

    compass.style.transform = `rotate(${angle}deg)`
})
setInterval(() => {
    pos += 1
    arrow.style.transform = `translateX(${pos}px)`
    if  (pos> 40) {
        pos = 0
    }
}, 80)

// STOP WATCH

const questions = [
    {
        question:"Кто был султаном во время расцвета Османской империи?",
        answers:["Сулейман I","Осман I","Мехмед II","Селим III"],
        correct:0
    },
    {
        question:"В каком году взяли Константинополь?",
        answers:["1453","1500","1520","1400"],
        correct:0
    },
    {
        question:"Кто основал Османскую империю?",
        answers:["Баязид","Осман I","Мурат","Селим I"],
        correct:1
    },
    {
        question:"Как звали жену Сулеймана?",
        answers:["Айше","Махидевран","Хюррем","Фатьма"],
        correct:2
    },
    {
        question:"Столица Османской империи после 1453 г.?",
        answers:["Бурса","Стамбул","Измир","Анкара"],
        correct:1
    },
]
const questionText = document.querySelector("#question")
const buttons = document.querySelectorAll(".answer")

const start = document.querySelector("#start")
const seconds = document.querySelector("#seconds")

let currentQuestion = 0
let score = 0
let time = 10
let timer

let gameStarted = false

function showQuestion(){

    const q = questions[currentQuestion]
    questionText.textContent = q.question
    buttons.forEach((btn,index) => {
        btn.textContent = q.answers[index]
    })
    startTimer ()
}
function startTimer () {

    clearInterval(timer)

    time = 10
    seconds.textContent = time

    timer = setInterval(() => {
        time --
        seconds.textContent = time

        if (time === 0) {
            clearInterval(timer)
            nextQuestion ()
        }
    }, 1000)
}
function nextQuestion () {
    currentQuestion ++

    if (currentQuestion < questions.length) {
        showQuestion()
    } else {
        showResult ()
    }
}
buttons.forEach((btn,index) => {
    btn.addEventListener("click", () => {

        clearInterval(timer)

        if (!gameStarted) return

        const correct = questions[currentQuestion].correct

        if (index === correct) {
            btn.style.background = "green"
            score ++
        }else {
            btn.style.background = "red"
            buttons[correct].style.background = "green"
        }
        setTimeout(() => {
            buttons.forEach(button => {
                button.style.background = ""
            })
            currentQuestion ++

            if (currentQuestion < questions.length) {
                showQuestion()
            }else {
                showResult()
            }
        }, 1000)
    })
})
function  showResult () {

    clearInterval(timer)
    gameStarted = false

    questionText.textContent = `Ваш результат: ${score} из ${questions.length}`
    buttons.forEach(btn => {
        btn.style.display = "none"
    })
}
start.onclick = () => {
    gameStarted = true
    currentQuestion = 0
    score = 0

    buttons.forEach(btn => {
        btn.style.display = "block"
    })
    showQuestion()
    startTimer()
}

