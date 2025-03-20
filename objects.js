// Task array to store all tasks
let tasks = [];

class Task {
    constructor(name, course, due, priority) {
        let day = new Date();
        this.name = name;
        this.course = course;
        this.due = new Date(due);
        this.priority = Number(priority);
        this.status = day > this.due ? "Overdue" : "Not Started";
    }

    complete() {
        this.status = "Complete";
    }

    progress() {
        this.status = "In Progress";
    }

    increasePriority() {
        this.priority += 1;
    }

    changeDueDate(due) {
        this.due = new Date(due);
    }
}



// Everything below is handling calling the functions in the Task class and updating the table as a result

// Function to update the table
function updateTable() {
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";

    tasks.forEach((task, index) => {
        const row = tableBody.insertRow();

        row.insertCell(0).textContent = task.name;
        row.insertCell(1).textContent = task.due.toISOString().split("T")[0];
        row.insertCell(2).textContent = task.course;
        row.insertCell(3).textContent = task.status;
        row.insertCell(4).textContent = task.priority;

        // Edit Button (opens modal)
        const editCell = row.insertCell(5);
        const editBtn = createButton("Edit", "blue", () => openEditModal(index));
        editCell.appendChild(editBtn);
    });
}

// Helper function to create a button
function createButton(text, color, callback) {
    const button = document.createElement("button");
    button.textContent = text;
    button.style.backgroundColor = color;
    button.style.color = "white";
    button.style.border = "none";
    button.style.padding = "5px 10px";
    button.style.cursor = "pointer";
    button.style.margin = "2px";
    button.addEventListener("click", callback);
    return button;
}

// Function to open the Edit Task modal
function openEditModal(index) {
    const task = tasks[index];
    document.getElementById("editTaskName").textContent = task.name;
    document.getElementById("editTaskClass").textContent = task.course;
    document.getElementById("editDueDate").value = task.due.toISOString().split("T")[0];

    // Set button actions
    document.getElementById("completeTask").onclick = function () {
        task.complete();
        closeEditModal();
    };

    document.getElementById("progressTask").onclick = function () {
        task.progress();
        closeEditModal();
    };

    document.getElementById("increasePriority").onclick = function () {
        task.increasePriority();
        closeEditModal();
    };

    document.getElementById("saveDueDate").onclick = function () {
        const newDueDate = document.getElementById("editDueDate").value;
        task.changeDueDate(newDueDate);
        closeEditModal();
    };

    document.getElementById("deleteTask").onclick = function () {
        tasks.splice(index, 1);
        closeEditModal();
    };

    // Show modal
    document.getElementById("editModal").style.display = "block";
}

// Function to close edit modal and update table
function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
    updateTable();
}

// Event Listeners for Add Task modal
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("taskModal");
    const btn = document.getElementById("addTask");
    const closeBtn = document.querySelector(".close");
    const form = document.getElementById("taskForm");

    // Open Add Task modal
    btn.addEventListener("click", function (event) {
        event.preventDefault();
        modal.style.display = "block";
    });

    // Close Add Task modal
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const taskName = document.getElementById("taskName").value;
        const taskClass = document.getElementById("taskClass").value;
        const dueDate = document.getElementById("dueDate").value;
        const priority = document.getElementById("priority").value;

        // CREATE NEW TASKS for the table ----------------------- PROJECT 8 REQUIREMENT
        const newTask = new Task(taskName, taskClass, dueDate, priority);
        tasks.push(newTask);

        updateTable();
        form.reset();
        modal.style.display = "none";
    });

    // Close Edit Modal when clicking outside
    window.addEventListener("click", function (event) {
        const editModal = document.getElementById("editModal");
        if (event.target == editModal) {
            editModal.style.display = "none";
        }
    });
});
