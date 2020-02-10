const toDoForm = document.querySelector(".js-todo-form"),
	toDoInput = toDoForm.querySelector("input"),
	toDoList = document.querySelector(".pending-list"),
	finishedList = document.querySelector(".finished-list");

const TODOS_LS = "toDos";
const FINISHED_LS = "finished";

let toDos = [];
let finised = [];

function getTaskObject(text) {
	return {
		id: String(Date.now()),
		text
	};
}

function savePendingTask(task) {
	toDos.push(task);
}

function findInFinished(taskId) {
	return finished.find(function(task) {
		return task.id === taskId;
	});
}

function findInPending(taskId) {
	return toDos.find(function(task) {
		return task.id === taskId;
	});
}

function removeFromPending(taskId) {
	toDos = toDos.filter(function(task) {
		return task.id !== taskId;
	});
}

function removeFromFinished(taskId) {
	finished = finished.filter(function(task) {
		return task.id !== taskId;
	});
}

function addToFinished(task) {
	finished.push(task);
}

function addToPending(task) {
	toDos.push(task);
}

function deleteTask(e) {
	const icon = e.target.parentNode;
	const li = icon.parentNode;
	li.parentNode.removeChild(li);
	removeFromFinished(li.id);
	removeFromPending(li.id);
	saveState();
}

function handleFinishClick(e) {
	const icon = e.target.parentNode;
	const li = icon.parentNode;
	li.parentNode.removeChild(li);
	const task = findInPending(li.id);
	removeFromPending(li.id);
	addToFinished(task);
	paintFinishedTask(task);
	saveState();
}

function handleBackClick(e) {
	const icon = e.target.parentNode;
	const li = icon.parentNode;
	li.parentNode.removeChild(li);
	const task = findInFinished(li.id);
	removeFromFinished(li.id);
	addToPending(task);
	paintPendingTask(task);
	saveState();
}

function buildGenericLi(task) {
	const li = document.createElement("li");
	const icon = document.createElement("span");
	const span = document.createElement("span");
	const deleteBtn = document.createElement("button");
	icon.innerHTML = '<i class="fas fa-map-pin li-icon"></i>';
	span.innerText = task.text;
	deleteBtn.innerHTML = '<i class="fas fa-trash gray"></i>';
	deleteBtn.addEventListener("click", deleteTask);
	li.append(icon, span, deleteBtn);
	li.id = task.id;
	return li;
}

function paintPendingTask(task) {
	const genericLi = buildGenericLi(task);
	const completeBtn = document.createElement("button");
	completeBtn.innerHTML = '<i class="fas fa-check-circle green"></i>';
	completeBtn.addEventListener("click", handleFinishClick);
	genericLi.append(completeBtn);
	toDoList.append(genericLi);
}

function paintFinishedTask(task) {
	const genericLi = buildGenericLi(task);
	const backBtn = document.createElement("button");
	backBtn.innerHTML = '<i class="fas fa-fast-backward blue"></i>';
	backBtn.addEventListener("click", handleBackClick);
	genericLi.append(backBtn);
	finishedList.append(genericLi);
}

function saveState() {
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
	localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function loadState() {
	toDos = JSON.parse(localStorage.getItem(TODOS_LS)) || [];
	finished = JSON.parse(localStorage.getItem(FINISHED_LS)) || [];
}

function restoreState() {
	toDos.forEach(function(task) {
		paintPendingTask(task);
	});
	finished.forEach(function(task) {
		paintFinishedTask(task);
	});
}

function handleFormSubmit(e) {
	e.preventDefault();
	const taskObj = getTaskObject(toDoInput.value);
	toDoInput.value = "";
	paintPendingTask(taskObj);
	savePendingTask(taskObj);
	saveState();
}

function init() {
	toDoForm.addEventListener("submit", handleFormSubmit);
	loadState();
	restoreState();
}
init();
