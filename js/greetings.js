const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const YOUR_NAME = "currentName",
    SHOWING = "showing";

const greetingText = ['행복한 하루 되세요', '오늘도 화이팅', '다 잘 될 거에요', '즐거운 하루 되세요', '당신은 최고에요', '아주 잘 하고 있어요', '기분 좋은 하루 되세요'];

const TEXT_NUMBER = greetingText.length;


function genRandom() {
    const number = Math.floor(Math.random() * greetingText.length);
    return number;
}

// 이름 저장하는 함수
function saveName(text) {
    localStorage.setItem(YOUR_NAME, text);
}


function handleSubmit(event) {
    // submit에 대한 기본값 해제
    event.preventDefault();
    const currentValue = input.value;
    paintingGreeting(currentValue);
    saveName(currentValue);
}


function askForName() {
    form.classList.add(SHOWING);
    form.addEventListener("submit", handleSubmit);
}

function paintingGreeting(text, num) {
    form.classList.remove(SHOWING);
    greeting.classList.add(SHOWING);
    greeting.innerText = `${greetingText[num]}, ${text} :) !`
}

function loadName() {
    const currentName = localStorage.getItem(YOUR_NAME);
    const randomNumber = genRandom();
    if (currentName === null) {
        askForName();
    } else {
        paintingGreeting(currentName, randomNumber);
    }
}

function init() {
    loadName();
}
init();