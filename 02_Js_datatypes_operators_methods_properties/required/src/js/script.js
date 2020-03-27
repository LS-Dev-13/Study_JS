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
'"Цель заработать ' + mission + ' гривен"' );

// Приводим строку к нижнему регистру, разбиваем на массив, выводим в консоль.
addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(', ');
console.log(addExpenses);

// Объявляем переменную и присваиваем ей значение дневной бюджет/30
let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);





