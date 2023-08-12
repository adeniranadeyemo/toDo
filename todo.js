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

const generateHTML = function (obj, i) {
  const isFavouriteClass = obj.favorite ? 'favourite' : '';
  const isDoneClass = obj.done ? 'done' : '';
  const isDoneStrike = obj.done ? 'strikethrough' : '';
  const hoverToFavText = obj.favorite
    ? 'Added to favourites'
    : 'Add to favourites';

  html = `<div class="inner-tasks-container flex         items-center mt-6 justify-between mb-2">
                  <input type="checkbox" class="basis-.5/5 ${isDoneClass}" onclick="toggleDone(${i})"/>
                  <p class="basis-3/5 ml-2 ${isDoneStrike}" id="todoText">${obj.text}</p>
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
    });
  }
  renderTodos();
  // renderUncompleted();
};

// Delete a to-do
function deleteTodo(index) {
  if (index !== -1) {
    todos.splice(index, 1);
    renderTodos();
    renderFavourites();
    renderDone();
    // renderUncompleted();
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
    favArr.splice(
      favArr.findIndex((todo) => todo === favArr[indFav]),
      1
    );
  }
  hoverText.style.display = 'block';

  setTimeout(() => {
    hoverText.style.display = 'none';
  }, 3000);

  renderTodos();
  renderFavourites();
  renderDone();
  // renderUncompleted();
}

// Toggle done
function toggleDone(index) {
  todos[index].done = !todos[index].done;

  if (todos[index].done === false) {
    let indDone = todos[index];
    const doneIndex = doneArr.findIndex((todo) => todo === doneArr[indDone]);
    doneArr.splice(doneIndex, 1);
  }

  renderTodos();
  renderDone();
  renderFavourites();
  // renderUncompleted();
}

// Uncompleted
// function toggleUncompleted(index) {
//   todos[index].done = todos[index].done;

//   if (todos[index].done === true) {
//     let indUncomp = todos[index];
//     const uncompIndex = unCompArr.findIndex(
//       (todo) => todo === unCompArr[indUncomp]
//     );

//     if (uncompIndex !== -1) {
//       unCompArr.splice(uncompIndex, 1);
//     }
//   }

//   renderTodos();
//   renderUncompleted();
//   renderDone();
//   renderFavourites();
// }

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

  favArr = todos.filter((todo) => todo.favorite);

  favArr.forEach(function (todo, index) {
    generateHTML(todo, index);

    favs.insertAdjacentHTML('afterbegin', html);
  });
};

const renderDone = function () {
  doneTasks.innerHTML = '';

  doneArr = todos.filter((todo) => todo.done);

  doneArr.forEach(function (todo, index) {
    generateHTML(todo, index);

    doneTasks.insertAdjacentHTML('afterbegin', html);
  });
};

// const renderUncompleted = function () {
//   uncomplete.innerHTML = '';

//   unCompArr = todos.filter((todo) => !todo.done);

//   unCompArr.forEach(function (todo, index) {
//     generateHTML(todo, index);

//     uncomplete.insertAdjacentHTML('afterbegin', html);
//   });
// };

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
      text,
      favorite: true,
      done: false,
    });
    inputedTodo.value = '';
  }
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
// uncomplete.addEventListener('click', del);

// Switch pages
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener('click', function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase().trim() === pages[i].dataset.page) {
        pages[i].classList.add('active');
        navigationLinks[i].classList.add('active-li');
        window.scrollTo(0, 0);

        if (pages[i].dataset.page === 'tasks') {
          todos.length === 0
            ? (toDoWelcomeSubText.innerHTML = `Create to-dos.`)
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
        // else if (pages[i].dataset.page === 'uncompleted') {
        //   unCompArr.length === 0
        //     ? (toDoWelcomeSubText.innerHTML = `Nothing to see here.`)
        //     : (toDoWelcomeSubText.innerHTML = `You've got work to do!`);
        // }
        //
      } else {
        pages[i].classList.remove('active');
        navigationLinks[i].classList.remove('active-li');
      }
    }
  });
}
