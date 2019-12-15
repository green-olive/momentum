const toDoForm = document.querySelector(".js-todo-form"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".pending-list");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDos) {
        return toDos.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTodo(text) {
    const list = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    span.innerText = text;
    const newId = toDos.length + 1;
    list.appendChild(span);
    list.appendChild(delBtn);
    list.id = newId;
    toDoList.appendChild(list);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value = "";
}

function loadTodo() {
    const loadedTodo = localStorage.getItem(TODOS_LS);
    if (loadedTodo !== null) {
        const parsedTodo = JSON.parse(loadedTodo);
        parsedTodo.forEach(function (todo) {
            paintTodo(todo.text);
        })
    }
}

function init() {
    loadTodo();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();