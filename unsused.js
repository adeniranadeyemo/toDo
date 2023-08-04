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
