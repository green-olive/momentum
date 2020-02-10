const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const YOUR_NAME = "currentName",
    SHOWING = "showing";

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

function paintingGreeting(text) {
    form.classList.remove(SHOWING);
    greeting.classList.add(SHOWING);
    greeting.innerText = `Have a Nice Day, ${text} :) !`
}

function loadName() {
    const currentName = localStorage.getItem(YOUR_NAME);
    if (currentName === null) {
        askForName();
    } else {
        paintingGreeting(currentName);
    }
}

function init() {
    loadName();
}
init();