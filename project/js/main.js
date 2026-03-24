
const innerHeader = document.querySelector(".inner_header");
window.addEventListener("scroll", () =>{
    if (window.scrollY > 50){
        innerHeader.style.backdropFilter = "blur(15px)";
        innerHeader.style.borderRadius = "12px";
        innerHeader.style.background = "rgba(10,10,10,0.95)";
        innerHeader.style.boxShadow = "0 5px 25px rgba(0,0,0,0.6)";
        innerHeader.style.borderBottom = "1px solid rgba(212,175,55,0.6)";
    } else{
        innerHeader.style.background = "linear-gradient(to bottom, rgba(15,15,15,0.9), rgba(15,15,15,0.6))";
        innerHeader.style.boxShadow = "none";
        innerHeader.style.borderBottom = "1px solid rgba(212,175,55,0.3)";
    }
})


// RANDOM COLOR GENERATOR

const buttonsColor = document.querySelectorAll('.btn-color')
const javaScript = document.querySelector('#js-color')

const generateRandomColor = () => {
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

const setRandomColors = () => {
    buttonsColor.forEach((buttonColor) => {
        buttonColor.innerHTML = generateRandomColor()
        buttonColor.onclick = (event) => {
            javaScript.style.color = event.target.innerHTML
        }
    })
}

window.onload = () => setRandomColors()
window.onkeydown = (event) => {
    if (event.code.toLowerCase() === 'space') {
        event.preventDefault()
        setRandomColors()
    }
}


// SLIDER BLOCK

const personages = [
    {
        name: "Хюррем Султан",
        role: "Хасеки Султан",
        description: "Одна из самых влиятельных женщин Османской империи.",
        img: "https://n1s1.hsmedia.ru/a5/e1/86/a5e186f9c0cac7a17a44ee0ad1548113/1000x745_0xac120003_8935326591606225225.jpg",
    },
    {
        name: "Сулейман Великолепный",
        role: "Султан Османской империи",
        description: "Величайший правитель XVI века.",
        img: "https://kulturologia.ru/files/u19001/Sultan_Suleiman-1.jpg",
    },
    {
        name: "Ибрагим Паша",
        role: "Великий визирь",
        description: "Близкий друг и советник султана.",
        img: "https://static.kinoafisha.info/k/articles/1200/upload/articles/423901697125.jpg"
    },
    {
        name: "Махидевран Султан",
        role: "Мать Мустафы",
        description: "Главная соперница Хюррем в борьбе за влияние во дворце.",
        img: "https://s2.stc.all.kpcdn.net/putevoditel/serialy/wp-content/uploads/2021/01/5792d77d2e0c71e9922d46c330d3696d-1024x739.jpg"
    },
    {
        name: "Шехзаде Мустафа",
        role: "Старший сын Сулеймана и Махидевран",
        description: "Жертва дворцовых интриг.",
        img: "https://sultan-tv.ru/wp-content/uploads/2019/09/0005PSEE5SNUAVLD-C122-F4.jpg"
    },
    {
        name: "Михримах Султан",
        role: "Дочь Сулеймана и Хюррем",
        description: "Верная дочь Хюррем, активно участвующая в политических решениях своей семьи.",
        img: "https://sultan-tv.ru/wp-content/uploads/2019/03/rKHXaxM-E7E-1-1.jpg"
    },
    {
        name: "Шехзаде Мехмед",
        role: "Старший сын Сулеймана и Хюррем",
        description: "Считался главным наследником престола.",
        img: "https://sun9-48.userapi.com/impg/HKK4VYHO2G4_-Kmo-7qp_F5-4af4CFzm0sZ4gw/GkYFL9leAek.jpg?size=600x548&quality=95&sign=2cbf4452e9cef33bdeb602cd6e8c2f5b&type=album"
    },
    {
        name: "Селим II",
        role: "Средний сын Хюррем",
        description: "Стал султаном после Сулеймана, но не такой сильный правитель, как отец.",
        img: "https://bulavochki.ru/wp-content/uploads/2019/06/selim.jpg"
    },
    {
        name: "Шехзаде Баязид",
        role: "Средний сын Хюррем",
        description: "Вступил в борьбу за престол со своим братом Селимом. Потерпел поражение и был казнен.",
        img: "https://s13.stc.all.kpcdn.net/putevoditel/serialy/wp-content/uploads/2024/10/result_111-5-1024x576.jpg"
    },
    {
        name: "Шехзаде Джихангир",
        role: "Младший сын Хюррем",
        description: "Отличался от всех мягким характером и слабым здоровьем. Был близок к отцу, на престол не претендовал.",
        img: "https://s9.stc.all.kpcdn.net/putevoditel/serialy/wp-content/uploads/2024/10/0-4-1024x576.jpg"
    }
];

const card = document.querySelector('.personage-card')
const next = document.querySelector('#next')
const prev = document.querySelector('#prev')

const sliderBlock = document.querySelector('.slider_block');
let currentIndex = 0

function showPersonage(index){
    const personage = personages[index]

    sliderBlock.style.backgroundImage = `url(${personage.img})`;

    card.style.opacity = 0;
    card.style.transform = "translateX(30px)";

    setTimeout(() => {
        card.innerHTML = `
      <img src="${personage.img}" alt="${personage.name}">
      <h3>${personage.name}</h3>
      <p>${personage.role}</p>
      <p>${personage.description}</p>
    `;
        card.style.opacity = 1;
        card.style.transform = "translateX(0)";
    }, 400);
}

function startAutoSlide() {
    return setInterval(() => {
        currentIndex++;

        if (currentIndex >= personages.length) {
            currentIndex = 0;
        }

        showPersonage(currentIndex);
    }, 5000);
}

let autoSlide = startAutoSlide();

function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = startAutoSlide();
}

prev.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = personages.length - 1;
    }
    showPersonage(currentIndex);
    resetAutoSlide();
});

next.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= personages.length) {
        currentIndex = 0;
    }
    showPersonage(currentIndex);
    resetAutoSlide();
});

showPersonage(currentIndex)

//CHRONICLE//

const btn = document.querySelectorAll(".buttons button");

const stories = {
    love:`В 1520 году Сулейман взошёл на престол. Его называли справедливым правителем, повелителем трёх континентов.
Во дворце появилась девушка - Александра. Султан дал ей новое имя — Хюррем. Она была первой женщиной,
ради которой султан нарушил традиции и заключил официальный брак. Этот брак изменил традиции, законы и судьбы наследников.`,
    power: `Любовь Сулеймана и Хюррем стала легендой. Но за этой легендой скрывались годы интриг, предательства и борьбы за трон.
Братья становились соперниками. Матери — стратегами. Дети — пешками в политической игре. Империя росла. Семья разрушалась.`,
    facts: `• Сулейман был не только правителем, но и поэтом.
• Хюррем стала первой женщиной в истории Османской империи, которая официально вышла замуж за султана.
• При Сулеймане империя достигла максимального территориального расширения.`
}

let typingTimeout;
let isTyping = false;
let isOpen = false;
let currentType = null;

function openScroll(type) {
    const scroll = document.querySelector("#scroll");
    const textElement = document.querySelector("#scroll-text");
    const feather = document.getElementById("feather");

    if (isOpen && currentType === type) {
        clearTimeout(typingTimeout);
        isTyping = false;

        scroll.classList.remove("open");
        textElement.textContent = "";
        feather.style.opacity = "0";

        isOpen = false;
        currentType = null;
        return;
    }

    clearTimeout(typingTimeout);
    isTyping = false;

    scroll.classList.add("open");
    textElement.textContent = "";
    feather.style.opacity = "1";

    const text = stories[type];
    let i = 0;
    isTyping = true;
    isOpen = true;
    currentType = type;

    function typeWriter() {
        if (!isTyping) return;

        if (i < text.length) {
            textElement.textContent += text[i];

            const range = document.createRange();
            range.selectNodeContents(textElement);
            range.setStart(textElement.firstChild, i);
            const rect = range.getBoundingClientRect();
            const containerRect = scroll.getBoundingClientRect();

            feather.style.left = rect.right - containerRect.left + "px";
            feather.style.top = rect.bottom - containerRect.top - 20 + "px";

            i++;
            typingTimeout = setTimeout(typeWriter, 25);
        } else {
            isTyping = false;
        }
    }
    setTimeout(typeWriter, 800);
}
