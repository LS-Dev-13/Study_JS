'use strict';

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
    expensesItems = document.querySelectorAll('.expenses-items'),
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

// добавим обработчик событий для старта на кнопку "Расчитать". и будем включать только после проверки.
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