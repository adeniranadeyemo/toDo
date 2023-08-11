const form = document.getElementById('form1');

const submitBtn1 = document.getElementById('submitBtn');

const inputField1 = document.getElementById('input1');

//

inputField1.addEventListener('input', () => {
  if (inputField1.value.trim() === '') {
    submitBtn1.disabled = true;
  } else {
    submitBtn1.disabled = false;
  }
});

let user;
form.addEventListener('submit', (event) => {
  event.preventDefault();

  user = inputField1.value;

  localStorage.setItem('inputValue', user);
  window.location.href = `todo.html`;

  // localStorage.clear();
});
