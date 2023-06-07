// Setting up variables for our HTML elements using DOM selection
const form = document.getElementById("taskform");
const tasklist = document.getElementById("tasklist");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = form.elements.taskName.value;
    const part = form.elements.taskPart.value;
    const duration = form.elements.taskDuration.value;
    const purpose = form.elements.taskPurpose.value;
    const feeling = form.elements.taskFeeling.value;

    const task = addTask(
        name,
        part,
        duration,
        purpose,
        feeling
    )


    let tasks = JSON.parse(localStorage.getItem('tasks'));

    if (tasks == null) {
        tasks = [[name, part, duration, purpose, feeling]];
    } else {
        tasks.push([name, part, duration, purpose, feeling]);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
})

function displayTask(task) {
    let item = document.createElement("li");
    item.setAttribute("data-id", task.id);
    item.innerHTML = `<div class='task'><p id='taskName'><strong><big>${task.name}</big></strong>
    <i><small>- ${task.id}</small></i>
    <br><small>${task.date}</small>
    <br><b>Body:</b> ${task.part}
    <br><b>Duration:</b> ${task.duration}
    <br><b>Purpose:</b> ${task.purpose}
    <br><b>Feeling:</b> ${task.feeling}
    </p></div>`;

    tasklist.appendChild(item);

    // Clear the value of the input once the task has been added to the page
    form.reset();

    // Setup delete button DOM elements
    let delButton = document.createElement("button");
    delButton.className = "remove";
    let delButtonText = document.createTextNode("remove");
    delButton.appendChild(delButtonText);
    item.appendChild(delButton); // Adds a delete button to every task

    // Listen for when the delete button is clicked
    delButton.addEventListener("click", function (event) {

        taskList.forEach(function (taskArrayElement, taskArrayIndex) {
            if (taskArrayElement.id == item.getAttribute('data-id')) {
                taskList.splice(taskArrayIndex, 1)
            }
        })

        // Make sure the deletion worked by logging out the whole array
        console.log(taskList);
        console.log(JSON.parse(localStorage.getItem('tasks')));

        item.remove(); // Remove the task item from the page when button clicked
    })

}


// Create an array called 'taskList'
var taskList = [];

function addTask(name, part, duration, purpose, feeling) {

    // Creating the object, directly passing in the input parameters
    let task = {
        name,
        id: Date.now(),
        part,
        duration,
        purpose,
        feeling,
        date: new Date().toISOString(),
    }

    taskList.push(task);
    displayTask(task);

}

// Function to show the pop-up
function showPopup() {
    var popup = document.getElementById("myPopup");
    popup.style.display = "block";
}

// Function to close the pop-up
function closePopup() {
    var popup = document.getElementById("myPopup");
    popup.style.display = "none";
}


// quote to motivate to stretch
var quoteBox = document.getElementById("quote-box");
var quotes = quoteBox.getElementsByClassName("quote");
var currentIndex = 0;

setInterval(function() {
    currentIndex++;
    if (currentIndex >= quotes.length) {
    currentIndex = 0;
    }
    for (var i = 0; i < quotes.length; i++) {
    quotes[i].style.left = (i - currentIndex) * 100 + "%";
    }
}, 4000);