'use strict';

// Способы получения элементов
// getElemenetById
let startСalc = document.getElementById('start'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    // incomeTitle = document.querySelector('.income-items>.income-title'),
    // incomeAmount = document.querySelector('.income-items>.income-amount'),
    // expensesTitle = document.querySelector('.expenses-items>.expenses-title'),
    // expensesAmount = document.querySelector('.expenses-items>.expenses-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'), // new
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositCheck = document.querySelector('#deposit-check'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

// проверяем на тип данных (число) и конечное ли. универсальная.
function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isText(n) {
  return !isNaN(n) && isFinite(n);
}
// узнаем месячный доход при помощи функции + цикла на проверку данных
let appData = {
  expensesMonth: 0,
  budgetMonth: 0,
  budgetDay: 0,
  budget: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function () {
    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getInfoDeposit();
    appData.getBudget();

    appData.showResult();
    console.log(appData.getStatusIncome());
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcSavedMoney();
    periodSelect.addEventListener('mousemove', appData.getIncomePeriodValue);
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  addIncomeBlock: function () {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
      incomePlus.style.display = 'none';
    }
  },
  getIncome: function(){
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
      appData.income[itemIncome] = cashIncome;  
      }
    });

    for (let key in appData.income){
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function(item) {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },
  //Вычислим сумму расходов за месяц функцией + циклом (вопросы)
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
    return;
  },
  //Вычислим месячный и дневной бюджет функцией
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  //Вычислим период достижения цели
  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
  },
  // пишем конструкцию условий для определения уровня дохода функцией
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay < 1200 && appData.budgetDay > 600) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay <= 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay < 0) {
      return ('Что-то пошло не так');
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент депозита?', 10);
      }
      while (!isNum(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (!isNum(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * periodSelect.value;
  },
  getIncomePeriodValue: function () {
    incomePeriodValue.value = budgetMonthValue.value * periodSelect.value;
  },
};

// добавим обработчик событий для старта на кнопку "Расчитать"
startСalc.setAttribute('disabled', 'disabled');
let salaryAmountCheck = function () {
  if (isNaN(salaryAmount.value) || salaryAmount.value.trim() === '') {
    startСalc.setAttribute('disabled', 'disabled');
  } else {
    startСalc.removeAttribute('disabled');
  }
};
salaryAmount.addEventListener('change', salaryAmountCheck);
startСalc.addEventListener('click', appData.start);
  
// добавим ОС для добавления  расходов и доходов
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
// обработка событий range
periodSelect.addEventListener('input', function () {
  periodAmount.textContent = periodSelect.value;
});
// periodSelect.addEventListener('change', eventFunc);


// if (appData.getTargetMonth() <= 0) {
//   console.log('Цель не будет достигнута');
// } else {
//   console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
// }



// выведем в консоль
// console.log('Наша программа включает в себя данные: ');
// for (let key in appData) {
//   console.log(key + ':' + appData[key]);
// }




// Обработчики событий


// старый!! метод onclick. можно вешать прямо на элемент в верстке.
// попробуем ограничить количество кликов - после ичерпания числа кликов
// метод все равно остаётся на элементе!
// let count = 0;
// console.dir(buttonAddFirst);
// buttonAddFirst.onclick = function(){
//   if(count === 3){
//     console.log('клякс!');
//     buttonAddFirst.onclick = null;
//     return;
//   }
//   count++;
//   console.log('Вы кликнули на плюсик');
// };
// // если повесить ещё один onclick - он перезапишется и выполняется только новая ф-ция.
// buttonAddFirst.onclick = function(){
//   console.log('click 2 func');
// };


// ADDEVENTLISTENER - "слушатель событий". принимает 3 параметра.
// 2 обязательных. 1-й - указываем события. 2-й передаем функцию.
// можем на один клик повесить несколько разных обработчиков событий
// buttonAddFirst.addEventListener('click', function(){
//   console.log('check click eventlistener');
// });
// buttonAddFirst.addEventListener('click', function(){
//   console.log('check click eventlistener2');
// });

// МЕТОД remoteEventListener. нужно использовать именную функцию.
// можно удалить метод eventlistener с элемента.
// let count = 0;
// let clicked = function(){
//   count++;
//   if(count === 3) buttonAddFirst.removeEventListener('click', clicked);
//   console.log('check removeEventListener');
// };
// buttonAddFirst.addEventListener('click', clicked); 

// ОБЪЕКТ СОБЫТИЯ (есть у каждого события). Доступен только функции обработчика события.
// первым параметром функции указываем имя обработчика. метод event.
// let eventFunc = function(event) {
//   console.log(event.type);
//   console.log(event.target.value);
// };
// // существует разные Об.соб. мышки
// buttonAddFirst.addEventListener('click', eventFunc); // составное событие из двух нижних
// buttonAddFirst.addEventListener('mousedown', eventFunc); // нажатие кнопки мышки
// buttonAddFirst.addEventListener('mouseup', eventFunc); // отпускаем кнопку
// buttonAddFirst.addEventListener('mousemove', eventFunc); // срабатывает каждые 3-5 пикселей.
// buttonAddFirst.addEventListener('mouseenter', eventFunc); // наведение на элемент не работает на детей
// buttonAddFirst.addEventListener('mouseleave', eventFunc); // убираем мышку с элемента не работает на детей
// buttonAddFirst.addEventListener('mouseover', eventFunc); // события срабатывают доп. на детей
// buttonAddFirst.addEventListener('mouseout', eventFunc); // события срабатывают доп. на детей


// обработчики событий инпутов

// salaryAmount.addEventListener('input', eventFunc);
// salaryAmount.addEventListener('change', eventFunc); 
// /* change запоминает значение value при фокусе и сравнивает с тем, когда убираем фокус
// если valute=true - событие не срабатывает. false - срабатывает*/
// salaryAmount.addEventListener('keyup', eventFunc); // срабатыает при нажатии кнопки
// salaryAmount.addEventListener('keydown', eventFunc); // срабатыает при отпускании кнопки
// срабатывает при нажатии любой кнопки. используют при валидации на не нужные символы
// salaryAmount.addEventListener('blur', eventFunc); // срабатыает при "потере" фокуса
// salaryAmount.addEventListener('focus', eventFunc); // срабатывает при нажатии на элемент

// обработка событий range
// periodSelect.addEventListener('change', eventFunc); // срабатывает при изменении


// события загрузки html документа

// состоит из 3-х стадий: 
/* 1- dom content loader - браузер полностью загрузил html и построил dom дерево
2 - load - когда браузер загрузил все ресурсы
3 - unload - уход со страницы */
// // dom content loader - происходит на самом документе
// document.addEventListener('DOMContentLoaded', function() {
//   console.log('страница загрузилась');
// });

// // DCL используют для запуска скрипта всей страницы. ставим перед use strict.
// // В таком случае js ждет загрузку html страницы и после запускает скрипты.

// /* есть событие window onload - срабатывает при загрузке всей страницы включаее её
// ресурсы, стили, картинки, фреймы и т.д. используется редко - замедляет загрузку страницы.
// в основном вешается на определённый ресурс */

// /* Ещё есть событие window onunload. когда человек уходит со стсраницы или закрыает окно
// в нем можно сделать что-то что не требует ожидания (закрыть popup окна), но отменить
// сам переход нельзя */

// /* зато есть события onbeforeunload - используется чаще. можено отменить переход со страницы.
// например вывести сообщение "вы уверены что хотите закрыть страницу" или "вы сохранили все данные?" */
// window.onbeforeunload = function () {
//   return 'Вы уверены что хотите выйти?';
// };
// // современные браузеры перехватывают сообщение и пишут своё.


// метод event.preventDefault()
// этот метод меняет стандартное событие(поведение) браузера
// пример на ссылке
// document.querySelector('a').addEventListener('click', function (event) {
//   event.preventDefault();
//   console.log('click on a');
// })
// // отмена правого клика (контекстного меню). например для реализации своего контекстного меню
// document.addEventListener('contextmenu', function (event) {
//   event.preventDefault();
// })

// ВСПЛЫТИЕ И ЗАХВАТ СОБЫТИЙ
// event.target - "виновник события на который мы кликнули"
// current.target - элемент в котором в данный момент событие обрабатыается. они не всегда совпадают.

// let clickElem = null;
// function greenHundler(event) {
//   if(clickElem){
//     clickElem.classList.remove('green');
//   }
//   clickElem = event.currentTarget;
//   clickElem.classList.add('green');
// }

// // всплытие событий
// startСalc.addEventListener('click', greenHundler);
// document.querySelector('body').addEventListener('click', greenHundler);

// // захват событий. передаём 3-м значением true.
// startСalc.addEventListener('click', greenHundler, true);
// document.querySelector('body').addEventListener('click', greenHundler, true);

// Захват события netscape (chrome и т.д.) - отрабатывает document-html-body-div-el....
// Всплытие событий (bubling) (focus, blur не всплывают) - отрабатывает в обрадтном порядке -
// el...div...body-html-document
// Сейчас пришли к единому стандарту: СНАЧАЛА ЗАХВАТ СОБЫТИЯ и после этого ВСПЛЫВАЕТ!!!




