import { getLocalStorage, saveToLocalStorage, removeFromLocalStorage } from "./localStorage.js";

let submitTask = document.getElementById("submitTask");

let nameTask = document.getElementById("name");
let statusTask = document.getElementById("status");
let priorityTask = document.getElementById("priority");
let dueDateTask = document.getElementById("dueDate");
let descriptionTask = document.getElementById("description");

let highPriTD = document.getElementById("highPriTD");
let medPriTD = document.getElementById("medPriTD");
let lowPriTD = document.getElementById("lowPriTD");
let highPriIP = document.getElementById("highPriIP");
let medPriIP = document.getElementById("medPriIP");
let lowPriIP = document.getElementById("lowPriIP");
let highPriC = document.getElementById("highPriC");
let medPriC = document.getElementById("medPriC");
let lowPriC = document.getElementById("lowPriC");

function callTasks() {
    let popTasks = getLocalStorage();
    for (let i = 0; i < popTasks.length; i++) {
        let data = popTasks[i].split("/");
        loadTasks(data[0], data[1], data[2], data[3], data[4], popTasks[i]);
    };
};

submitTask.addEventListener('click', function () {
    if (nameTask.value === "") {
        nameTask.value = "Empty Task";
    }
    if (statusTask.value === "Select Status") {
        statusTask.value = "toDo";
    }
    if (priorityTask.value === "Select Priority") {
        priorityTask.value = "Low";
    }
    if (dueDateTask.value === "") {
        dueDateTask.value = "9999-12-31";
    }
    if (descriptionTask.value === "") {
        descriptionTask.value = "Description Empty";
    }

    createTask(nameTask.value, statusTask.value, priorityTask.value, dueDateTask.value, descriptionTask.value);

    nameTask.value = "";
    statusTask.value = "Select Status";
    priorityTask.value = "Select Priority";
    dueDateTask.value = "";
    descriptionTask.value = "";
});

function loadTasks(nameTask, statusTask, priorityTask, dueDateTask, descriptionTask, saveToStorage) {
    let holderDiv = document.createElement("div");
    holderDiv.className = "bg-blue-400 m-3";

    let taskName = document.createElement("p");
    taskName.className = "text-left m-3 pt-3 pb-5";
    taskName.textContent = nameTask;

    let taskPriority = document.createElement("p");
    taskPriority.className = "text-left m-3 py-1";
    taskPriority.textContent = "Priority: " + priorityTask;

    let taskDueDate = document.createElement("p");
    taskDueDate.className = "text-left m-3 py-1";
    taskDueDate.textContent = "Due Date: " + dueDateTask;

    let taskDescription = document.createElement("p");
    taskDescription.className = "text-left m-3 pt-1 pb-5";
    taskDescription.textContent = "Description: " + descriptionTask;

    let taskOptions = document.createElement("button");
    // taskOptions.setAttribute("id", "defaultModalButton");
    // taskOptions.setAttribute("data-modal-target", "defaultModal");
    // taskOptions.setAttribute("data-modal-toggle", "defaultModal");
    // taskOptions.type = "button";
    taskOptions.className = "bg-red-400 w-[90%] mb-3 rounded-lg";
    taskOptions.innerText = "Task Options (ONLY REOMVES)";
    taskOptions.addEventListener('click', function (e) {
        removeFromLocalStorage(saveToStorage);
        callTasks();
    });

    holderDiv.appendChild(taskName);
    holderDiv.appendChild(taskPriority);
    holderDiv.appendChild(taskDueDate);
    holderDiv.appendChild(taskDescription);
    holderDiv.appendChild(taskOptions);

    if (statusTask === "complete") {
        if (priorityTask === "Priority: High") {
            highPriC.appendChild(holderDiv);
        } else if (priorityTask === "Priority: Medium") {
            medPriC.appendChild(holderDiv);
        } else {
            lowPriC.appendChild(holderDiv);
        };
    } else if (statusTask === "inProgress") {
        if (priorityTask === "Priority: High") {
            highPriIP.appendChild(holderDiv);
        } else if (priorityTask === "Priority: Medium") {
            medPriIP.appendChild(holderDiv);
        } else {
            lowPriIP.appendChild(holderDiv);
        };
    } else {
        if (priorityTask === "Priority: High") {
            highPriTD.appendChild(holderDiv);
        } else if (priorityTask === "Priority: Medium") {
            medPriTD.appendChild(holderDiv);
        } else {
            lowPriTD.appendChild(holderDiv);
        };
    };
};

function createTask(nameTask, statusTask, priorityTask, dueDateTask, descriptionTask) {
    let checkTasks = getLocalStorage();
    let saveToStorage = nameTask + "/" + statusTask + "/" + priorityTask + "/" + dueDateTask + "/" + descriptionTask
    let bool = true;
    for (let i = 0; i < checkTasks.length; i++) {
        if(checkTasks[i] === saveToStorage){
            bool = false;
        }
        if (bool === true) {
            saveToLocalStorage(saveToStorage);
            loadTasks(nameTask, statusTask, priorityTask, dueDateTask, descriptionTask, saveToStorage);
        };
    };
    callTasks();
};

callTasks();