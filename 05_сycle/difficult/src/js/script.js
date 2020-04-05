// этот код работает в современном режиме
'use strict';
// проверяем на тип данных (число) и конечное ли
function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// задание 1
// Cоздадим массив. 
let arr = ['1331', '2442', '3553', '4887', '777', '231', '4779'];
// Проверим первый символ каждого элемента. Выведем в консоль.
// используем короткую форму записи функции - стрелочную функцию.
arr.forEach((el) => {
  if (el[0] === '2' || el[0] === '4') {
    console.log(el);
  }
});

// задание 2
 let n = 100;
 let simpleNumbers = [];
 nextPrime:
  for (let i = 2; i <= n; i++) { // Для всех i...
    for (let j = 2; j < i; j++) { // проверить, делится ли число..
      if (i % j === 0) continue nextPrime; // не подходит, берём следующее
    }
    simpleNumbers.push(i);
  }
console.log('simpleNumbers: ', simpleNumbers);
  for (let key in simpleNumbers){
    console.log(simpleNumbers[key] + ' : ' + 'Делители этого числа: 1 и ' + simpleNumbers[key]);
  }