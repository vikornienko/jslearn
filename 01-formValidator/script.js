const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Функция для вывода сообщения об ошибке
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Функция для вывода сообщения об успешном заполнении поля
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Функция для проверки корректности электронной почты
function emailIsValid(email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(email.value.trim())) {
        showSuccess(email);
    } else {
        showError(email, 'Электронная почта указана не корректно.');
    }
}

// Функция для проверки обязательного заполнения полей
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} требует заполнения`)
        } else {
            showSuccess(input);
        }       
    });
}

// Функция для проверки длинны введенного значения
function checkLength(input, min, max) {
    if(input.value.lenghth < min) {
        showError(input, `Значение ${getFieldName(input)} должно быть больше ${min} символов.`);
    } else if(input.value.lenghth > max) {
        showError(input, `Значение ${getFieldName(input)} должно быть меньше ${max} символов.`);
    } else {
        showSuccess(input);
    }
}

// Функция для проверки совпадения пароля.
function checkPasswords(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Пароль не совпадает.')
    }
}

// Функция для получения имени поля
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Слушатель событий
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 8, 16);
    emailIsValid(email);
    checkPasswords(password, password2);    
})