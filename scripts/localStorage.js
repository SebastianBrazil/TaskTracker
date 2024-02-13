const saveToLocalStorage = (savingData) => {
    let savedTask = getLocalStorage();
    if (!savedTask.includes(savingData)) {
        savedTask.push(savingData);
    }
    localStorage.setItem("SavedTasks", JSON.stringify(savedTask));
};

const getLocalStorage = () => {
    let localStorageData = localStorage.getItem("SavedTasks");
    if (localStorageData === null) {
        return [];
    };
    return JSON.parse(localStorageData);
};

const removeFromLocalStorage = (savingData) => {
    let savedTask = getLocalStorage();
    let removeTask = savedTask.indexOf(savingData);
    savedTask.splice(removeTask, 1);
    localStorage.setItem("SavedTasks", JSON.stringify(savedTask));
};

export { saveToLocalStorage, getLocalStorage, removeFromLocalStorage };