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
    expensesTitle = document.querySelector('.expenses-items>.expenses-title'),
    expensesAmount = document.querySelector('.expenses-items>.expenses-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
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
    periodSelect.setAttribute('disabled', 'true');
    depositCheck.setAttribute('disabled', 'true');
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

// добавим обработчик событий для старта на кнопку "Расчитать"
startСalc.setAttribute('disabled', 'true');
let salaryAmountCheck = function () {
  if (isNaN(salaryAmount.value) || salaryAmount.value.trim() === '') {
    startСalc.setAttribute('disabled', 'true');
  } else {
    startСalc.removeAttribute('disabled');
  }
};

let bindStartСalc = appData.start.bind(appData),
    bindAddExpensesBlock = appData.addExpensesBlock.bind(appData),
    bindAddIncomeBlock = appData.addIncomeBlock.bind(appData),
    bindReset = appData.reset.bind(appData);

salaryAmount.addEventListener('change', salaryAmountCheck);
startСalc.addEventListener('click', bindStartСalc);
expensesPlus.addEventListener('click', bindAddExpensesBlock);
incomePlus.addEventListener('click', bindAddIncomeBlock);
cancelBtn.addEventListener('click', bindReset);


// обработка событий range
periodSelect.addEventListener('input', function () {
  periodAmount.textContent = periodSelect.value;
});


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




// LESSON14 Наследование, прототипы, конструкторы и классы
// JS - прототипно-ориентированный язык
/* прототип - скрытая ссылка обьекта. 
Это обьект с которого текущий обьект "черпает" недостающие методы и свойства
*/

// let arr = [1, 2, 3, 4, 5];
// console.log(arr.__proto__);
// console.log(Array.prototype);

// let car = {
//   doors: 4,
//   turbocharging: false,
//   ride: function() {
//     console.log('машина едет');
//   }
// };
// сделаем обьект car прототипом для newCar
// наследуются все методы и свойства
// let newCar = Object.create(car);
// newCar.model = 'mazda 3';
// console.log(newCar.doors);
/* метод hasOwnProperty - возвращает булевое. 
проверяет на наличие свойств именно в обьекет, не учитывая что он наследует. */
// console.log(newCar.hasOwnProperty('model'));
// console.log(newCar.hasOwnProperty('doors'));
// можно проверить свойство прототипа
// console.log(newCar.__proto__.hasOwnProperty('model'));
// console.log(newCar.__proto__.hasOwnProperty('doors'));
// isPrototypeof показывает являетяс ли car прототипом newCar
// принимает один параметр - обьект
// console.log(car.isPrototypeOf(newCar));


// *CONSTRUCTORS
/*  - обычная функция, соданная для описания "сущности" (иснтрукция) 
функция вызывается чтобы собрать "пазл" по этой инструкции*/
// выделяется названием с большой буквы
// function Car(model, color) {
//   this.model = model;
//   this.color = color;
// }
 /* new - делает новый обьект в памяти js - вызывает ф-цию Car() 
 прототип Car становится прототипом нового объекта (который в памяти)
 становится this для вызова конструктора - возращает новый объект и мы
 его присваемваем на car1*/
//  * ЭТО И ЕСТЬ 4-Е ПРАВИЛО THIS! 
 // Обьект созданный через оператор new - то this будет указывать на этот объект
// let car1 = new Car('Mazda', 'black');
// console.log(car1);
// Конструктор создаёт "прослойку" в которую можно добавлять свои методы
// console.dir(Car);
// Car.prototype.ride = function () {
//   console.log('ехать');
// };
// car1.ride();
// создадим новый обьект и сравним с первым
// let car2 = new Car('VAZ', 'Grey');
// console.log(car2);
// console.log(car1.ride === car2.ride);

// * КЛАССЫ ООП! 
/* ООП Подход к решению задачи при помощи манипуляции объектами =
= задача разбирается на объекты и помощи них решается*/
/*КЛАСС ООП - абстрактная единица описывающая обьект*/
/*ОБЬЕКТ ООП - создается на основе класса ООП. 
Класс декларирует объект - описывает структуру, саойство, поведение, но не создаёт обьект.
Любой объект это структура которая имеет свойства и методы описанных в классе */ 
// создадим конструктор - класс
// function Car(brand, model, options) {
//   this.brand = brand;
//   this.model = model;
//   options = options || {};
//   this.color = options.color;
//   this.transmission = options.transmission;
// }
// объекты созданы при помощи конструктора на основе класса Car
// let car1 = new Car ('mazda', '3', {color: 'black'}); 
// цвет добавляется, так как описана в конструкторе
// let car2 = new Car ('bmw', 'x6', {ABS: true}); 
// ABS не добавляется, потому что не описан в конструкторе
// Мы можем декларировать "поведение" автомобилей
// Car.prototype.ride = function () {
//   console.log(this.brand + ' ' + this.model + ' ' + 'Поехала!');
// };
//проверим являются ли наши обьекты  частью конструктора(прототипа) Car
// 1-й способ isPrototypeOf
// console.log(Car.prototype.isPrototypeOf(car1));
// 2-й способ instanceof
// console.log(car2 instanceof Car);
// применем наш метод ride (который мы добавили в прототип) для каждого обьекта отдельно
// car1.ride();
// car2.ride();

// * НАСЛЕДОВАНИЕ КЛАССОВ 
// Наследование это "отношение" между классасми.
// Класс использует структуру другого класса = одиночное наследование
// Класс использует структуру многих других классов - множественное наследование
// function Car(countryBuild, options) {
//   this.countryBuild = countryBuild;
//   options = options || {};
//   this.color = options.color;
//   this.transmission = options.transmission;
// }
// создадим метод и конструктора(класса) Car
// Car.prototype.ride = function () {
//   console.log(this.brand + ' ' + this.model + ' Поехала!' );
// };
// создадим ещё один конструктор и привяжем его к нашему Car
// класс Audi наследует класс Car
// function Audi(countryBuild, options, model, type) {
//   this.brand = 'Audi';
//   Car.apply(this, arguments);
//   this.model = model;
//   this.type = type;
// }

// Привяжем прототип функции Сar к прототипу функции Audi
// Audi.prototype = Object.create(Car.prototype);
// Audi.prototype.constructor = Audi;

// let audiQ7 = new Audi ('germany', {color: 'black', transmission: 'auto'}, 'Q7', 'Type S');

// console.log(audiQ7);
// console.log(audiQ7 instanceof Audi);
// console.log(audiQ7 instanceof Car);

// audiQ7.ride();

// * так же работают встроенные конструкторы в JS
// Object на верху цепочки!
// console.log(new Object());




