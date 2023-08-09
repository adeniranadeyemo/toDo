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
const toDos = [];
const fav = [];
const done = [];
const unComp = [];

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

const generateHTML = function (elem, i) {
  html = `<div class="inner-tasks-container flex         items-center mt-6 justify-between mb-2">
                  <input type="checkbox" class="basis-.5/5" />
                  <p class="basis-3/5 ml-2">${elem.text}</p>
              <div class="basis-1.5/5 flex items-center">
              <div class="reveal">
              <p class="hover-to-fav">Add to favourites</p>
              
                  <span class="material-icons cursor-pointer fav-icon ml-4">
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
    todos.push({ text, favourite: false });
  }
  renderTodos();
};

// console.log(todos);

// Delete a to-do
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Toggle favorite
function toggleFavorite(index) {
  todos[index].favorite = !todos[index].favorite;
  renderTodos();
}

// Render to do
const renderTodos = function () {
  tasks.innerHTML = '';

  todos.forEach(function (todo, index) {
    generateHTML(todo, index);

    tasks.insertAdjacentHTML('beforeend', html);

    deleteToDo = document.querySelectorAll('.delete-todo');
    favouriteToDo = document.querySelectorAll('.fav-icon');
  });
};

////
// Implementing the addTodo function
presentTodo.addEventListener('click', function () {
  if (inputedTodo.value !== '') {
    addTodo();

    toDoWelcomeSubText.innerHTML = `Your to-do's.`;

    inputedTodo.value = '';

    deleteToDoArray = Array.from(deleteToDo).reverse();
  }
  elementToggle(overlay);
  elementToggle(inputContainer);
  elementToggle(showTaskCon);
});

// Event delegation for delete buttons
tasks.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-todo')) {
    const deleteIndex = Array.from(deleteToDo).reverse().indexOf(e.target);

    deleteTodo(deleteIndex);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Creating to-do to be displayed as inputed
const displayToDoContent = function () {
  tasks.innerHTML = '';

  if (inputedTodo.value !== '') {
    inputed = inputedTodo.value;
    toDos.push(inputed);

    // if (!toDos.includes(inputed)) {
    //   toDos.push(inputed);
    // }
    // toDos.push(inputed);
  }

  toDos.forEach(function (todo) {
    generateHTML(todo);

    tasks.insertAdjacentHTML('afterbegin', html);

    deleteToDo = document.querySelectorAll('.delete-todo');
    favouriteToDo = document.querySelectorAll('.fav-icon');
  });
};

// Implementing the displayToDoContent function
addTodo.addEventListener('click', function () {
  if (inputed !== '') {
    displayToDoContent();

    toDoWelcomeSubText.innerHTML = `Your to-do's.`;

    inputedTodo.value = '';

    deleteToDoArray = Array.from(deleteToDo).reverse();
  }
  elementToggle(overlay);
  elementToggle(inputContainer);
  elementToggle(showTaskCon);
});

// Deleting to-do's and bin icon; deleteTodoDiv and the corresponing fav to-do div
const deleteTodoDiv = function (index) {
  const deletedItem = fav.find((item) => item === toDos[index]);

  console.log(deletedItem);
  if (deletedItem) {
    const favDelIndex = fav.indexOf(deletedItem);
    console.log(fav);
    console.log(favDelIndex);

    toDos.splice(index, 1);
    fav.splice(favDelIndex, 1);

    console.log(toDos);
    console.log(fav);
  }

  deleteToDoArray.splice(index, 1);

  toDos.length === 0
    ? (toDoWelcomeSubText.innerHTML = `Create to-do's`)
    : (toDoWelcomeSubText.innerHTML = `Your to-do's`);
};

// Event delegation for delete buttons
tasks.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-todo')) {
    const deleteIndex = Array.from(deleteToDo).reverse().indexOf(e.target);

    // const taskContainer = e.target.closest('.inner-tasks-container');

    // if (taskContainer) {
    //   const deleteIndex = Array.from(
    //     document.querySelectorAll('.inner-tasks-container')
    //   ).indexOf(taskContainer);

    //   console.log(deleteToDo);

    //   deleteTodoDiv(deleteIndex);
    //   displayToDoContent();
    //   displayFavsContentFromTasks();
    // }
    // console.log(toDos);
  }
});

// Tasks functionality ends

// Checkbox functionality

// Favourites functionality starts

// const displayToFavFromInput = function () {};

// Click fav icon to copy from tasks array to fav array and display

const addToFav = function (index) {
  fav.push(toDos[index]);
};

const displayFavsContentFromTasks = function () {
  favs.innerHTML = '';

  // const favHtmlArray = [];

  fav.forEach(function (todo) {
    generateHTML(todo);

    // favHtmlArray.push(html);

    favs.insertAdjacentHTML('afterbegin', html);

    newDeleteToDo = document.querySelectorAll('.delete-todo');
    newFavouriteToDo = document.querySelectorAll('.fav-icon'); ///
  });
};

tasks.addEventListener('click', function (e) {
  if (e.target.classList.contains('fav-icon')) {
    favs.innerHTML = '';

    const favIndex = Array.from(favouriteToDo).reverse().indexOf(e.target);

    addToFav(favIndex);

    displayFavsContentFromTasks();

    console.log(fav);
    console.log(favs);
    // favs.insertAdjacentHTML('afterbegin', html);
  }
});

// Make not favourite and just a to-do/task

// Delete from favourites and sync with tasks' page
const deleteFavsTodoDiv = function (index) {
  fav.splice(index, 1);

  // const deletedItem = toDos.find((item) => item === fav[index]);
  // if (deletedItem) {
  //   const toDosDelItem = toDos.indexOf(deletedItem);
  //   toDos.splice(toDosDelItem, 1);
  // }
};

favs.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-todo')) {
    const deleteIndex = Array.from(newDeleteToDo).reverse().indexOf(e.target);

    deleteFavsTodoDiv(deleteIndex);
    displayFavsContentFromTasks();
    // displayToDoContent();
  }
});

// Favourites functionality ends

//   const addToFav = document.querySelectorAll('.fav-icon');

// addToFav.addEventListener('click', function () {});

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
