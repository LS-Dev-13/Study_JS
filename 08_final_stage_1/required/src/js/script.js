// этот код работает в современном режиме

'use strict';
// проверяем на тип данных (число) и конечное ли. универсальная.
function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function isText(n) {
  return !isNaN(n) && isFinite(n);
}
// узнаем месячный доход при помощи функции + цикла на проверку данных
let money,
  start = function () {
    do {
      money = prompt('Ваш месячный доход?');
    }
    while (!isNum(money));
  };
start();
let appData = {
  expensesMonth: 0,
  budgetMonth: 0,
  budgetDay: 0,
  budget: money,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 60000,
  period: 12,
  asking: function () {
    if (confirm('Есть ли у Вас источник дополнительного заработка?')) {
      let itemIncome,
        cashIncome;
      do {
        itemIncome = prompt('Какой у Вас есть дополнительный заработок?', 'Таксую');
      }
      while (isText(itemIncome));
      do {
        cashIncome = prompt('Сколько в месяц Вы на этом зарабатываете?', 10000);
      }
      while (!isNum(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses;
    do {
      addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');
    }
    while (isText(addExpenses));
    addExpenses = addExpenses.split(', ');

    appData.addExpenses = function () {
      let res = [];
      let result;
      for (let i = 0; i < addExpenses.length; i++) {
        res.push(addExpenses[i].charAt(0).toUpperCase() + addExpenses[i].substr(1).toLowerCase());
      }
      result = res.join(', ');
      console.log('result: ', result);
    };
    appData.addExpenses();

    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let expenses,
        cost;
      do {
        expenses = prompt('Введите обязательную статью расходов?');
      }
      while (isText(expenses));
      do {
        cost = prompt('Во сколько это обойдется?');
      }
      while (!isNum(cost));
      appData.expenses[expenses] = cost;
    }
  },
  //Вычислим сумму расходов за месяц функцией + циклом (вопросы)
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    } return;
  },
  //Вычислим месячный и дневной бюджет функцией
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  //Вычислим период достижения цели
  getTargetMonth: function () {
    return appData.mission / appData.budgetMonth;
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
    return appData.budgetMonth * appData.period;
  }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();

console.log('Сумма расходов за месяц: ' + appData.expensesMonth);

if (appData.getTargetMonth() <= 0) {
  console.log('Цель не будет достигнута');
} else {
  console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
}

console.log(appData.getStatusIncome());

// выведем в консоль
console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
  console.log(key + ':' + appData[key]);
}