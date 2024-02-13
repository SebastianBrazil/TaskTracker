import { getLocalStorage, saveToLocalStorage, removeFromLocalStorage } from "./localStorage.js";

let submitTask = document.getElementById("submitTask");
let submitModification = document.getElementById("submitModification");
let remove = document.getElementById("remove");

let nameTask = document.getElementById("name");
let statusTask = document.getElementById("status");
let priorityTask = document.getElementById("priority");
let dueDateTask = document.getElementById("dueDate");
let descriptionTask = document.getElementById("description");
let MnameTask = document.getElementById("Mname");
let MstatusTask = document.getElementById("Mstatus");
let MpriorityTask = document.getElementById("Mpriority");
let MdueDateTask = document.getElementById("MdueDate");
let MdescriptionTask = document.getElementById("Mdescription");

let highPriTD = document.getElementById("highPriTD");
let medPriTD = document.getElementById("medPriTD");
let lowPriTD = document.getElementById("lowPriTD");
let highPriIP = document.getElementById("highPriIP");
let medPriIP = document.getElementById("medPriIP");
let lowPriIP = document.getElementById("lowPriIP");
let highPriC = document.getElementById("highPriC");
let medPriC = document.getElementById("medPriC");
let lowPriC = document.getElementById("lowPriC");

let isBeingModified = "";

function callTasks() {
    highPriC.innerHTML = "";
    medPriC.innerHTML = "";
    lowPriC.innerHTML = "";
    highPriIP.innerHTML = "";
    medPriIP.innerHTML = "";
    lowPriIP.innerHTML = "";
    highPriTD.innerHTML = "";
    medPriTD.innerHTML = "";
    lowPriTD.innerHTML = "";

    let popTasks = getLocalStorage();
    for (let i = 0; i < popTasks.length; i++) {
        let data = popTasks[i].split("/");
        loadTasks(data[0], data[1], data[2], data[3], data[4], popTasks[i]);
    };
};

callTasks();

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
});

function loadTasks(nameTaskL, statusTaskL, priorityTaskL, dueDateTaskL, descriptionTaskL, saveToStorageL) {
    let holderDiv = document.createElement("div");
    holderDiv.className = "bg-blue-400 m-3";

    let taskName = document.createElement("p");
    taskName.className = "text-left mx-3 py-3 text-xl";
    taskName.textContent = nameTaskL;

    let taskPriority = document.createElement("p");
    taskPriority.className = "text-left mx-3";
    taskPriority.textContent = "Priority: " + priorityTaskL;

    let taskDueDate = document.createElement("p");
    taskDueDate.className = "text-left mx-3";
    taskDueDate.textContent = "Due Date: " + dueDateTaskL;

    let taskDescription = document.createElement("p");
    taskDescription.className = "text-left mx-3 pt-2 pb-5";
    taskDescription.textContent = "Description: " + descriptionTaskL;

    let taskOptions = document.createElement("button");
    taskOptions.setAttribute("id", "modifytModalButton");
    taskOptions.setAttribute("data-modal-target", "modifyModal");
    taskOptions.setAttribute("data-modal-toggle", "modifyModal");
    taskOptions.type = "button";
    taskOptions.className = "bg-red-400 w-[90%] mb-3 rounded-lg";
    taskOptions.innerText = "Task Options";    
    taskOptions.addEventListener('click', function (e) {
        isBeingModified = saveToStorageL;
        MnameTask.value = nameTaskL;
        MstatusTask.value = statusTaskL;
        MpriorityTask.value = priorityTaskL;
        MdueDateTask.value = dueDateTaskL;
        MdescriptionTask.value = descriptionTaskL;
    });

    holderDiv.appendChild(taskName);
    holderDiv.appendChild(taskPriority);
    holderDiv.appendChild(taskDueDate);
    holderDiv.appendChild(taskDescription);
    holderDiv.appendChild(taskOptions);

    if (statusTaskL === "complete") {
        if (priorityTaskL === "High") {
            highPriC.appendChild(holderDiv);
        } else if (priorityTaskL === "Medium") {
            medPriC.appendChild(holderDiv);
        } else {
            lowPriC.appendChild(holderDiv);
        };
    } else if (statusTaskL === "inProgress") {
        if (priorityTaskL === "High") {
            highPriIP.appendChild(holderDiv);
        } else if (priorityTaskL === "Medium") {
            medPriIP.appendChild(holderDiv);
        } else {
            lowPriIP.appendChild(holderDiv);
        };
    } else {
        if (priorityTaskL === "High") {
            highPriTD.appendChild(holderDiv);
        } else if (priorityTaskL === "Medium") {
            medPriTD.appendChild(holderDiv);
        } else {
            lowPriTD.appendChild(holderDiv);
        };
    };

    nameTask.value = "";
    statusTask.value = "Select Status";
    priorityTask.value = "Select Priority";
    dueDateTask.value = "";
    descriptionTask.value = "";
};

function createTask(nameTaskC, statusTaskC, priorityTaskC, dueDateTaskC, descriptionTaskC) {
    let checkTasks = getLocalStorage();
    let saveToStorageC = nameTaskC + "/" + statusTaskC + "/" + priorityTaskC + "/" + dueDateTaskC + "/" + descriptionTaskC;
    let isInLS = false;
    for (let i = 0; i < checkTasks.length; i++) {
        if (checkTasks[i] === saveToStorageC) {
            isInLS = true;
        };
    };
    if (isInLS === false) {
        saveToLocalStorage(saveToStorageC);
        loadTasks(nameTaskC, statusTaskC, priorityTaskC, dueDateTaskC, descriptionTaskC, saveToStorageC);
    };
};

submitModification.addEventListener('click', function () {
    if (MnameTask.value === "") {
        MnameTask.value = "Empty Task";
    }
    if (MstatusTask.value === "Select Status") {
        MstatusTask.value = "toDo";
    }
    if (MpriorityTask.value === "Select Priority") {
        MpriorityTask.value = "Low";
    }
    if (MdueDateTask.value === "") {
        MdueDateTask.value = "9999-12-31";
    }
    if (MdescriptionTask.value === "") {
        MdescriptionTask.value = "Description Empty";
    }

    removeFromLocalStorage(isBeingModified);
    callTasks();
    createTask(MnameTask.value, MstatusTask.value, MpriorityTask.value, MdueDateTask.value, MdescriptionTask.value);
});

remove.addEventListener('click', function () {
    removeFromLocalStorage(isBeingModified);
    callTasks();
});