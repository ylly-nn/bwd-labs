const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
const newTasksContainer = document.getElementById("newTasks");
const inProgressTasksContainer = document.getElementById("inProgressTasks");
const completedTasksContainer = document.getElementById("completedTasks");

const taskTextInput = document.getElementById("taskText");
const addTaskForm = document.getElementById("addTaskForm");
const searchInput = document.getElementById("searchInput");

addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskText = taskTextInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, status: "new" });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskDialog.close();
        renderTasks();
    }
});

function renderTasks() {
    newTasksContainer.innerHTML = `
                        <div class="column-header">Новые</div>`;
    inProgressTasksContainer.innerHTML = `
                        <div class="column-header">Выполняются</div>`;
    completedTasksContainer.innerHTML = `
                        <div class="column-header">Готово</div>`;

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.className = "task";

        const taskText = document.createElement("div");
        taskText.textContent = task.text;

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.classList.add("delete");
        deleteButton.onclick = () => deleteTask(index);

        if (task.status === "new") {
            const rightButton = document.createElement("button");
            rightButton.textContent = ">>> выполняются";
            rightButton.onclick = () => moveRight(index);

            buttonContainer.appendChild(deleteButton);
            buttonContainer.appendChild(rightButton);

            taskElement.appendChild(taskText);
            taskElement.appendChild(buttonContainer);
            newTasksContainer.appendChild(taskElement);
        } else if (task.status === "inProgress") {
            const leftButton = document.createElement("button");
            leftButton.textContent = "↩ новые";
            leftButton.onclick = () => moveLeft(index);

            const rightButton = document.createElement("button");
            rightButton.textContent = ">>> готово";
            rightButton.onclick = () => moveRight(index);

            buttonContainer.appendChild(leftButton);
            buttonContainer.appendChild(deleteButton);
            buttonContainer.appendChild(rightButton);

            taskElement.appendChild(taskText);
            taskElement.appendChild(buttonContainer);
            inProgressTasksContainer.appendChild(taskElement);
        } else if (task.status === "completed") {
            const leftButton = document.createElement("button");
            leftButton.textContent = "↩ выполняются";
            leftButton.onclick = () => moveLeft(index);

            buttonContainer.appendChild(leftButton);
            buttonContainer.appendChild(deleteButton);

            taskElement.appendChild(taskText);
            taskElement.appendChild(buttonContainer);
            completedTasksContainer.appendChild(taskElement);
        }
    });
    saveTasks();
}

// Фильтрация задач по ключевым словам
searchInput.addEventListener("input", () => {
    renderTasks();
});

// Модификация функции renderTasks для фильтрации
function renderTasks() {
    const searchQuery = searchInput.value.trim().toLowerCase();

    // Очищаем контейнеры для задач
    newTasksContainer.innerHTML = `
        <div class="column-header">Новые</div>`;
    inProgressTasksContainer.innerHTML = `
        <div class="column-header">Выполняются</div>`;
    completedTasksContainer.innerHTML = `
        <div class="column-header">Готово</div>`;

    tasks.forEach((task, index) => {
        // Если задача не соответствует поисковому запросу, пропускаем её
        if (task.text.toLowerCase().includes(searchQuery)) {
            const taskElement = document.createElement("div");
            taskElement.className = "task";

            const taskText = document.createElement("div");
            taskText.textContent = task.text;

            const buttonContainer = document.createElement("div");
            buttonContainer.className = "button-container";

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Удалить";
            deleteButton.classList.add("delete");
            deleteButton.onclick = () => deleteTask(index);

            if (task.status === "new") {
                const rightButton = document.createElement("button");
                rightButton.textContent = ">>> выполняются";
                rightButton.onclick = () => moveRight(index);

                buttonContainer.appendChild(deleteButton);
                buttonContainer.appendChild(rightButton);

                taskElement.appendChild(taskText);
                taskElement.appendChild(buttonContainer);
                newTasksContainer.appendChild(taskElement);
            } else if (task.status === "inProgress") {
                const leftButton = document.createElement("button");
                leftButton.textContent = "↩ новые";
                leftButton.onclick = () => moveLeft(index);

                const rightButton = document.createElement("button");
                rightButton.textContent = ">>> готово";
                rightButton.onclick = () => moveRight(index);

                buttonContainer.appendChild(leftButton);
                buttonContainer.appendChild(deleteButton);
                buttonContainer.appendChild(rightButton);

                taskElement.appendChild(taskText);
                taskElement.appendChild(buttonContainer);
                inProgressTasksContainer.appendChild(taskElement);
            } else if (task.status === "completed") {
                const leftButton = document.createElement("button");
                leftButton.textContent = "↩ выполняются";
                leftButton.onclick = () => moveLeft(index);

                buttonContainer.appendChild(leftButton);
                buttonContainer.appendChild(deleteButton);

                taskElement.appendChild(taskText);
                taskElement.appendChild(buttonContainer);
                completedTasksContainer.appendChild(taskElement);
            }
        }
    });
    saveTasks();
}

function moveLeft(index) {
    if (tasks[index].status === "inProgress") {
        tasks[index].status = "new";
    } else if (tasks[index].status === "completed") {
        tasks[index].status = "inProgress";
    }
    renderTasks();
}

function moveRight(index) {
    if (tasks[index].status === "new") {
        tasks[index].status = "inProgress";
    } else if (tasks[index].status === "inProgress") {
        tasks[index].status = "completed";
    }
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();
