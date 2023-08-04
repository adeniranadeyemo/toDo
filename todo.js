const toDoWelcome = document.getElementById('todo-welcome-text');

let username = localStorage.getItem('inputValue');
console.log(username);

// toDoWelcome.innerHTML = `Welcome ${username}`;
toDoWelcome.innerHTML = `Welcome Niran`;
// localStorage.clear();

const showTaskCon = document.querySelector('.add-todo');
const overlay = document.querySelector('.overlay');
const inputContainer = document.querySelector('.input-container');
const toDos = [];

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
