'use strict';

// let username = localStorage.getItem('inputValue');
// console.log(username);

const toDoWelcome = document.getElementById('todo-welcome-text');

// toDoWelcome.innerHTML = `Welcome ${username}`;
toDoWelcome.innerHTML = `Welcome Niran`;
// localStorage.clear();

const toDoWelcomeSubText = document.getElementById('todo-welcome-subtext');

const showTaskCon = document.querySelector('.add-todo');
const overlay = document.querySelector('.overlay');
const inputContainer = document.querySelector('.input-container');
//
const presentTodo = document.querySelector('.add-to-todo-container');
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

let inputed;
let html;

let deleteToDo;
let favouriteToDo;

let deleteToDoArray;

// For the Favs(favourite page)
let newDeleteToDo;
let newFavouriteToDo;

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
let fav = [];
const done = [];
const unComp = [];

const generateHTML = function (obj, i) {
  const isFavouriteClass = obj.favorite ? 'favourite' : '';
  const hoverToFavText = obj.favorite
    ? 'Added to favourite'
    : 'Add to favourites';

  html = `<div class="inner-tasks-container flex         items-center mt-6 justify-between mb-2">
                  <input type="checkbox" class="basis-.5/5" />
                  <p class="basis-3/5 ml-2">${obj.text}</p>
              <div class="basis-1.5/5 flex items-center">
              <div class="reveal">
              <p class="hover-to-fav">${hoverToFavText}</p>

                  <span class="material-icons cursor-pointer fav-icon ml-4 ${isFavouriteClass}" onclick="toggleFavorite(${i})">
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
const addTodo = function () {
  if (inputedTodo.value !== '') {
    let text = inputedTodo.value;
    todos.push({
      text,
      favorite: false,
      done: false,
      uncompleted: true,
    });
  }
  renderTodos();
};

// Delete a to-do
function deleteTodo(index) {
  // const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    renderTodos();
    renderFavourites();
  }
  // fav.splice(index, 1);
}

// Toggle favorite
function toggleFavorite(index) {
  todos[index].favorite = !todos[index].favorite;
  renderTodos();
  renderFavourites();

  // if (todos[index].favorite === true) {
  //   fav.push(todos[index]);
  // } else
  if (todos[index].favorite === false) {
    let ind = todos[index];
    fav.splice(
      fav.findIndex((todo) => todo === fav[ind]),
      1
    );
  }
  renderTodos();
  renderFavourites();

  hoverText.style.display = 'block';

  setTimeout(() => {
    hoverText.style.display = 'none';
  }, 3000);
}

// Render to do
const renderTodos = function () {
  tasks.innerHTML = '';

  todos.forEach(function (todo, index) {
    generateHTML(todo, index);

    tasks.insertAdjacentHTML('beforeend', html);

    deleteToDo = document.querySelectorAll('.delete-todo');
  });
};

const renderFavourites = function () {
  favs.innerHTML = '';

  fav = todos.filter((todo) => todo.favorite);

  fav.forEach(function (todo, index) {
    generateHTML(todo, index);

    favs.insertAdjacentHTML('beforeend', html);
  });
};

// const renderDone = function () {};

// const

// Implementing the addTodo function
presentTodo.addEventListener('click', function () {
  if (inputedTodo.value !== '') {
    // inputed = inputedTodo.value;
    // addTodo(inputed);
    addTodo();

    toDoWelcomeSubText.innerHTML = `Your to-do's.`;

    inputedTodo.value = '';
  }
  elementToggle(overlay);
  elementToggle(inputContainer);
  elementToggle(showTaskCon);
});

// Event delegation for delete buttons on each page
tasks.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-todo')) {
    const deleteIndex = Array.from(deleteToDo).indexOf(e.target);

    deleteTodo(deleteIndex);
  }
});

favs.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-todo')) {
    const deleteIndex = e.target.parentNode.parentNode;

    deleteTodo(deleteIndex);
  }
});

doneTasks.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-todo')) {
    const deleteIndex = e.target.parentNode.parentNode;

    deleteTodo(deleteIndex);
  }
});

uncomplete.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-todo')) {
    const deleteIndex = e.target.parentNode.parentNode;

    deleteTodo(deleteIndex);
  }
});

// Switch pages
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener('click', function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add('active');
        navigationLinks[i].classList.add('active-li');
        window.scrollTo(0, 0);

        if (pages[i].dataset.page === 'favourites') {
          toDoWelcomeSubText.innerHTML = `Your favourites.`;
        } else if (pages[i].dataset.page === 'done') {
          toDoWelcomeSubText.innerHTML = `Completed tasks.`;
        } else if (pages[i].dataset.page === 'uncompleted') {
          toDoWelcomeSubText.innerHTML = `You've got work to do!`;
        } else {
          toDoWelcomeSubText.innerHTML = `Your to-do's.`;
        }
      } else {
        pages[i].classList.remove('active');
        navigationLinks[i].classList.remove('active-li');
      }
    }
  });
}
