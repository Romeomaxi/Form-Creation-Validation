document.addEventListener('DOMContentLoaded', function () {

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

   
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); 
    }

   
    function addTask(taskText, save = true) {
        
        if (taskText === "") {
            alert('Please enter a task.');
            return;
        }

        
        const li = document.createElement('li');
        li.textContent = taskText;
        li.classList.add('task-item');

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeFromStorage(taskText); 
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

       
        if (save) {
            saveTaskToLocalStorage(taskText);
        }

        taskInput.value = ''; 
    }

   
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    
    function removeFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText); 
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); 
    }

   
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });

    
    loadTasks();
});
