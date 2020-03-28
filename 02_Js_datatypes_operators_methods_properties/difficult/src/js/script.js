// объявляем переменные
let num = 266219;
let sum = 1;

// переводим переменную в строку
num = num + '';
console.log(typeof 'num: ', num);

// используем цикл, который достанет каждое число отдельно и перемножим их
for (let i = 0; i < num.length; i++) {

  sum *= num[i];

}
console.log([sum]);

// воздведём полученное число в 3-ю степень
sum **= 3;
console.log(typeof 'sum: ', sum);

/* Переведем полученное значение в строку и выведем 
на экран первые 2 цифры полученного числа */
sum = String(sum);
console.log(sum.substr(0, 2));









