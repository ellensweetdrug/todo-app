let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function setFilter(filter) {
    currentFilter = filter;
    //убираем подсветку у всех кнопок
    document.getElementById("filterAll").classList.remove("active");
    document.getElementById("filterActive").classList.remove("active");
    document.getElementById("filterDone").classList.remove("active");

    //подсвечиваем нужную кнопку
    if (filter === "all") {
        document.getElementById("filterAll").classList.add("active");
    }
    if (filter === "active") {
        document.getElementById("filterActive").classList.add("active");
    }
    if (filter === "done") {
        document.getElementById("filterDone").classList.add("active");
    }

    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    const counter = document.getElementById("taskCounter");

    list.innerHTML = "";

    tasks.forEach((task, index) => {
        if (currentFilter === "active" && task.done) return;
        if (currentFilter === "done" && !task.done) return;

        const li = document.createElement("li");

        li.textContent = task.text;

        // зачёркивание выполненных задач
        if (task.done) {
            li.classList.add("done");
        }

        // клик по задаче = выполнить / отменить
        li.onclick = function () {
            task.done = !task.done;
            saveTasks();
            renderTasks();
        };

        // кнопка удаления
        const deleteBtn = document.createElement("button");
        const img = document.createElement("img");
img.src = "trash.png";
img.style.width = "16px";
img.style.height = "16px";

deleteBtn.appendChild(img);
        
        deleteBtn.onclick = function (event) {
            event.stopPropagation();

            li.classList.add("fade-out");

            setTimeout(() => { 
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
            }, 300);
        };

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });

    // обновление счётчика
    if (counter) {
        const activeCount = tasks.filter(t => !t.done).length;
counter.textContent = "Tasks left: " + activeCount ;
    }
    const progressBar = document.getElementById("progressBar");

if (progressBar) {
    const doneCount = tasks.filter(t => t.done).length;
    const percent = tasks.length ? (doneCount / tasks.length) * 100 : 0;
    progressBar.style.width = percent + "%";
}
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") {
        input.style.border = "2px solid red";
        setTimeout(() => {
            input.style.border = "1px solid #ccc";
        }, 1000);
        return;
    }

    tasks.push({ text: text, done: false });
    input.value = "";
    input.focus();

    saveTasks();
    renderTasks();
}
function clearCompleted(){
    tasks = tasks.filter(task=> !task.done);
    saveTasks();
    renderTasks();
}

// Enter тоже добавляет задачу
document.getElementById("taskInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// первый рендер при загрузке
renderTasks();
deleteBtn.classList.add("delete-btn");