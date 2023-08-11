// const forms = document.querySelectorAll('[data-form]');
// const formInputs = document.querySelectorAll('[data-form-input]');
// const welcomeInput = document.querySelector('#form1');
// const formBtns = document.querySelectorAll('[data-form-btn]');
// const submitBtn1 = document.getElementById('btn1');
// const inputField1 = document.getElementById('input1');

// Checks if input fileds are filled
// function checkInputs(form) {
//   const inputFields = form.querySelectorAll('[data-form-input]');
//   for (const inputField of inputFields) {
//     if (inputField.value.trim() === '') {
//       return false;
//     }
//     return true;
//   }
// }

// forms.forEach((form) => {
//   form.addEventListener('submit', (event) => {
//     if (!checkInputs(form)) {
//       console.log('dsds');
//       event.preventDefault();
//       alert('Please fill in the input field(s) before submitting');
//     }
//   });
// });

// Checks if input fileds are filled
// function checkInputs(formID) {
//   const form = document.getElementById(formID);
//   const inputs = form.querySelectorAll('[data-form-input]');
//   for (const input of inputs) {
//     if (input.value.trim() === '') {
//       console.log('No');
//       return false;
//     }
//     console.log('Yes');
//     return true;
//   }
// }

// inputField1.addEventListener('input', () => {
//   submitBtn1.disabled = !checkInputs(form1);
// });

const toDos = [];
const fav = [];
const done = [];
const unComp = [];

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
