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
    expensesItems = document.querySelectorAll('.expenses-items'), // new
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositCheck = document.querySelector('#deposit-check'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    cancelBtn = document.querySelector('#cancel');

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
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();

    this.leftInputsBlock();
    this.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('mousemove', this.getIncomePeriodValue);
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
        this.expenses[itemExpenses] = cashExpenses;
      }
    }, this);
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
    this.income[itemIncome] = cashIncome;  
      }
    }, this);

    for (let key in this.income){
      this.incomeMonth += +this.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== ''){
        this.addExpenses.push(item);
      }
    }, this);
  },
  getAddIncome: function(item) {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        this.addIncome.push(itemValue);
      }
    }, this);
  },
  //Вычислим сумму расходов за месяц функцией + циклом (вопросы)
  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    return;
  },
  //Вычислим месячный и дневной бюджет функцией
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  //Вычислим период достижения цели
  getTargetMonth: function () {
    return targetAmount.value / this.budgetMonth;
  },
  // пишем конструкцию условий для определения уровня дохода функцией
  getStatusIncome: function () {
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay < 1200 && this.budgetDay > 600) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay <= 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
      return ('Что-то пошло не так');
    }
  },
  getInfoDeposit: function () {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент депозита?', 10);
      }
      while (!isNum(this.percentDeposit));
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (!isNum(this.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return this.budgetMonth * periodSelect.value;
  },
  getIncomePeriodValue: function () {
    incomePeriodValue.value = budgetMonthValue.value * periodSelect.value;
  },
  leftInputsBlock: function () {
    let allInputFields = document.querySelectorAll('input[type="text"]');
    allInputFields.forEach(function (item) {
      item.setAttribute('disabled', '');
    });
    startСalc.style.display = 'none';
    cancelBtn.style.display = 'inline-block';
    expensesPlus.style.display = 'none';
    incomePlus.style.display = 'none';
    periodSelect.setAttribute('disabled', 'disabled');
    depositCheck.setAttribute('disabled', 'disabled');
  },
  reset: function(){
    let allInputFields = document.querySelectorAll('input[type="text"]');
    allInputFields.forEach(function (item) {
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
    depositCheck.checked = false;
    periodSelect.value = 1;
    periodAmount.textContent = 1;

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
  },
};

// заблокируем кнопку рассчитать и поставим проверку на поле "месячный доход"
startСalc.setAttribute('disabled', 'disabled');
let salaryAmountCheck = function () {
  if (isNaN(salaryAmount.value) || salaryAmount.value.trim() === '') {
    startСalc.setAttribute('disabled', 'disabled');
  } else {
    startСalc.removeAttribute('disabled');
  }
};

// привяжем контекст всех наших событий к обьекту appData
let bindStartСalc = appData.start.bind(appData),
    bindAddExpensesBlock = appData.addExpensesBlock.bind(appData),
    bindAddIncomeBlock = appData.addIncomeBlock.bind(appData),
    bindReset = appData.reset.bind(appData);

// добавим события на наши кнопки
salaryAmount.addEventListener('change', salaryAmountCheck);
startСalc.addEventListener('click', bindStartСalc);
expensesPlus.addEventListener('click', bindAddExpensesBlock);
incomePlus.addEventListener('click', bindAddIncomeBlock);
cancelBtn.addEventListener('click', bindReset);
// обработка события range
periodSelect.addEventListener('input', function () {
  periodAmount.textContent = periodSelect.value;
});