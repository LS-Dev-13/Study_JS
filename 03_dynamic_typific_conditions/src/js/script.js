'use strict';


// console.log(confirm('Тебе есть 18 лет?'));

// let question = confirm('Тебе есть 18 лет?');
// let question2 = +prompt('Cколько тебе лет?', '18');
// console.log('question2: ', question2);
// console.log(typeof question2);
// console.log('question: ',typeof question);

// console.log(5 + '5');
// console.log(typeof (5 + '5'));

// console.log(5 - '5');
// console.log(5 * '5');
// console.log('js' / '5');

// console.log(5 === '5');


// console.log(Boolean(5));
// console.log(!!5);
// console.log(!!'js');

// console.log(String([1,2,3]));
// console.log(typeof ''+([1,2,3]));
// console.log(typeof ([1,2,3] .toString()));
// console.log(typeof (10..toString()));

// console.log(typeof Number('33'));
// console.log(typeof +('10'));

// let n = '10';
// n *= 1;
// console.log('n: ',typeof n);
// console.log('n: ', n);

// console.log(parseInt('10ff px', 16));
// console.log(parseFloat('10.5 px'));

/*

Если (жарко) {
  одеваем шорты;
  одеваем футболку;
} иначе {
  одеваем джинсы;
  одеваем кофту;
}

*/

// if (true) console.log('истина');
// if (false) console.log('не выполняется');

// let n = 3;
// if (n === 55){
//   console.log('command 1');
//   console.log('command 2');
// } else if(n === 4){
//   console.log('не верно');
// } else {
//   console.log('не верно2');
// }

// switch (n){
//   case 3:
//   case 4:
//   case 5:
//     console.log('3-5');
//     break;
//   case 6:
//     console.log(6);
//     break;
//   default:
//     console.log('ne verno');
// }

// let result = n === 5 ? '1b' : '0a';
// console.log('result: ', result);

// Объявляем переменную (Var (es5), Let, Const (es6))
let
  money = 20000,
  income = 'Freelance',
  addExpenses = 'Apartment, Food, Study',
  deposit = true,
  mission = 60000,
  period = 12;
// выводим переменные в консоль
console.log(money, income, addExpenses, deposit, mission, period);
// Выводим тип данных значений переменных
console.log(typeof deposit);
console.log(typeof income);
console.log(typeof money);
// Выводим длину строки переменной
console.log(addExpenses.length);
// Подставляем значение переменных в текст. Выводим в консоль
console.log('"Период равен ' + period + ' месяцев"' + ' и ' +
  '"Цель заработать ' + mission + ' гривен"');
// Приводим строку к нижнему регистру, разбиваем на массив, выводим в консоль.
addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(', ');
console.log(addExpenses);
// Объявляем переменную и присваиваем ей значение дневной бюджет/30
let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);

//less03
//Выводим окно с вопросом и записываем ответ в переменную
money = +prompt('Ваш месячный доход?');
console.log('money: ', money);
addExpenses = prompt
  ('Перечислите возможные расходы за расчитываемый период через запятую');
console.log('addExpenses: ', addExpenses);
deposit = confirm('Есть ли у вас депозит в банке?');
console.log('deposit: ', deposit);
// Определим статьи расходов и их сумму
let expenses1 = prompt('Введите обязательную статью расходов №1?');
let amount1 = +prompt('Во сколько это обойдется №1?');
let expenses2 = prompt('Введите обязательную статью расходов №2?');
let amount2 = +prompt('Во сколько это обойдется №2');
console.log(expenses1, amount1, expenses2, amount2);
//Вычислим месячный бюджет, необходимых месяцев для достижения mission, budgetDay
let budgetMonth = money - (amount1 + amount2);
console.log('budgetMonth: ', budgetMonth);
let missionTime = mission / budgetMonth;
console.log('Цель будет достигнута: ', Math.ceil(missionTime));
budgetDay = budgetMonth / 30;
console.log('budgetDay: ', Math.floor(budgetDay));
// пишем конструкцию условий для определения уровня дохода
if (budgetDay >= 1200){
  console.log('У вас высокий уровень дохода');
} else if (budgetDay < 1200 && budgetDay > 600) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay <= 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
  console.log('Что-то пошло не так');
}

