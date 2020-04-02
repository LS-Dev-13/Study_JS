// этот код работает в современном режиме
'use strict';
// проверяем на тип данных (число) и конечное ли
function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
//объявляем переменные
let
  money = 20000,
  income = 'Freelance',
  addExpenses = 'Apartment, Food, Study',
  deposit = true,
  mission = 60000,
  period = 12;
// узнаем тип и значение переменных функцией 
let showTypeOf = function(data) {
  console.log(data, typeof(data));
};
showTypeOf(deposit);
showTypeOf(income);
showTypeOf(money);

// Приводим строку к нижнему регистру, разбиваем на массив, выводим в консоль.
addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(', ');
console.log(addExpenses);

//Выводим окно с вопросом и записываем ответ в переменную
money = +prompt('Ваш месячный доход?', 25000);
addExpenses = prompt
  ('Перечислите возможные расходы за расчитываемый период через запятую', 'Квартира, Машина, Еда');
deposit = confirm('Есть ли у вас депозит в банке?');
// Определим статьи расходов и их сумму
let expenses1 = prompt('Введите обязательную статью расходов №1?', 'квартира');
let amount1 = +prompt('Во сколько это обойдется №1?', 7777);
let expenses2 = prompt('Введите обязательную статью расходов №2?', 'продукты');
let amount2 = +prompt('Во сколько это обойдется №2', 6666);

//Вычислим сумму расходов за месяц функцией
function getExpensesMonth(a, b){
  return a + b;
}
let ExpensesMonth = getExpensesMonth(amount1, amount2);
console.log('ExpensesMonth: ', ExpensesMonth);
//Вычислим месячный бюджет (накопление) функцией
function getAccumulatedMonth(a, b){
  return a - b;
}
let AccumulatedMonth = getAccumulatedMonth(money, ExpensesMonth);
console.log('AccumulatedMonth: ', AccumulatedMonth);
//Вычислим период достижения цели
function getTargetMonth(a, b){
  return a / b;
}
let targetMonth = getTargetMonth(mission, AccumulatedMonth);
console.log('Цель будет достигнута: ', Math.ceil(targetMonth));
//Вычисляем дневной бюджет 
//Хотел использовать getAccumulatedMonth, но одна функция - одна цель
function getBudgetDay(a, b){
  return a / b;
}
let budgetDay = getBudgetDay(AccumulatedMonth, 30);
console.log('budgetDay: ', Math.floor(budgetDay));

// пишем конструкцию условий для определения уровня дохода функцией
let getStatusIncome = function(){
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