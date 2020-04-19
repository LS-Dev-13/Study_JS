'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  // подгружаем дела из localStorage
  todoData = JSON.parse(localStorage.getItem('key')) || [];
  
  todoData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = 
      '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' + 
          '<button class="todo-remove"></button>' +
          '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const todoCompletedCheck = li.querySelector('.todo-complete');
    todoCompletedCheck.addEventListener('click', function () {
      item.completed = !item.completed;
      localStorage.setItem('key', JSON.stringify(todoData)); 
      render();
    });

    const todoRemoveBtn = li.querySelector('.todo-remove');
    todoRemoveBtn.addEventListener('click', function () {
      todoData.splice(todoData.indexOf(item), 1);
      localStorage.setItem('key', JSON.stringify(todoData)); 
      render();
    });
  });
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  let newTodo;
  if (headerInput.value.trim() !== '') {
    newTodo = {
      value: headerInput.value,
      completed: false
    };
  } else {
    return alert('Пустое поле добавить нельзя!');
  }
  todoData.push(newTodo);
  // сохраняем данные в localstorage
  localStorage.setItem('key', JSON.stringify(todoData)); 
  // сбрасываем поле воода
  headerInput.value = '';
  render();
});
render();


// const inputText = document.getElementById('myText'),
//       myBtn = document.getElementById('myBtn'),
//       text = document.getElementById('text');

// LOCALSTORAGE //

// первый способ - обращение напрямую к localstorage
// const showText = function () {
//   text.textContent = localStorage.inputText;
// };
// myBtn.addEventListener('click', function(){
//   localStorage.inputText = inputText.value;
//   showText();
// });
// showText();

// методы обращений: getitem - для получения значений
// setitem - для записи нового значения
// const showText = function () {
//   text.textContent = localStorage.getItem('memory');
// };
// myBtn.addEventListener('click', function () {
//   localStorage.setItem('memory', inputText.value);
//   showText();
// });
// // метод удаления значений remove
// localStorage.removeItem('inputText');
// showText();

// COOKIE 
// РАБОТАЮТ ЧЕРЕЗ HTTP СЕРВЕР
// содержатся в document    
// сохраняется 1 за раз
// по умолчанию хранятся сессию
// document.cookie = 'key=value';
// document.cookie = 'key2=value2';
// document.cookie = 'key3=value3';
// document.cookie = 'key=value4';
// управление временем хранения expires
// 1 вариант у объекта data - метод togmtstring - возвращается.
// document.cookie = 'hope=life; expires=Tue, 7 May 2024 00:00:00 GMT';
// 2 вариант - проще. пишем удобную функцию.
// чтобы символы в куки правильно отображались переводят в utf-8. 
// специальной ф-цией переводят в utf-8 и потом декодируют обратно.
// при помощи encodeURI, decodeURI
// function setCookie(key, value, year, month, day, path, domain, secure) {
//   let cookieStr = encodeURI(key) + '=' + encodeURI(value);
//   if (year) {
//     const expires = new Date(year, month-1, day);
//     cookieStr += '; expires=' + expires.toGMTString();
//   }
//    cookieStr += path ? '; path=' + encodeURI(path) : '';
//    cookieStr += domain ? '; domain=' + encodeURI(domain): '';
//    cookieStr += secure ? '; secure' + secure : '';

//    document.cookie = cookieStr;
// }
// setCookie('Привет', 'мир');
// setCookie('Праздник детей', 'Новый Год', 2021, 1, 1);
// // получение куки - все вместе
// console.log(decodeURI(document.cookie));
// чтобы вывести каждое значение отдельно - можно разбить на массив

