$(document).ready(onReady);

function onReady() {
  console.log("So ready.");

  // Render tasks on page load
  renderTasks();

  // Click event listener for new button
  $(document).on('click', '#newTaskBtn', createTask);
}

/**
 * Gets tasks from server (GET /tasks)
 * and renders them to the DOM
 */
function renderTasks() {
  $.ajax({
    method: "GET",
    url: "/tasks"
  }).then(response => {
    console.log("Got a response from GET /tasks", response);

    // Look through each todo item
    for (let task of response) {
      $('#todoList').append(`
        <li>
          <input type="checkbox" />
          ${task.name}
          <button>Delete</button>
        </li>
      `)
    }
  }).catch(err => {
    console.error("GET /tasks failed", err);
  });
}

/**
 * Create a new task from form inputs
 * Will do POST /tasks with
 * {
 *   name: "name from input element"
 * }
 */
function createTask() {
  let newTaskName = $('#newTaskName').val();
  console.log("Creating new task: ", newTaskName);

  $.ajax({
    method: "POST",
    url: "/tasks",
    data: {
      name: newTaskName
    }
  }).then(response => {
    console.log("POST /tasks complete");
  }).catch(err => {
    console.error("POST /tasks failed", err);
  })
}