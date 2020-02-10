const container = document.querySelector(".container"),
    title = container.querySelector("#clock-text"),
    dateText = document.querySelector("#date-text"),
    dayText = document.querySelector("#day-text");


function whatTimeIs() {
    const now = new Date();
    const years = now.getFullYear();
    const months = now.getMonth();
    const dates = now.getDate();
    const days = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();


    dateText.innerText = `${years}년 ${months < 10 ? `0${months}` : `${months}`}월 ${dates < 10 ? `0${dates}` : `${dates}`}일`
    switch (days) {
        case 1:
            dayText.innerText = `월요일`;
            break;
        case 2:
            dayText.innerText = `화요일`;
            break;
        case 3:
            dayText.innerText = `수요일`;
            break;
        case 4:
            dayText.innerText = `목요일`;
            break;
        case 5:
            dayText.innerText = `금요일`;
            break;
        case 6:
            dayText.innerText = `토요일`;
            break;
        default:
            dayText.innerText = `일요일`;
    }
    title.innerText = `${hours < 10 ? `0${hours}` : `${hours}`} : ${minutes < 10 ? `0${minutes}` : `${minutes}`} : ${seconds < 10 ? `0${seconds}` : `${seconds}`}`;

}

function init() {
    whatTimeIs();
    setInterval(whatTimeIs, 1000);
}
init();