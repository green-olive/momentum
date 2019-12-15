const container = document.querySelector(".container"),
    title = container.querySelector("h1");


function whatTimeIs() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    title.innerText = `${hours < 10 ? `0${hours}` : `${hours}`} : ${minutes < 10 ? `0${minutes}` : `${minutes}`} : ${seconds < 10 ? `0${seconds}` : `${seconds}`}`;

}

function init() {
    whatTimeIs();
    setInterval(whatTimeIs, 1000);
}
init();