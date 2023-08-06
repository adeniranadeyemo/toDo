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
const toDosHTML = [];
const fav = [];
const done = [];
const unComp = [];

const elementToggle = function (element) {
  element.classList.toggle('active');
};

showTaskCon.addEventListener('click', function () {
  elementToggle(overlay);
  elementToggle(inputContainer);
  elementToggle(showTaskCon);
});

overlay.addEventListener('click', function () {
  elementToggle(overlay);
  elementToggle(inputContainer);
  elementToggle(showTaskCon);
});

let inputed;
let html;
let deleteToDo;
let deleteToDoArray;
let parentArray = [];

const updateTasksUI = function () {
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
  });
  toDosHTML.push(html);

  deleteToDo = document.querySelectorAll('.delete-todo');
};

addTodo.addEventListener('click', function () {
  if (inputed !== '') {
    updateTasksUI();
    inputedTodo.value = '';

    deleteToDoArray = Array.from(deleteToDo);
    // console.log(deleteToDoArray);

    let delgrandParent;
    let delgrandParentArray = [];

    for (const i of deleteToDoArray) {
      delgrandParent = i.parentNode.parentNode;
      delgrandParentArray.push(delgrandParent);
    }

    deleteToDoArray.forEach((delBtn) => {
      delBtn.addEventListener('click', function () {
        const delBtnIndex = deleteToDoArray.findIndex((del) => del === delBtn);
        // console.log(delBtnIndex);

        const delgrandParentIndex = delgrandParentArray.findIndex(
          (todo) => todo === delBtn.parentNode.parentNode
        );
        console.log(delgrandParentIndex);

        if (delgrandParentIndex !== -1) {
          deleteToDoArray.splice(delgrandParentIndex, 1);
          console.log(deleteToDoArray);
          delgrandParentArray.splice(delgrandParentIndex, 1);
          console.log(delgrandParentArray);
          // delBtn.parentNode.parentNode.remove();
        }
        // updateTasksUI();
      });
    });
  }
  elementToggle(overlay);
  elementToggle(inputContainer);
  elementToggle(showTaskCon);
});
//   const addToFav = document.querySelectorAll('.fav-icon');

// addToFav.addEventListener('click', function () {});

// console.log(parentIndex);
