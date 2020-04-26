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


// * LESS16 REST, SPREAD, DESTRUCRAZITATION, MAP, SET

// * REST ПАРАМЕТР - используем если нужно принять неизвестно кол-во параметров
// // Старый вариант - используем псевдомасссив arguments и конвертировать в обычный массив
// function test() {
//   // конвертируем псевдомассив в обычный массив
//   const arg = Array.prototype.slice.call(arguments);
//   console.log(arguments);
// }
// test ('red', 5, 12, 'black', [], true, 9);

// // Новый вариант - принимаем при помощи rest = ...arr
// function test2(...arr) {
//   console.log(arr);
// }
// test2('red', 5, 12, 'black', [], true, 9);
// test2(); // если передаём пустой массив - получаем пустой массив

// так же можем принимать отдельный аргументы в отдельный массив с указанными п-ми
// function test3(a, b, c, ...arr2) {
//   console.log(a, b, c);
//   console.log(arr2);
// }
// test3('red', 5, 12, 'black', [], true, 9);

// * SPREAD ОПЕРАТОР
// const arr = ['red', 5, 12];
// const arr2 = ['black', true];
// function test(a, b, c, d, e, f) {
//   console.log(a, b, c);
//   console.log(d, e, f);
// }
// // передаем наши значения внутрь функции из массива
// // старый спопособ
// test(arr[0], arr[1], arr[2]);
// // Новый способ spread оператор - передаёт значение по одному в каждый параметр.
// // если просто указать массив - передаст все 3 значения в 1 параметр a
// test(...arr);
// // можно передать несколько массивов или комбинировать с другими значениями
// test(...arr, ...arr2); // два массива
// test(...arr, ...arr2, 50);
// // можем просто из нескольких массиво собирать 1 и даже добавлять ещё значения
// const arrSum = [...arr, 50, ...arr2, false];
// console.log(arrSum);
// // мы можем даже 1-й строкой преобразовать DOM-коллекцию в массив
// const allTitle = document.querySelectorAll('.title');
// console.log(allTitle);
// const arrAllTitle = [...allTitle];
// console.log(arrAllTitle);

//* Деструктуризация объектов
// const car = {
//   brand: 'mazda',
//   model: 3,
//   color: 'red',
  // options: {
  //   color: 'black',
  //   abs: true
  // }
// };

// раньше доставfли отдельные элементы из обьекта в отдельный переменный так
// const brand = car.brand;
// const model = car.model;
// const color = car.color;

// теперь можно деструктурировать
/* в объекте указыаем свойства которые хотим записать. они записываются в отдельные переменные
с таким же названием. а справа указываем объект в которым мы их будем искать. */
// const {brand, model, color} = car;

// если объект имеет вложенную структуру (например option)
// просто указываем путь доступа к вложенной струкрутре и ее объектамм
// так же можно указать новое имя переменной, если нужно
// const {options:{color: carColor, abs: carABS}} = car;

// * если мы не знаем есть ли такое значение в обьекте. можно заранее указать значание по умолчанию
// const {brand, model = 6} = car;
/* однако со вложеными свойствами, если его нет внутри объекта нельзя к нему обратиться
поэтому можно задать значение по умолчанию для вложенного свойства = это используется если нет "знач. по ум."*/
// ищем в car option - если его нет в объекте = по умолчанию задаётся {};
// ищем в {} color - если его нет в объекте = по умолчанию задаётся 'red'
// const {options: {color = 'red'} = {}} = car;
// * как это работает и где можно применить
// например внутри ф-ции мы передаем аргумент = объект из вызова элемента
// const createCar = (car) => {
//   console.log(`
//   Запущено производство автомобиля ${car.brand} ${car.model}
//   цвет кузова: ${car.color}
//   цвет салона: ${car.colorInt};`);
// };
// * НО! для вызова ф-ции мы должны передать все параметры и значения объекта или получим undefined
// * чтобы это исправить мы можем деструктиризировать объект + указать значения по умолчания:
// const createCar = ({
//   brand = 'bmw', 
//   model = 6, 
//   color = 'black', 
//   colorInt = 'white'
// } = {}) => {  
//   console.log(`
//   Запущено производство автомобиля ${brand} ${model}
//   цвет кузова: ${color}
//   цвет салона: ${colorInt};`);
// };
// // если ничего не передадим при візове ф-ции в объект то получим ошибку, 
// // но мы можем присвоить обьекту в аргументе значение по умолчанию = {};
// // вызовем ф-цию и передадим сразу объект или его часть
// createCar({
//   // brand: 'mazda',
//   model: '3',
//   // color: 'blue',
//   // colorInt: 'black'
// });

// console.log(color);
// console.log(brand, model);
// console.log(carColor, carABS);

//* МЫ также можем использовать REST ПАРАМЕТРЫ + ДЕСТРУКТИРИЗАЦИЯ es9
// const car = {
//   brand: 'mazda',
//   model: 3,
//   options: {
//     color: 'red',
//     abs: true
//   }
// };

// const {brand, ...arrnew} = car;
// console.log(brand);
// console.log(arrnew);

//* ДЕСТРУКТУРИЗАЦИЯ МАССИВОВ
// const cars = ['mazda', 'bmw', 'audi', 'merc', 'toyota'];
// const [a, b, c] = cars;
// можно пропускать элементы массива
// const [,a,, b, c] = cars;

// если у нас многомернный массив то получим все массивы как отделньый пр-р
// const cars = [['mazda', 'bmw'], ['audi', 'merc'], 'toyota'];
// // const [a, b, c] = cars;
//* чтобы получить вложенность массива - повторяем структуру массива 
// const [[a, b], [c, d], e] = cars;
// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);
// console.log(e);

// если нет значения в массиве - мы можем указать значение по умолчанию
// так же работают REST элементы - получаем весь массив аргумента
// const cars = [['mazda', 'bmw'], ['audi', 'merc', 'ZAZ']];
// const [[a, b], [...c], e = 'opel'] = cars;
// console.log(a);
// console.log(b);
// console.log(c);
// // console.log(d);
// console.log(e);

// //* Одновременно можно применять деструктуризацию объектов и массивов
// const carsModel = {
//   brand: 'volvo',
//   models: {
//     sedan: ['s60', 's90'],
//     cross: ['v60', 'v90']
//   }
// };

// const {
//   models: 
//     {sedan: [s1, s2], 
//     cross: [c1, c2]}
//   } = carsModel;
// console.log(s1, s2, c1, c2);


// //* НОВЫЕ ВОЗМОЖНОСТИ ДЛЯ РАБОТЫ С ОБЪЕКТАМИ ES6+
// const car = 'bentley';
// const cycle = 'bmx';
// const bike = 'honda';

// как создавали объекты из переменных
// const transport = {
//   car: car,
//   cycle: cycle,
//   bike: bike
// };  
//* новый способ создания объектов из переменных
// const transport = {car, cycle, bike};

//как добавляли функции (методы) в объекты
// const transport = {
//   car: car,
//   cycle: cycle,
//   bike: bike,
//   ride: function(){
//     console.log('let`s go');
//   }
// };  
// *новый способ добавления функций (методов) в объекты
// const transport = {car, cycle, bike,
//   ride(){
//     console.log('new go');
//   }
// };
// transport.ride();

//* У голобального объекта Object появился новый метод "assign"
// есть объект с транспортом
// const transport = {
//     car: 'honda',
//     cycle: 'bentley',
//     bike: 'bmx'
// };
// // прикупили новый транспорт
// const newTransport = {
//   bike: 'suzuki',
//   quadBike: 'polaris'
// };
// // прикупили ещё транспорта
// const newTransport2 = {
//   bike: 'ducati'
// };
// // обновляем первый объект - добавляем туда новые данные 
// //* + перезаписывает данные по такому же ключу
// // Object.assign(transport, newTransport, newTransport2);
// //* если мы не хотим перезаписывать объект - можем создать новый объект 
// // так же можем записать всё в новую переменную
// const currentTransport = Object.assign({}, transport, newTransport, newTransport2);
// console.log(currentTransport);

// //* Object spread оператор - самый новый способ ES9
// //* создания копий или более актуальной версии объектов из существующих
// // так же можем добавлять новые значения, свойство объектов, методы и т.д.!!!
// const ship = 'photinia';
// const curTrans = {
//   ...transport, 
//   ...newTransport, 
//   ...newTransport2, 
//   ship,
//   ride(){
//     console.log('new syntax spread obj');
//   }
// };
// console.log(curTrans);
// curTrans.ride();



//* Колекции MAP и SET!
//* Раньше данные хранились в ассивах и объектах. в es6 появилась возможность хранить в SET, MAP
//* Минусы при хранении данных в объектах и массивах:
// 1-наследуют родителя и его св-ва. 
// 2-могут содержать ключи только в виде строки (объекты?)
// 3- при переборе объекта порядок перебора может отличаться
// const obj = {
//   a: 5,
//   b: 10
// };
// // у объекта нет св-ва length и для этого нужно - не удобно. колл-ция map решает эти вопросы
// console.log(Object.keys(obj).length);

//* Map создаётся след. способом и данные хранятся "ключ: значение"
// *Используем MAP когда:
/*1. Ключи разных типов, 2. Если ключи генерируютяс динамически 
3. Если много выполняется действие с парами ключ-значение = удаление и добавление элементов
4. Нужно перебирать ключ - значение.*/ 
// Ключем можем быть любой тип значения, а не только строка
// можно добавлять значения и объекты прямо в конструкторе
// const map = new Map([
//   ['key', 'value'],
//   ['joker', 1]
// ]);

// // свойство Set - добавляет данные в Map - 1 - key, 2-значение объекта
// map.set('car', {brand: 'mazda', model: 3})
//   .set(777, 'три топора')
//   .set(null, 'даже null')
//   .set(NaN, 'yo NaN')
//   .set(undefined, 'даже так')
//   .set(false, true);
// // создадим объект и используем его в виде ключа
// const obj = {
//   name: 'Lion',
//   age: 25
// };
// map.set(obj, 12345);
// // попробуем использовать ф-цию в виде ключа
// const functest = () => {
//   console.log('nihao');
// };
// map.set(functest, 'f в виде ключа');

// console.log(map);

// //* Получение MAP при помощи Get. Проверка при помощи Has (возвращает булевое)
// // console.log(map.get(functest));
// // console.log(map.get(NaN));
// // console.log(map.get(777));
// // console.log(map.has(obj)); // true
// // console.log(map.has('nohas')); // false
// //* метод Size - кол-во элементов
// // console.log(map.size); // 8

// const collectMap = new Map([
//   ['key1', 'value1'],
//   ['year', 1488],
//   ['year2', 2020]
// ]);

// //применим метод delete - удаление
// collectMap.delete('year');
// // clear - удаляет все элементы - "очищает"
// collectMap.clear();
// console.log(collectMap);

// //* MAP - итерируемая ср-ра данных. Можно применять spread, деструктиризация, array from

// // получим большой массив, который содержит множество массивов с нашими данными
// const arr = Array.from(map);

// используем цикл foreach
// map.forEach((value,key) =>{
//   console.log(`ключ: ${key} значение: ${value}`);
// })

// for of
// for(let [key, value] of map){
//   console.log(`ключ: ${key} значение: ${value}`);
// }
// console.log(arr);


//* Коллекция SET нужна для хранения уникальных значений.
//*  Так же как и map может содержать любые типы данных
// *Используем SET когда:
/*1. Если необходимо проверять на наличие элементов в коллекции
  2. Ключи разных типов, 
  3. Если ключи генерируютяс динамически
  4. Нужно перебирать ключ - значение.*/
// так же можно добавлять элементы в виде массива при создании коллекции
// const cars = new Set(['toyota', 'merc']);

// cars.add('Mazda')
//     .add('Volvo')
//     .add('BMW')
//     .add(NaN)
//     .add(null)
//     .add(true)
//     .add(()=>{});
// // повторные значения не записываются - они уникальны.
// // cars.add('BMW');
// // cars.add('BMW');

// // удаляем при помощи delete, а очищаем при помощи clear
// cars.delete('BMW');
// // cars.clear();
// console.log(cars);
// console.log(cars.size); // getter size - проверяем длину коллекции
// console.log(cars.has(null)); // true
// console.log(cars.has('toyota')); // false

// //* Коллекция set так же является итерируемым типом данных
// //* Можно применять spread, деструктиризация, array from
// // foreach
// cars.forEach((elem) => {
//   console.log(elem);
// });
// //деструктуризация
// const [car1, car2] = cars;
// console.log('car1: ', car1);
// console.log('car2: ', car2);
// // при помощи spread оператора може превратить нашу коллекцию в массив
// console.log([...cars]);
// // так же можем объеденять коллекцию при помощи spread
// const newCars = new Set(['Kia', 'Hyndai', 'Ferarri']); // вторая к-ция
// const allCars = new Set([...cars, ...newCars]);
// console.log('allCars: ', allCars);


//* WeekMap, WeekSet нет св-в size,clear, не итерируемые
// WeekMap - в качестве ключа хранит только объекты
// WeekSet - в качестве значений только объекты
// Если хранимый объект не имеет внешней ссылки то сборщик мусора в браузере удаляет его из памяти

























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




