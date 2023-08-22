'use strict';

let username = localStorage.getItem('inputValue');
console.log(username);

const toDoWelcome = document.getElementById('todo-welcome-text');

toDoWelcome.innerHTML = `Welcome ${username}`;
// toDoWelcome.innerHTML = `Welcome Niran`;

const toDoWelcomeSubText = document.getElementById('todo-welcome-subtext');

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
}

showTaskCon.addEventListener('click', toggleTaskContainer);
overlay.addEventListener('click', toggleTaskContainer);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const todos = [];
let favArr = [];
let doneArr = [];
let unCompArr = [];

const generateHTML = function (todo) {
  const isFavouriteClass = todo.favorite ? 'favourite' : '';
  const isDoneClass = todo.done ? 'done' : '';
  const isDoneStrike = todo.done ? 'strikethrough' : '';
  const hoverToFavText = todo.favorite
    ? 'Added to favourites'
    : 'Add to favourites';

  html = `<div class="inner-tasks-container flex         items-center mt-6 justify-between mb-2">
                  <input type="checkbox" class="basis-.5/5 ${isDoneClass}" onclick="toggleDone(${todo.id})"/>
                  <p class="basis-3/5 ml-2 ${isDoneStrike}" id="todoText">${todo.text}</p>
              <div class="basis-1.5/5 flex items-center">
              <div class="reveal">
              <p class="hover-to-fav" data-id="${todo.id}">${hoverToFavText}</p>

                  <span class="material-icons cursor-pointer fav-icon ml-4 ${isFavouriteClass}" data-id="${todo.id}" onclick="toggleFavorite(${todo.id})">
                  star
                  </span>
              </div>

                  <span class="material-icons cursor-pointer delete-todo ml-4">
                      delete
                  </span>
              </div>
          </div>`;
};

// Tasks functionalities start
let todoId = 0;
const addTodo = function () {
  if (inputedTodo.value !== '') {
    let text = inputedTodo.value;
    todos.push({
      id: todoId,
      text,
      favorite: false,
      done: false,
    });
  }
  todoId++;
  renderTodos();
};

// Delete a to-do
function deleteTodo(index) {
  if (index !== -1) {
    todos.splice(index, 1);
    renderTodos();
    renderFavourites();
    renderDone();
  }

  todos.length === 0
    ? (toDoWelcomeSubText.innerHTML = `Create to-do's`)
    : `Your to-do's`;
}

// Toggle favorite
function toggleFavorite(id) {
  const todo = todos.find((todo) => id === todo.id);
  console.log(todo);

  if (todo) {
    todo.favorite = !todo.favorite;
    if (!todo.favorite) {
      const favIndex = favArr.findIndex((todo) => todo.id === id);
      favArr.splice(favIndex, 1);
    }
  }

  renderTodos();
  renderFavourites();
  renderDone();
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

  renderTodos();
  renderDone();
  renderFavourites();
}

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

const renderDone = function () {
  doneTasks.innerHTML = '';

  doneArr = todos.filter((todo) => todo.done);

  doneArr.forEach(function (todo) {
    generateHTML(todo);

    doneTasks.insertAdjacentHTML('afterbegin', html);
  });
};

// Implementing the addTodo function
presentTodo.addEventListener('click', function () {
  if (inputedTodo.value !== '') {
    addTodo();

    toDoWelcomeSubText.innerHTML = `Your to-do's.`;

    inputedTodo.value = '';
  }
  toggleTaskContainer();
});

// Straight to favourite
addToFavourites.addEventListener('click', function () {
  if (inputedTodo.value !== '') {
    let text = inputedTodo.value;
    todos.push({
      id: todoId,
      text,
      favorite: true,
      done: false,
    });
    inputedTodo.value = '';
  }
  todoId++;
  renderTodos();
  renderFavourites();
  toggleTaskContainer();
});

// Event delegation for delete buttons on each page
let delIndex;

const findIndexFunc = function (e) {
  const paragraphElem = e.target.parentNode.parentNode.querySelector('p');

  const parentText = paragraphElem.textContent;

  delIndex = todos.findIndex((todo) => todo.text === parentText);
};

//
const del = function (e) {
  if (e.target.classList.contains('delete-todo')) {
    findIndexFunc(e);

    deleteTodo(delIndex);
  }
};

tasks.addEventListener('click', del);
favs.addEventListener('click', del);
doneTasks.addEventListener('click', del);

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
        } else if (pages[i].dataset.page === 'favourites') {
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
