// этот код работает в современном режиме
'use strict';
// проверяем на тип данных (число) и конечное ли. универсальная.
function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//объявляем переменные
let
  money,
  income = 'Freelance',
  addExpenses = 'Apartment, Food, Study',
  deposit = true,
  mission = 60000,
  period = 12;
// узнаем тип и значение переменных функцией 
let showTypeOf = function (data) {
  console.log(data, typeof (data));
};
showTypeOf(deposit);
showTypeOf(income);
showTypeOf(money);

// Приводим строку к нижнему регистру, разбиваем на массив, выводим в консоль.
console.log(addExpenses.toLowerCase().split(', '));

//Выводим prompt с вопросом и записываем ответ в переменную
// узнаем месячный доход при помощи функции + цикла на проверку данных
let start = function () {
  do{
    money = prompt('Ваш месячный доход?');
  }
  while (!isNum(money));
};
start();

addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

// Определим статьи расходов и их сумму
let expenses = [];
//Вычислим сумму расходов за месяц функцией + циклом (вопросы)
let getExpensesMonth = function(){
  let sum = 0;
  let cost;
  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');
  do{
    cost = prompt('Во сколько это обойдется?');
    if (isNum(cost)){
      sum += +cost;
    }
  }
  while (!isNum(cost));
}
  console.log(expenses);
  return sum;
};
let ExpensesMonth = getExpensesMonth();
console.log('Расходы за месяц: ' + ExpensesMonth);

//Вычислим месячный бюджет (накопление) функцией
function getAccumulatedMonth(a, b) {
  return a - b;
}
let AccumulatedMonth = getAccumulatedMonth(money, ExpensesMonth);
console.log('AccumulatedMonth: ', AccumulatedMonth);
//Вычислим период достижения цели

let getTargetMonth = function(a, b) {
  return a / b;
};
let targetMonth = getTargetMonth(mission, AccumulatedMonth);

if (targetMonth <= 0) {
  console.log('Цель не будет достигнута');
} else {
  console.log('Цель будет достигнута: ', Math.ceil(targetMonth));
}


//Вычисляем дневной бюджет 
//Хотел использовать getAccumulatedMonth, но одна функция - одна цель
function getBudgetDay(a, b) {
  return a / b;
}
let budgetDay = getBudgetDay(AccumulatedMonth, 30);
console.log('budgetDay: ', Math.floor(budgetDay));

// пишем конструкцию условий для определения уровня дохода функцией
let getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budgetDay < 1200 && budgetDay > 600) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay <= 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else if (budgetDay < 0) {
    return ('Что-то пошло не так');
  }
};
console.log(getStatusIncome());