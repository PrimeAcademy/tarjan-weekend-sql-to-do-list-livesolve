$(document).ready(onReady);

function onReady() {
  console.log("So ready.");

  // Render tasks on page load
  renderTasks();
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