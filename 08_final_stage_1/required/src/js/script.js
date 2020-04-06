// этот код работает в современном режиме
'use strict';
// проверяем на тип данных (число) и конечное ли. универсальная.
function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
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
  asking: function (){

    if(confirm('Есть ли у Вас источник дополнительного заработка?')){
      let itemIncome = prompt('Какой у Вас есть дополнительный заработок?', 'Таксую');
      let cashIncome = prompt('Сколько в месяц Вы на этом зарабатываете?', 10000);
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');
        // Приводим строку к нижнему регистру, разбиваем на массив, выводим в консоль.
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let expenses = prompt('Введите обязательную статью расходов?');
      let cost;
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
  getInfoDeposit: function(){
    if(appData.deposit){
      appData.percentDeposit = prompt('Какой годовой процент депозита?', 10);
      appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    }
  },
  calcSavedMoney: function(){
    return appData.budgetMonth * appData.period;
  }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
// appData.getInfoDeposit();

// // добавим в object appData свойства
// appData.budgetDay = 0;
// appData.budgetMonth = 0;
// appData.expensesMonth = 0;
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


// les07 objects, arrays;
// объект может содержать любые типы данных
// let car = {
//   model: 'mazda',
//   year: 2006,
//   turbocharging: true,
//   specifications: [],
//   style: {
//     color: 'blue'
//   }
// };
// // обращаемся с обьекту при помощи .(точки) - 1й вариант
// // обращаемся с обьекту при помощи [](квадратных скобок). внутри указыаем ''(строку)

// console.log(car.model);
// console.log(car['model']);
// // если обращаться при помощи [] внутри можно писать строки с пробелами
// car['best place'] = 'city';
// console.log(car);
// // так же значение и ключи можно приводить из переменных, функций и т.д.
// let titleTrans = 'коробка передач';
// let bodyTrans = 'автоматическая коробка передач';
// car[titleTrans] = bodyTrans;

// // функция внутри объекта называется методом объекта
// car.ride = function (speed) {
//   console.log('скорость движение машины ' + speed + ' км/ч');
// };
// // вызов метода объекта
// car.ride(60);
// // присваиваем объекту car свойство stop = значение stop (наша функция ниже);
// car.stop = stop; // ссылка на функцию стоп
// // вызовем её
// car.stop();
// stop(); // а это просто вызов функции stop - не имеет отношение к обьекту car
// console.log(car);

// function stop() {
//   console.log('Машина стоит, скорость 0 км/ч');
// }

// let obj = new Object();
// car.turbocharging = true;
// obj.color = 'black';
// car.style = obj;
// console.log(car.style === obj);
// obj.color = 'red';
// console.log(car);


// масиввы - обьекты, ключи в них заполняются автоматически
// могут содержать любые типы данных
// let arr = [1, 2, 3, 4, 5];
// arr[0] = 'cat';
// // добавить элемент в конец массива - костыль
// arr[arr.length] = 'dog';
// // так же можем добавить єлемент с любым индексом
// arr[10] = 'human';
// // обращаемся при помощи []
// // console.log(arr[1]);
// // console.log(arr.length);
// // можно создать при помощи конструктора
// // если передать один элемент при создании - станет длиной массива
// let array = new Array(1, 2, 3, 4);
// // если length присвоить число = длина массива
// array.length = 30;
// // если длину сделать меньше содержимого. лишние будут удаленны
// array.length = 3;
// console.log(array);
// // можно пропускать объекты и оставлять пустыми
// let arr1 = [,,, 1, 2,,];
// console.log(arr1);
// методы массивов
// let array = ['apple', 'orange', 'banana'];
// method push - добавляет в конец элементы. unshift - в начало
// array.push('kiwi');
// array.unshift('papaya');
// console.log(array);
// метод pop - не принимает аргументы, удаляет елементы в конце массива и возвращает его куда нужно. 
// и shift - не принимает аргументы, удаляет элементы в начале массива и возвращает его куда нужно.
// array.pop();
// console.log(array);
// console.log(array.pop());
// array.shift();
// console.log(array);
// console.log(array.shift());
// console.log(array);
// // метод sort - сортирует по алфавиту и учитывает регистр
// console.log(array.sort());
// // slice - указыаем индекс. начиная с индекса возвращается массив. принимает - = с конца.
// // не меняет массив, а возвращает новый
// console.log(array.slice(1));
// console.log(array.slice(1, 3));
// console.log(array.slice(-2));

// метод splice. удаляет єлементы и добавляет новые в массив. возвращает удалённые элементы
// первый аргумент индекс с которого начинаем удаление. второй - сколько.
// а следующие аргументы значение которые хотим вставить на место удалённых
// console.log(array.splice(1, 2, 'avocado', 'papaya'));
// console.log(array);

// join - возвращает строку. агрумент - то что будет разделять строку
// не меняет текущий массив
// console.log(array.join(' = '));
// // reverse изменяет текущий массив
// console.log(array.reverse());
// // concat складывает с другими массивами или элементами, но не меняет текущий
// console.log(array.concat(['avocado', 'kiwi', 'papaya'], 'mango'));

// как перебрать свойства в объекте метод for in 
// let car = {
//   model: 'mazda',
//   year: 2006,
//   turbocharging: true,
//   specifications: [],
//   style: {
//     color: 'blue'
//   }
// };
// // // перебирает массив по ключу и значению. выводит объект 
// for (let key in car){
//   console.log('Ключ: ' + key + ' Значение: ' + car[key]);
// }
// // свойства length у обекта не существует. вариант ниже
// console.log(Object.keys(car).length);
// // перебор в массиве
// let arr = [1, 3, 5, 10, 15];
// for (let i = 0; i < arr.length; i++) {
//   console.log(arr[i]);
// }
// // foreach
// arr.forEach(function(item, i, array) {
//   console.log(item, i, array);
// })
// цикл for off - получаем елементы. похож на for in - получаем индексы.
// for (let item of arr){
//   console.log(item);
// }
// // удалить элементы из массива delete. 
// delete arr[3];
// console.log(arr);
// // удалить элементы из объекта
// let obj = {
//   a: 3,
//   b: true,
//   c: 'string'
// };

// delete obj.b;
// console.log(obj);

// /* псевдомассив - обьект похожий на массив. структура совпадает с массивами, 
// есть свойства, length. методов массива у него нет. */
// function test() {
//   console.log(arguments);
// }
// test(1,2,3,4);
