'use strict';

// Способы получения элементов
// getElemenetById
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
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
}
//Вычислим период достижения цели
getTargetMonth() {
  return targetAmount.value / this.budgetMonth;
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
getInfoDeposit() {
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
}
}

const appData = new AppData();
appData.eventsListeners();




// * GET, SET, DEFINEPROPETY

// * DEFINEPROPERTY
// const car = {
//   brand: 'mazda',
//   model: 3,
//   year: 2006
// };
// Способы добавление свойств в объект 
// 1-й. mazda.color = 'blue';
// 2-й  mazda['color'] = 'blue';
// 3-й - definePROPERTY
// Object.defineProperty(car, 'color', {
//   value: 'red', // значение
//   writable: false, // разрешение на перезапись
//   configurable: false, // разрешение на удаление
//   enumerable: false // разрешение на видимость во время цикла
// });
// * точно так же можно менять значение уже существующего свойства
// delete mazda.color;
// for (let key in mazda){
//   console.log(key, mazda[key]);
// }

// * SETTER, GETTER
// const car = {
//       brand: 'mazda',
//       model: 3,
//       year: 2006,
//       get fullTitle() {
//         return this.brand + ' ' + this.model;
//       },
//       set fullTitle(value) {
//         this.brand = value;
//       }
//     };
// // Object.defineProperty(car, 'fullTitle', {
// //   // get - позволяет получать значения с объекта (const)
// //   // es6+ можно юзать get,set внутри объекта
// //   get: function() {
// //     return this.brand + ' ' + this.model;
// //   },
// //   set: function(val) {
// //     this.brand = val;
// //   }
// // });
// car.fullTitle = 'BMW';
// console.log(car.fullTitle); // fullTitle - св-во геттера. геттер - ф-ция
// console.log(car);

// //* CLASSES
// class CarWash {
//   constructor(brand, model = CarWash.noCarBaseModel(), services = []){
//     this.brand = brand;
//     this.model = model;
//     this.washed = false;
//     this._services = services; // _services = _ говорит что это инкапсуляция - запрет доступа из вне
//   }

//   //static method
//   // его нельзя вызвать вне своего объекта!!!
//   static noCarBaseModel(){
//     return 'none';
//   }

//   washReady(){
//     this.washed = true;
//     CarWash.counter++;
//     this.report();
//   }
//   report(){
//     console.log(this.brand, this.model, this.washed );
//   }

//    // к классам можноо использовать геттеры и сеттеры и влиять на значчения инкапсулируемых перемменных
//    get services(){
//      // если бы не использовали инкапсуляцию - то сервисы бы заменились. а таким способом - добавляются.
//      console.log(this.brand + ' ' + this.model + ' ' + this._services);
//      return this._services.length > 0 ? 'Есть доп услуги' : 'Нет доп услуг';
//    }

//    set services(addServices){
//      return this._services.push(addServices);
//    }


// }

// // методы и свойства создаются вне объекта
// // нельзя вызвать вне объекта = undefined (попытка вызова ниже)
// CarWash.counter = 0;

// const car1 = new CarWash('mazda', 3, ['black tires', 'wax']);
// const car2 = new CarWash('BMW', 'X7');
// const car3 = new CarWash('Volvo', 'S80');
// const car4 = new CarWash('ZAZ');

// // console.log(car1.counter);
// car1.washReady();
// car2.washReady();
// car3.washReady();
// car4.washReady();

// car1.services = 'Wash Glass';
// car2.services = 'Wash Glass';
// console.log(car1.brand + ' ' + car1.model + ' ' + car1.services);
// console.log(car2.brand + ' ' + car2.model + ' ' + car2.services);

// console.log(CarWash.counter);

// //* Наследование классов. Сюда вошли методы необходимы "Максимально минимально"
// //* В наследовниях в es6 не вошли приватные защищённые свойства - доступyны снаружи
// //* Но в новом синтаксесе появились коллекции. Коллекиця WeakMap - позводяет создавать приватные свойства.
// class PassCar extends CarWash{
//   // для создания конструктора у наследуемого класса используется слово super
//   constructor(brand, model, service, pass = 5) {
//     super(brand, model, service);
//     this.pass = pass;
//   }
//   // можно создавать свои методы или изменять который есть
//   washReady() {
//     super.washReady();
//     this.reportOffice();
//   }

//   reportOffice(){
//     console.log('На мойке для легковых была помыта машина');
//   }
// }

// const car5 = new PassCar('BMW', 'X7');
// car5.washReady();
// car5.services = 'Wash Glass';
// console.log(car1);
// console.log(car5);







// let bindStartСalc = appData.start.bind(appData),
//     bindAddExpensesBlock = appData.addExpensesBlock.bind(appData),
//     bindAddIncomeBlock = appData.addIncomeBlock.bind(appData),
//     bindReset = appData.reset.bind(appData),
//     bindSalaryAmountCheck = appData.salaryAmountCheck.bind(appData);

// salaryAmount.addEventListener('change', bindSalaryAmountCheck);
// startСalc.addEventListener('click', bindStartСalc);
// expensesPlus.addEventListener('click', bindAddExpensesBlock);
// incomePlus.addEventListener('click', bindAddIncomeBlock);
// cancelBtn.addEventListener('click', bindReset);

// // обработка событий range
// periodSelect.addEventListener('input', function () {
//   periodAmount.textContent = periodSelect.value;
// });


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




