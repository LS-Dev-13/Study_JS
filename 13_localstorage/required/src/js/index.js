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


