'use strict';

const startСalc = document.getElementById('start'),
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
    expensesTitle = document.querySelector('.expenses-items>.expenses-title'),
    expensesAmount = document.querySelector('.expenses-items>.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositCheck = document.querySelector('#deposit-check'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositBank = document.querySelector('.deposit-bank'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    cancelBtn = document.querySelector('#cancel');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

// проверяем на тип данных (число) и конечное ли. универсальная.
const isNum = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isText = (n) => {
  return !isNaN(n) && isFinite(n);
};


class AppData {

  constructor(expensesMonth = 0, budgetMonth = 0, budgetDay = 0, budget = 0, 
    income = {}, incomeMonth = 0, addIncome = [], expenses = {}, addExpenses = [], 
    deposit = false, percentDeposit = 0, moneyDeposit = 0) {

    this.expensesMonth = expensesMonth;
    this.budgetMonth = budgetMonth;
    this.budgetDay = budgetDay;
    this.budget = budget;
    this.income = income;
    this.incomeMonth = incomeMonth;
    this.addIncome = addIncome;
    this.expenses = expenses;
    this.addExpenses = addExpenses;
    this.deposit = deposit;
    this.percentDeposit = percentDeposit;
    this.moneyDeposit = moneyDeposit;

    startСalc.setAttribute('disabled', true);
}

start () {
  this.budget = +salaryAmount.value;
  this.salaryAmountCheck();
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getInfoDeposit();
  this.getBudget();
  this.getTargetMonth();
  this.getTargetMonthRes();

  this.leftInputsBlock();
  this.showResult();
}

salaryAmountCheck() {
  if (isNaN(salaryAmount.value) || salaryAmount.value.trim() === '') {
    startСalc.setAttribute('disabled', true);
  } else {
    startСalc.removeAttribute('disabled');
  }
}

showResult() {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcSavedMoney();
  periodSelect.addEventListener('mousemove', this.getIncomePeriodValue);
}

addExpensesBlock() {
  const cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    expensesPlus.style.display = 'none';
  }
}

getExpenses() {
  expensesItems.forEach((item) => {
    const itemExpenses = item.querySelector('.expenses-title').value;
    const cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = +cashExpenses;
    }
  });
}

addIncomeBlock() {
  const cloneIncomeItems = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    incomePlus.style.display = 'none';
  }
}

getIncome() {
  incomeItems.forEach((item) => {
    const itemIncome = item.querySelector('.income-title').value;
    const cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      this.income[itemIncome] = +cashIncome;
    }
  });

  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
}

getAddExpenses() {
  const addExpenses = additionalExpensesItem.value.split(', ');
  addExpenses.forEach((item) => {
    item = item.trim();
    if (item !== '') {
      this.addExpenses.push(item);
    }
  });
}

getAddIncome() {
  additionalIncomeItem.forEach((item) => {
    const itemValue = item.value.trim();
    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  });
}

//Вычислим сумму расходов за месяц функцией + циклом (вопросы)
getExpensesMonth() {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
  return;
}

//Вычислим месячный и дневной бюджет функцией
getBudget() {
  const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
}

//Вычислим период достижения цели
getTargetMonth() {
  return targetAmount.value / this.budgetMonth;
}

// пишем конструкцию условий для определения когда будет достигнута цель
getTargetMonthRes() {
  if (this.getTargetMonth() <= 0) {
    console.log('Цель не будет достигнута');
  } else {
    console.log('Цель будет достигнута за ' + Math.ceil(this.getTargetMonth()) + ' месяца');
  }
}

// пишем конструкцию условий для определения уровня дохода функцией
getStatusIncome() {
  if (this.budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (this.budgetDay < 1200 && this.budgetDay > 600) {
    return ('У вас средний уровень дохода');
  } else if (this.budgetDay <= 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else if (this.budgetDay < 0) {
    return ('Что-то пошло не так');
  }
}

calcSavedMoney() {
  return this.budgetMonth * periodSelect.value;
}

getIncomePeriodValue() {
  incomePeriodValue.value = budgetMonthValue.value * periodSelect.value;
}

leftInputsBlock() {
  const allInputFields = document.querySelectorAll('input[type="text"]');
  allInputFields.forEach((item) => {
    item.setAttribute('disabled', '');
  });
  startСalc.style.display = 'none';
  cancelBtn.style.display = 'inline-block';
  expensesPlus.style.display = 'none';
  incomePlus.style.display = 'none';
  depositCheck.setAttribute('disabled', true);
  depositBank.setAttribute('disabled', true);
}

reset() {
  const allInputFields = document.querySelectorAll('input[type="text"]');
  allInputFields.forEach((item) => {
    item.value = '';
    item.removeAttribute('disabled');
  });

  for (let i = 1; i < incomeItems.length; i++) {
    incomeItems[i].parentNode.removeChild(incomeItems[i]);
  }
  for (let i = 1; i < expensesItems.length; i++) {
    expensesItems[i].parentNode.removeChild(expensesItems[i]);
  }

  startСalc.style.display = 'inline-block';
  cancelBtn.style.display = 'none';
  expensesPlus.style.display = 'inline-block';
  incomePlus.style.display = 'inline-block';
  periodSelect.removeAttribute('disabled');
  depositCheck.removeAttribute('disabled');
  startСalc.setAttribute('disabled', true);
  depositCheck.checked = false;
  periodSelect.value = 1;
  periodAmount.textContent = 1;
  depositPercent.style.display = 'none';
  depositBank.style.display = 'none';
  depositAmount.style.display = 'none';
  depositBank.value = '';

  this.expensesMonth = 0;
  this.budgetMonth = 0;
  this.budgetDay = 0;
  this.budget = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
}

getInfoDeposit() {
  if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
  }
}

changePercent() {
  const valueSelect = this.value;
  if (valueSelect === 'other') {
    depositPercent.style.display = 'inline-block'; 
    depositPercent.value = '';
    startСalc.setAttribute('disabled', true); 
    depositPercent.addEventListener('change', () => {
      if (isNaN(depositPercent.value) || depositPercent.value.trim() === '' ||
        depositPercent.value > 100 || depositPercent.value <= 0) {
        startСalc.setAttribute('disabled', true);
        alert("Введите корректное значение в поле проценты от 0 до 100");
        return;
      } else {
        startСalc.removeAttribute('disabled');
      } 
    });
  } else {
    startСalc.removeAttribute('disabled');
    depositPercent.value = valueSelect;
    depositPercent.style.display = 'none';
  }
}

depositHandler() {
  if (depositCheck.checked) {
    depositBank.style.display = 'inline-block';
    depositAmount.style.display = 'inline-block';
    this.deposit = true;
    depositBank.addEventListener('change', this.changePercent);
    depositBank.removeAttribute('disabled');
  } else {
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositBank.value = '';
    depositAmount.value = '';
    depositPercent.value = '';
    this.deposit = false;
    depositBank.removeEventListener('change', this.changePercent);
  }
}

eventsListeners() {
  salaryAmount.addEventListener('change', this.salaryAmountCheck.bind(this));
  startСalc.addEventListener('click', this.start.bind(this));
  expensesPlus.addEventListener('click', this.addExpensesBlock);
  incomePlus.addEventListener('click', this.addIncomeBlock);
  cancelBtn.addEventListener('click', this.reset.bind(this));
  // обработка событий range
  periodSelect.addEventListener('input', () => {
    periodAmount.textContent = periodSelect.value;
  });

  depositCheck.addEventListener('change', this.depositHandler.bind(this));
}
}

const appData = new AppData();
appData.eventsListeners();

// выведем в консоль
// console.log('Наша программа включает в себя данные: ');
// for (let key in appData) {
//   console.log(key + ':' + appData[key]);
// }