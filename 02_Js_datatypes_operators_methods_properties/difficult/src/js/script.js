// // объявляем переменные
// let num = 266219;
// let sum = 1;

// // переводим переменную в строку
// num = num + '';
// console.log('num: ',typeof num);

// // используем цикл, который достанет каждое число отдельно и перемножим их
// for (let i = 0; i < num.length; i++) {

//   sum *= num[i];

// }
// console.log([sum]);

// // воздведём полученное число в 3-ю степень
// sum **= 3;
// console.log('sum: ',typeof sum);

// /* Переведем полученное значение в строку и выведем 
// на экран первые 2 цифры полученного числа */
// sum = String(sum);
// console.log(sum.substr(0, 2));

'use strict';

// объявляем переменную
let num = 266219;
/* переводим переменную в строку, разделяем строку на массив,
перемножаем элементы массива и возводим в 3-ю степень*/
num = num.toString().split('').reduce(function (total, item) {
  return (total * item);
}, 1) ** 3;
// переводим результат функции в строку и выводим первые 2 символа
num = num.toString().substr(0, 2);
console.log('num: ', num, typeof num);





