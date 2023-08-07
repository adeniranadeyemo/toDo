'use strict';

const toDoWelcome = document.getElementById('todo-welcome-text');

let username = localStorage.getItem('inputValue');
// console.log(username);

// toDoWelcome.innerHTML = `Welcome ${username}`;
toDoWelcome.innerHTML = `Welcome Niran`;
// localStorage.clear();

const showTaskCon = document.querySelector('.add-todo');
const overlay = document.querySelector('.overlay');
const inputContainer = document.querySelector('.input-container');
//
const addTodo = document.querySelector('.add-to-todo-container');
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
let deleteToDoArray;

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

// Creating to-do to be displayed as inputed
const displayToDoContent = function () {
  tasks.innerHTML = '';

  if (inputedTodo.value !== '') {
    inputed = inputedTodo.value;
    toDos.push(inputed);
  }

  toDos.forEach(function (todo) {
    html = `<div class="inner-tasks-container flex         items-center mt-6 justify-between mb-2">
                  <input type="checkbox" class="basis-.5/5" />
                  <p class="basis-3/5 ml-2">${todo}</p>
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

    tasks.insertAdjacentHTML('afterbegin', html);

    deleteToDo = document.querySelectorAll('.delete-todo');
  });
};

// Implementing the displayToDoContent function
addTodo.addEventListener('click', function () {
  if (inputed !== '') {
    displayToDoContent();

    inputedTodo.value = '';

    deleteToDoArray = Array.from(deleteToDo).reverse();
  }
  elementToggle(overlay);
  elementToggle(inputContainer);
  elementToggle(showTaskCon);
  // toggleTaskContainer;
});

const deleteTodoDiv = function (index) {
  toDos.splice(index, 1);

  deleteToDoArray.splice(index, 1);
};

tasks.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-todo')) {
    const deleteIndex = Array.from(deleteToDo).reverse().indexOf(e.target);

    deleteTodoDiv(deleteIndex);
    displayToDoContent();
  }
});

//   const addToFav = document.querySelectorAll('.fav-icon');

// addToFav.addEventListener('click', function () {});

// navigationLinks.forEach(function(link) {
//   link.addEventListener('click', function() {
//     const targetPage = link.dataset.page;
//     pages.forEach(function(page) {
//       if (page.dataset.page === targetPage) {
//         page.classList.add('active');
//       } else {
//         page.classList.remove('active');
//       }
//     });
//   });
// });
