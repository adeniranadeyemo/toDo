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
let done = [];
let unComp = [];

const generateHTML = function (obj, i) {
  const isFavouriteClass = obj.favorite ? 'favourite' : '';
  const isDoneClass = obj.done ? 'done' : '';
  const hoverToFavText = obj.favorite
    ? 'Added to favourites'
    : 'Add to favourites';

  html = `<div class="inner-tasks-container flex         items-center mt-6 justify-between mb-2">
                  <input type="checkbox" class="basis-.5/5 ${isDoneClass}" onclick="toggleDone(${i})"/>
                  <p class="basis-3/5 ml-2" id="todoText">${obj.text}</p>
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
  if (index !== -1) {
    todos.splice(index, 1);
    renderTodos();
    renderFavourites();
  }

  todos.length === 0
    ? (toDoWelcomeSubText.innerHTML = `Create to-do's`)
    : `Your to-do's`;
}

// Toggle favorite
function toggleFavorite(index) {
  todos[index].favorite = !todos[index].favorite;

  if (todos[index].favorite === false) {
    let indFav = todos[index];
    fav.splice(
      fav.findIndex((todo) => todo === fav[indFav]),
      1
    );
  }
  renderTodos();
  renderFavourites();
  renderDone();
  // renderUncompleted();

  hoverText.style.display = 'block';

  setTimeout(() => {
    hoverText.style.display = 'none';
  }, 3000);
}

// Toggle done
function toggleDone(index) {
  todos[index].done = !todos[index].done;

  if (todos[index].done === false) {
    let indDone = todos[index];
    done.splice(
      done.findIndex((todo) => todo === done[indDone]),
      1
    );
  }
  renderTodos();
  renderDone();
  renderFavourites();
  // renderUncompleted();
}

// Uncompleted
function toggleUncompleted (index) {
  todos[index].done = todos[index].done;

  if (todos[index].done === true) {
    let indUncomp = todos[index];
    unComp.splice(
      done.findIndex((todo) => todo === done[indUncomp]),
      1
    );
  }
  renderTodos()
  renderDone();
  renderUncompleted()
  renderFavourites();
}

// Render to do
const renderTodos = function () {
  tasks.innerHTML = '';

  todos.forEach(function (todo, index) {
    generateHTML(todo, index);

    tasks.insertAdjacentHTML('afterbegin', html);
  });
};

// Render favourites
const renderFavourites = function () {
  favs.innerHTML = '';

  fav = todos.filter((todo) => todo.favorite);

  fav.forEach(function (todo, index) {
    generateHTML(todo, index);

    favs.insertAdjacentHTML('afterbegin', html);
  });
};

const renderDone = function () {
  doneTasks.innerHTML = '';

  done = todos.filter((todo) => todo.done);

  done.forEach(function (todo, index) {
    generateHTML(todo, index);

    doneTasks.insertAdjacentHTML('afterbegin', html);
  });
};

const renderUncompleted = function () {
  uncomplete.innerHTML = '';

  unComp = todos.filter((todo) => !todo.done);

  unComp.forEach(function (todo, index) {
    generateHTML(todo, index);

    uncomplete.insertAdjacentHTML('afterbegin', html);
  });
};

// Implementing the addTodo function
presentTodo.addEventListener('click', function () {
  if (inputedTodo.value !== '') {
    addTodo();

    toDoWelcomeSubText.innerHTML = `Your to-do's.`;

    inputedTodo.value = '';
  }
  elementToggle(overlay);
  elementToggle(inputContainer);
  elementToggle(showTaskCon);
});

// Event delegation for delete buttons on each page
let delIndex;

const findIndexFunc = function (event) {
  const paragraphElem = event.target.parentNode.parentNode.querySelector('p');

  const parentText = paragraphElem.textContent;

  delIndex = todos.findIndex((todo) => todo.text === parentText);
};

tasks.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-todo')) {
    findIndexFunc(e);

    deleteTodo(delIndex);
  }
});

favs.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-todo')) {
    findIndexFunc(e);

    deleteTodo(delIndex);
  }
});

doneTasks.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-todo')) {
    findIndexFunc(e);

    deleteTodo(delIndex);
  }
});

uncomplete.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-todo')) {
    findIndexFunc(e);

    deleteTodo(delIndex);
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
          if (fav.length === 0) {
            toDoWelcomeSubText.innerHTML = `Nothing to see here.`;
          } else {
            toDoWelcomeSubText.innerHTML = `Your favourites.`;
          }
        }
        //
        else if (pages[i].dataset.page === 'done') {
          if (done.length === 0) {
            toDoWelcomeSubText.innerHTML = `Nothing to see here.`;
          } else {
            toDoWelcomeSubText.innerHTML = `Completed tasks.`;
          }
        }
        //
        else if (pages[i].dataset.page === 'uncompleted') {
          if (unComp.length === 0) {
            toDoWelcomeSubText.innerHTML = `Nothing to see here.`;
          } else {
            toDoWelcomeSubText.innerHTML = `You've got work to do!`;
          }
        }
        //
        else {
          toDoWelcomeSubText.innerHTML = `Your to-do's.`;
        }
      } else {
        pages[i].classList.remove('active');
        navigationLinks[i].classList.remove('active-li');
      }
    }
  });
}
