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
const addToFav = document.querySelectorAll('.fav-icon');
const deleteToDo = document.querySelector('.delete-todo');
// console.log(addToFav);
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

addTodo.addEventListener('click', function () {
  tasks.innerHTML = '';

  inputed = inputedTodo.value;

  toDos.push(inputed);

  toDos.forEach(function (todo) {
    const html = `
    <div class="inner-tasks-container flex         items-center mt-6 justify-between mb-2">
            <input type="checkbox" class="basis-.5/5" />
            <p class="basis-3/5 ml-2">${todo}</p>
        <div class="basis-1.5/5 flex items-center">
            <p class="hover-to-fav">Add to favourites</p>
        
            <span class="material-icons cursor-pointer fav-icon ml-4">
            star
            </span>
            <span class="material-icons cursor-pointer delete-todo ml-4">
                delete
            </span>
        </div>
    </div> <br />
        `;

    tasks.insertAdjacentHTML('afterbegin', html);

    inputedTodo.value = '';
  });
});

addToFav.addEventListener('click', function () {});
