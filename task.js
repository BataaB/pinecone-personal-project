let tasks = [];
let inputEl = document.getElementById("title");
let addTaskTitle = document.getElementById("add-task-title");
let addTaskDesc = document.getElementById("add-task-desc");
let editTaskTitle = document.getElementById("edit-task-title");
let editTaskDesc = document.getElementById("edit-task-desc");
let currentEdit = null;

inputEl.addEventListener('keypress', function(event) {
  if (event.key === "Enter") {
    event.preventDefault();

    addTask('quick');
  }
})

function render() {
  let container = document.getElementById("today-list-container");
  container.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.id = task.id + "-card";

    let taskCheckbox = document.createElement("div");
    taskCheckbox.classList.add("task-checkbox");
    taskCheckbox.id = task.id + "-checkbox";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = task.id;
    checkbox.id = task.id;
    checkbox.onclick = function () {
      toggleTask(checkbox.id);
    };
    taskCheckbox.appendChild(checkbox);

    taskDiv.appendChild(taskCheckbox);

    let taskText = document.createElement("div");
    taskText.classList.add("task-text");
    taskText.id = task.id + "-text";

    let title = document.createElement("h2");
    let node = document.createTextNode(task.title);
    title.appendChild(node);
    taskText.appendChild(title);

    let desc = document.createElement("p");
    node = document.createTextNode(task.desc);
    desc.appendChild(node);
    taskText.appendChild(desc);

    let opt = document.createElement("img");
    opt.src = "images/options.svg";
    opt.alt = "options";
    opt.onclick = function (event) {
      options(event);
    };
    opt.id = task.id + "-options";
    taskText.appendChild(opt);

    let optDiv = document.createElement("div");
    optDiv.className = "options hidden";
    optDiv.id = task.id + "-optionsDiv";

    let optEdit = document.createElement("div");
    optEdit.classList.add("option-edit");
    optEdit.onclick = function(event) {
      editTaskPrompt(event);
    }
    optEdit.id = task.id + '-edit';

    let optEditImg = document.createElement("img");
    optEditImg.src = "images/edit.svg";
    optEditImg.alt = "edit";
    optEdit.appendChild(optEditImg);

    let optEditText = document.createTextNode("Edit");
    optEdit.appendChild(optEditText);

    optDiv.appendChild(optEdit);

    let optDelete = document.createElement("div");
    optDelete.classList.add("option-delete");
    optDelete.onclick = function (event) {
      deleteTask(event);
    };
    optDelete.id = task.id + "-delete";

    let optDeleteImg = document.createElement("img");
    optDeleteImg.src = "images/delete.svg";
    optDeleteImg.alt = "delete";
    optDelete.appendChild(optDeleteImg);

    let optDeleteText = document.createTextNode("Delete");
    optDelete.appendChild(optDeleteText);

    optDiv.appendChild(optDelete);

    taskText.appendChild(optDiv);

    taskDiv.appendChild(taskText);

    container.appendChild(taskDiv);
  }
}

function addTaskPrompt() {
  let bg = document.getElementById('dark-background');
  let prompt = document.getElementById('add-task-prompt');
  bg.style.display = 'block';
  prompt.style.display = 'block';
}

function addTaskPromptCancel() {
  addTaskTitle.value = "";
  addTaskDesc.value = "";
  let bg = document.getElementById('dark-background');
  let prompt = document.getElementById('add-task-prompt');
  let error = document.getElementById('add-task-title-error');
  bg.style.display = 'none';
  prompt.style.display = 'none';
  error.style.display = 'none';
}

function editTaskPrompt(event) {
  let id = event.target.id.split('-')[0];
  currentEdit = id;
  for (let i = 0; i < tasks.length; i++) {
    if (id == tasks[i].id) {
      editTaskTitle.value = tasks[i].title;
      editTaskDesc.value = tasks[i].desc;
      break;
    }
  }
  let bg = document.getElementById('dark-background');
  let prompt = document.getElementById('edit-task-prompt');
  bg.style.display = 'block';
  prompt.style.display = 'block';
}

function editTaskPromptCancel() {
  let bg = document.getElementById('dark-background');
  let prompt = document.getElementById('edit-task-prompt');
  bg.style.display = 'none';
  prompt.style.display = 'none';
  currentEdit = null;
}

function addTask(origin) {
  if (inputEl.value != "" && origin == 'quick') {
    let newId = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    tasks.push({ id: newId, title: inputEl.value, desc: "" });
    inputEl.value = "";
  } else if (origin == 'prompt') {
    if (addTaskTitle.value != "") {
      let newId = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      tasks.push({ id: newId, title: addTaskTitle.value, desc: addTaskDesc.value });
      addTaskPromptCancel();
    } else {
      let error = document.getElementById('add-task-title-error');
      error.style.display = 'block';
    }
  }
  render();
}

function editTask() {
  for (let i = 0; i < tasks.length; i++) {
    if (currentEdit == tasks[i].id) {
      if (editTaskTitle.value != "") {
        tasks[i].title = editTaskTitle.value;
      }
      if (editTaskDesc.value != "") {
        tasks[i].desc = editTaskDesc.value;
      }
      break;
    }
  }
  editTaskPromptCancel();
  render();
}

function options(event) {
  let optionsDiv = document.getElementById(event.target.id + "Div");
  
  function remove() {
    optionsDiv.classList.toggle("hidden");
    if (optionsDiv.className.includes('hidden')) {
      window.removeEventListener('click', remove);
    }
  }

  window.addEventListener("click", remove);
}

function toggleTask(taskId) {
  let task_text = document.getElementById(taskId + "-card");
  task_text.classList.toggle("task-checked");
}

function deleteTask(event) {
  let id = event.target.id.split("-")[0];
  tasks = tasks.filter((t) => t.id != id);
  render();
}
