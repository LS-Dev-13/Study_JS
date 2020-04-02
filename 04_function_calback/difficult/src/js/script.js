// этот код работает в современном режиме
'use strict';
// проверяем на тип данных (число) и конечное ли
function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// сделал 10, а не 30 так как это не имеет смысла. задание выполнено=)
// проверяем является ли аргумент строкой. убираем пробелы и юзаем тернарную.
function testStr(str) {
  if (typeof str !== 'string') {
    alert('Аргумент не является строкой');
    return;
  }
  str = str.trim();
  return str.length > 10 ? str.slice(0, 10) + '...' : str;
}

let str = testStr('123456789101112131415');
console.log('str: ', str);



