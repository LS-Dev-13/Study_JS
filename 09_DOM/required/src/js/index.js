'use strict';

// API - application programming interface. в основном реализованы в виде объектов. 
// DOM - document object model. Для работы с элементыами на странице.
// BOM - browser object mode. Для работы браузером.
// XMLHttpRequest(XHR) объекты для взаимодействия с серверами.
// структура - корень(document) - узел (html и все внутри) - листья (конечные без детей)

// console.log(document.parentElement);
// console.log(document.children); // получаем псевдомассив HTML collection
// Способы получения элементов
// getElemenetById
const startСalc = document.getElementById('start');
// getElementsByTagName
const buttonAddFirst = document.getElementsByTagName('button')[0],
      buttonAddSecond = document.getElementsByTagName('button')[1];
// querySelectorAll - nodelist
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
//getElementsByClassName
const budgetMonthValue = document.getElementsByClassName('budget_month-value'),
      budgetDayValue = document.getElementsByClassName('budget_day-value'),
      expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
      additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
      incomePeriodValue = document.getElementsByClassName('income_period-value'),
      targetMonthValue = document.getElementsByClassName('target_month-value');
// querySelector можно по классу, тэгу, айди и атрибуту
const salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-items>.income-title'),
      incomeAmount = document.querySelector('.income-items>.income-amount'),
      expensesTitle = document.querySelector('.expenses-items>.expenses-title'),
      expensesAmount = document.querySelector('.expenses-items>.expenses-amount'),
      expensesItem = document.querySelector('.additional_expenses-item'),
      depositCheck = document.querySelector('#deposit-check'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select');

// console.log(startСalc, buttonAddFirst, buttonAddSecond, additionalIncomeItem, budgetMonthValue, budgetDayValue, expensesMonthValue, additionalIncomeValue, additionalExpensesValue, incomePeriodValue, targetMonthValue, salaryAmount, incomeTitle, incomeAmount, expensesTitle, expensesAmount, expensesItem, depositCheck, depositAmount, depositPercent, targetAmount, periodSelect);


// // querySelector по атрибуту
// console.log(document.querySelector('[title="Основной заголовок"]'));

// // Способы управления элементами
// const mainHead = document.querySelector('h1');
// // console.dir(mainHead.getAttribute('title')); // получаем атрибут переменной
// // работа с атрибутами через setAttribute
// mainHead.setAttribute('title', 'Test Title');
// mainHead.setAttribute('style', 'color:blue');
// // Так как в переменную попадает объект - можно использовать его методы
// mainHead.title = 'Новый title';
// console.log(mainHead.title);
// mainHead.className = 'test_new'; // при таком методе классы заменяются 
// console.log(mainHead.className);
// console.log(mainHead);
// console.log(mainHead.classList); // получаем DOMTokenList и можем посмотреть досутпные методы
// // Самый популярные методы classList = contains, add, remove, toggle
// mainHead.classList.add('class_add');
// console.log(mainHead.classList);
// mainHead.classList.remove('test_new');
// console.log(mainHead.classList);
// //contains делает проверку есть ли класс у данного элемента - возвращает булевое значение
// console.log(mainHead.classList.contains('test_new'));
// console.log(mainHead.classList.contains('class_add'));
// // toggle проверяет есть ли элемент и соответвенно удаляет или добавляет его.
// mainHead.classList.toggle('class_add');
// console.log(mainHead.classList.contains('class_add'));
// mainHead.classList.toggle('class_add');
// console.log(mainHead.classList.contains('class_add'));
// mainHead.classList.toggle('class_add');
// console.log(mainHead.classList.contains('class_add'));
// mainHead.classList.toggle('class_add');
// console.log(mainHead.classList);

// // style мы работает со свойствами только с DOM (без файла css, елементов style в HTML и т.д.)
// console.log(mainHead.style);
// mainHead.style.color = '#fff';
// document.body.style.backgroundColor = '#000';
// mainHead.style.fontSize = '40px';
// // получение свойcтв файла css
// // getComputedStyle (api) метод возвращает объект сразу со всеми свойствами
// const computedStyleMainHead = getComputedStyle(mainHead);
// // после запятой в параметрах можно получать псевдоэлементы
// // const computedStyleMainHeadAfter = getComputedStyle(mainHead, 'after');
// console.log(computedStyleMainHead.marginTop);

// // queryselector можно юзать и на самих єлементах
// // вариант 1. получить отдельный эллемент и после внутри него найти нужные.
// const label2 = document.querySelector('label');
// let deposit = label2.querySelectorAll('.btn_plus');
// console.log('deposit: ',  deposit);
// // вариант 2 используем вложенность селекторов
// deposit = document.querySelectorAll('label>.btn_plus'); // знак > = дочерниеэлементы. а пробел - просто внутри.
// console.log(deposit);












// выведем всконсоль для каждого элемента сколько справа от него элементов меньше.
// const func = function(arr) {
//   let arr1 = [],
//       num;
//     for (let el = 0; el < arr.length; el++) {
//       num = 0;
//     for (let i = el; i < arr.length; i++) {
//       if (arr[i] < arr[el]){
//         num++;
//       }
//     }
//     arr1.push(num);
//   } 
//   return arr1;
// };
// console.log(func([1,4,0,3,2,1]));