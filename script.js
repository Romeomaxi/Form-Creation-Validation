document.addEventListener('DOMContentLoaded', function () {

    // Step 1: Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 2: Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Load tasks without saving again
    }

    // Step 3: Add Task function (with optional saving to Local Storage)
    function addTask(taskText, save = true) {
        // Step 4: Check if taskText is empty
        if (taskText === "") {
            alert('Please enter a task.');
            return;
        }

        // Step 5: Create the task and its remove button
        const li = document.createElement('li');
        li.textContent = taskText;
        li.classList.add('task-item');

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Step 6: Remove task from both DOM and Local Storage
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeFromStorage(taskText); // Remove from Local Storage
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Step 7: Save to Local Storage if needed
        if (save) {
            saveTaskToLocalStorage(taskText);
        }

        taskInput.value = ''; // Clear the input
    }

    // Step 8: Save task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Step 9: Remove task from Local Storage
    function removeFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText); // Remove the task
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update Local Storage
    }

    // Step 10: Add event listeners for Add Task button and Enter key
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

    // Step 11: Load tasks when the page loads
    loadTasks(); // Call the loadTasks function to display saved tasks
});
