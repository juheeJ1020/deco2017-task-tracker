// Setting up variables for our HTML elements using DOM selection
const form = document.getElementById("taskform");
const tasklist = document.getElementById("tasklist");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // console.log(form.elements.taskType.value)
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


    // console.log(localStorage.getItem('tasks'));
    console.log("hi");
    console.log(JSON.parse(localStorage.getItem('tasks')));
})

function displayTask(task) {
    let item = document.createElement("li");
    item.setAttribute("data-id", task.id);
    item.innerHTML = `<p><strong>${task.name}</strong>
    <br>${task.id}
    <br>${task.date}
    <br>${task.part}
    <br>${task.duration}
    <br>${task.purpose}
    <br>${task.feeling}
    </p>`;

    tasklist.appendChild(item);

    // Clear the value of the input once the task has been added to the page
    form.reset();

    // Setup delete button DOM elements
    let delButton = document.createElement("button");
    delButton.className = "remove";
    let delButtonText = document.createTextNode("Remove");
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
        // Because we used 'let' to define the item, this will always delete the right element
        // localStorage.removeItem('tasks');
        
    })

}


// Create an array called 'taskList'
var taskList = [];

// function updateTasks() {
//     let list = document.querySelector('list takelist');
//     list.innerHTML = "";

//     let tasks = JSON.parse(localStorage.getItem('tasks'));

//     if (tasks !== null) {
    
//         tasks.forEach((task) => {
//           let listItem = document.createElement('li');
//           listItem.innerHTML = `<p><strong>${task.name}</strong>
//               <br>${task.id}
//               <br>${task.date}
//               <br>${task.part}
//               <br>${task.duration}
//               <br>${task.purpose}
//               <br>${task.feeling}
//               </p>`;
//           list.appendChild(taskList);
//         })

//         tasklist.appendChild(list);
//       }
// }


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

// Call the function with test values for the input paramaters
addTask("Stretching the neck", "neck", 30, "Has neck pain", "Pretty okay");

// Log the array to the console.
// console.log(taskList);



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
