$(document).ready(onReady);

function onReady() {
  console.log("So ready.");

  // Render tasks on page load
  renderTasks();

  // Click event listener for new button
  $(document).on('click', '#newTaskBtn', createTask);

  // Handle completed/incompleted checkbox
  $(document).on('click', '.completeTaskBtn', toggleTaskCompleted)
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
    $('#todoList').empty();
    for (let task of response) {
      let checkedAttr;
      let className;
      if (task.isComplete) {
        // show checked attribute
        checkedAttr = 'checked';
        className = "complete";
      }
      else {
        // don't show checked attribute
        checkedAttr = ''
        className = '';
      }

      $('#todoList').append(`
        <li class="${className}" data-id="${task.id}">
          <input class="completeTaskBtn" type="checkbox" ${checkedAttr}/>
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

    renderTasks();
  }).catch(err => {
    console.error("POST /tasks failed", err);
  })
}

/**
 * Make task as completed/incomplete
 * based on the checkbox input
 * 
 * PUT /tasks/:id
    {
      isComplete: true
    }
 */
function toggleTaskCompleted() {
  let isComplete = $(this).is(':checked');
  console.log('isComplete?', isComplete);

  // Grab ID from DOM
  let taskId = $(this).parent().data('id');
  console.log('taskId', taskId);

  $.ajax({
    method: "PUT",
    url: `/tasks/${taskId}`,
    data: {
      isComplete: isComplete,
    }
  }).then(response => {
    console.log("PUT /tasks succeeded");
  }).catch(err => {
    console.error("PUT /tasks failed", err);
  });
}