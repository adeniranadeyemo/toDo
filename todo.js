'use strict';

let username = localStorage.getItem('inputValue');

const toDoWelcome = document.getElementById('todo-welcome-text');

toDoWelcome.innerHTML = `Welcome ${username}`;

const toDoWelcomeSubText = document.getElementById('todo-welcome-subtext');
const form = document.querySelector('form');
const showTaskCon = document.querySelector('.add-todo');
const overlay = document.querySelector('.overlay');
const inputContainer = document.querySelector('.input-container');
//
const presentTodo = document.querySelector('.add-to-todo-container');
const addToFavourites = document.querySelector('.add-to-favourites');
//
const inputedTodo = document.querySelector('.task-input');
const tasks = document.querySelector('.tasks');
const favs = document.querySelector('.favourites');
const doneTasks = document.querySelector('.done');
const uncomplete = document.querySelector('.uncompleted');
//
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');
//
const hoverText = document.querySelector('.hover-to-fav');

let html;

let deleteToDo;
let favouriteToDo;

const elementToggle = function (element) {
  element.classList.toggle('active');
};

function toggleTaskContainer() {
  elementToggle(overlay);
  elementToggle(inputContainer);
  elementToggle(showTaskCon);
  inputedTodo.focus();
}

showTaskCon.addEventListener('click', toggleTaskContainer);
overlay.addEventListener('click', toggleTaskContainer);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const todos = JSON.parse(localStorage.getItem('data')) || [];
// localStorage.clear();
let favArr = [];
let doneArr = [];
let unCompArr = [];
let currentTask = {};

const generateHTML = function (todo) {
  const isFavouriteClass = todo.favorite ? 'favourite' : '';
  const isDoneClass = todo.done ? 'done' : '';
  const isDoneStrike = todo.done ? 'strikethrough' : '';
  const hoverToFavText = todo.favorite
    ? 'Added to favourites'
    : 'Add to favourites';

  html = `
          <hr>
          <div class="inner-tasks-container flex my-5 px-10">
            <div class="check-text flex self-start items-center">
              <input type="checkbox" class="${isDoneClass}" onclick="toggleDone(${todo.id})"/>
            </div>
              
            <div class="ml-4 self-start">
              <p class="${isDoneStrike} to-do" id="${todo.id}">${todo.text}</p>
              <div class="basis-1/5 flex items-center">
                <div class="reveal mt-7">
                  <p class="hover-to-fav" data-id="${todo.id}">${hoverToFavText}</p>

                  <span class="material-icons cursor-pointer fav-icon ${isFavouriteClass}"   data-id="${todo.id}" onclick="toggleFavorite(${todo.id})">
                  star
                  </span>
                </div>

                  <span class="material-icons cursor-pointer edit-todo ml-4 mt-7" >
                      edit
                  </span>

                  <span class="material-icons cursor-pointer delete-todo ml-4 mt-7">
                      delete
                  </span>
              </div>
            </div>
          </div>
          `;
};

// Persistence from local storage
function persistence(todos, todoId) {
  localStorage.setItem('data', JSON.stringify(todos));
  localStorage.setItem('todoId', todoId.toString());

  renderAll();
}

// Tasks functionalities start
let todoId = localStorage.getItem('todoId')
  ? parseInt(localStorage.getItem('todoId'))
  : 0;

const addOrUpdateTodo = function () {
  if (inputedTodo.value !== '') {
    const todoIndex = todos.findIndex((todo) => todo.id === currentTask.id);

    const todoObj = {
      id: todoId,
      text: inputedTodo.value,
      favorite: false,
      done: false,
    };

    if (todoIndex === -1) {
      todos.push(todoObj);
      todoId++;
    } else {
      todos[todoIndex] = currentTask;
      currentTask.text = inputedTodo.value;
      currentTask = {};
    }
  }

  inputedTodo.value = '';

  persistence(todos, todoId);
};

// Straight to favourite
addToFavourites.addEventListener('click', function () {
  if (inputedTodo.value !== '') {
    const todoObj = {
      id: todoId,
      text: inputedTodo.value,
      favorite: true,
      done: false,
    };

    todos.push(todoObj);
    inputedTodo.value = '';
  }
  todoId++;

  persistence(todos, todoId);

  toggleTaskContainer();
});

// Implementing the addTodo function
function addToTodoContainer() {
  if (inputedTodo.value !== '') {
    addOrUpdateTodo();

    toDoWelcomeSubText.innerHTML = `Your to-do's.`;

    inputedTodo.value = '';
  }
  toggleTaskContainer();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  addToTodoContainer();
});

window.addEventListener('DOMContentLoaded', function () {
  persistence(todos, todoId);
});

// Reset
function reset() {
  inputedTodo.value = '';
  currentTask = {};
  overlay.classList.remove('active');
}

overlay.addEventListener('click', reset);

// Render to do
const renderTodos = function () {
  tasks.innerHTML = '';

  todos.forEach(function (todo) {
    generateHTML(todo);

    tasks.insertAdjacentHTML('afterbegin', html);
  });
};

// Render favourites
const renderFavourites = function () {
  favs.innerHTML = '';

  favArr = todos.filter((todo) => todo.favorite);

  favArr.forEach(function (todo) {
    generateHTML(todo);

    favs.insertAdjacentHTML('afterbegin', html);
  });
};

// Render done
const renderDone = function () {
  doneTasks.innerHTML = '';

  doneArr = todos.filter((todo) => todo.done);

  doneArr.forEach(function (todo) {
    generateHTML(todo);

    doneTasks.insertAdjacentHTML('afterbegin', html);
  });
};

function renderAll() {
  renderTodos();
  renderFavourites();
  renderDone();
}

// Delete a to-do
function deleteTodo(index) {
  if (index !== -1) {
    todos.splice(index, 1);
  }

  todos.length === 0
    ? (toDoWelcomeSubText.innerHTML = `Create to-do's`)
    : `Your to-do's`;

  if (todos.length === 0) {
    todoId = 0;
  }

  persistence(todos, todoId);
}

// Toggle favorite
function toggleFavorite(id) {
  const todo = todos.find((todo) => id === todo.id);

  if (todo) {
    todo.favorite = !todo.favorite;
    if (!todo.favorite) {
      const favIndex = favArr.findIndex((todo) => todo.id === id);
      favArr.splice(favIndex, 1);
    }
  }

  persistence(todos, todoId);
}

function toggleDone(id) {
  const todo = todos.find((todo) => id === todo.id);

  if (todo) {
    todo.done = !todo.done;
    if (!todo.done) {
      const doneIndex = doneArr.findIndex((todo) => id === todo.id);
      doneArr.splice(doneIndex, 1);
    }
  }

  persistence(todos, todoId);
}

// Edit todo
function editTodo(index) {
  currentTask = todos[index];

  inputedTodo.value = currentTask.text;

  toggleTaskContainer();

  inputedTodo.focus();
}

// Event delegation for delete and edit buttons on each page
let taskIndex;

const findIndexFunc = function (e) {
  const paragraphElem =
    e.target.parentNode.parentNode.parentNode.querySelector('.to-do');

  const parentText = paragraphElem.textContent;

  taskIndex = todos.findIndex((todo) => todo.text === parentText);
};

//
const del = function (e) {
  if (e.target.classList.contains('delete-todo')) {
    findIndexFunc(e);

    deleteTodo(taskIndex);
  }
};

const edit = function (e) {
  if (e.target.classList.contains('edit-todo')) {
    findIndexFunc(e);

    editTodo(taskIndex);
  }
};

function setEvents(e) {
  del(e);
  edit(e);
}

tasks.addEventListener('click', setEvents);

favs.addEventListener('click', setEvents);

doneTasks.addEventListener('click', setEvents);

// Switch pages
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener('click', function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add('active');
        navigationLinks[i].classList.add('active-li');
        window.scrollTo(0, 0);

        if (pages[i].dataset.page === 'tasks') {
          todos.length === 0
            ? (toDoWelcomeSubText.innerHTML = `Create to-do's.`)
            : (toDoWelcomeSubText.innerHTML = `Your to-do's.`);
        }
        //
        else if (pages[i].dataset.page === 'favourites') {
          favArr.length === 0
            ? (toDoWelcomeSubText.innerHTML = `Nothing to see here.`)
            : (toDoWelcomeSubText.innerHTML = `Your favourites.`);
        }
        //
        else if (pages[i].dataset.page === 'done') {
          doneArr.length === 0
            ? (toDoWelcomeSubText.innerHTML = `Nothing to see here.`)
            : (toDoWelcomeSubText.innerHTML = `Completed tasks.`);
        }
        //
      } else {
        pages[i].classList.remove('active');
        navigationLinks[i].classList.remove('active-li');
      }
    }
  });
}
