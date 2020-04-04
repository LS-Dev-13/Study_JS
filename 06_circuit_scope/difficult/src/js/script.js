// этот код работает в современном режиме
'use strict';
// проверяем на тип данных (число) и конечное ли
function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Cоздадим массив. 
let arr = ['1331', '2442', '3553', '4887', '777', '231', '4779'];
// Проверим первый символ каждого элемента. Выведем в консоль.
// используем короткую форму записи функции - стрелочную функцию.
arr.forEach((el) => {
  if (el[0] === '2' || el[0] === '4') {
    console.log(el);
  }
});


// задание 2. нужно разбираться.
function isPrime(n) {
  for (let i = 2; i * i <= n; i === 2 ? i++ : i += 2){
    if (n % i === 0){
      return false;
    }
  }
  return n > 1;
}

const res = [...Array(100)].reduce((a, _, i) => a.concat(isPrime(i) ?
 `Делители числа ${i}: 1 и ${i}` : []), []).join('\n');
 isPrime(100);






