document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskContainer = document.getElementById('taskContainer');

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addTask(taskInput.value);
        saveTasks();
        taskInput.value = '';
    });

    taskContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('task')) {
            toggleTask(event.target);
            saveTasks();
        }
    });

    loadTasks();
});

function addTask(taskText, isCompleted = false) {
    const taskContainer = document.getElementById('taskContainer');
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.setAttribute('data-completed', isCompleted);

    const circleElement = document.createElement('span');
    circleElement.className = 'circle';
    taskElement.appendChild(circleElement);

    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = taskText;
    taskTextElement.onclick = function (event) {
        toggleTask(event);
    };
    taskTextElement.className = isCompleted ? 'completed' : '';
    taskElement.appendChild(taskTextElement);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete'; // Добавляем класс delete
    deleteButton.onclick = function () {
        deleteTask(this);
    };
    taskElement.appendChild(deleteButton);

    taskContainer.appendChild(taskElement);
}



function deleteTask(buttonElement) {
    const taskElement = buttonElement.parentElement;
    taskElement.remove();

    saveTasks();
}

function toggleTask(event) {
    const taskTextElement = event.target;
    taskTextElement.classList.toggle('completed');

    const taskElement = taskTextElement.closest('.task');
    const isCompleted = taskTextElement.classList.contains('completed');

    taskElement.setAttribute('data-completed', isCompleted);

    const circleElement = taskElement.querySelector('.circle');
    circleElement.style.backgroundColor = isCompleted ? '#4CAF50' : 'transparent';

    saveTasks();
}


function saveTasks() {
    const tasks = [];
    const taskContainer = document.getElementById('taskContainer');
    const taskElements = taskContainer.getElementsByClassName('task');

    for (const taskElement of taskElements) {
        const taskText = taskElement.getAttribute('data-text');
        const isCompleted = taskElement.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    for (const task of savedTasks) {
        addTask(task.text, task.completed);
    }
}

function filterTasks(type) {
    const taskContainer = document.getElementById('taskContainer');
    const taskElements = taskContainer.getElementsByClassName('task');

    for (const taskElement of taskElements) {
        const isCompleted = taskElement.getAttribute('data-completed') === 'true';

        switch (type) {
            case 'all':
                taskElement.style.display = 'flex';
                break;
            case 'active':
                taskElement.style.display = isCompleted ? 'none' : 'flex';
                break;
            case 'completed':
                taskElement.style.display = isCompleted ? 'flex' : 'none';
                break;
            default:
                break;
        }
    }
}

