// этот код работает в современном режиме
'use strict';
// проверяем на тип данных (число) и конечное ли
function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let week = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
  toDay = new Date().getDay() - 1;
for (let i = 0; i < week.length; i++) {
  if (i === toDay) {
    if (week[i] === 'сб' || week[i] === 'вс') {
      document.write(`<p><b><i>${week[i]}</i></b></p>`);
    } else {
      document.write(`<p><b>${week[i]}</b></p>`);
    }
  } else if (week[i] === 'сб' || week[i] ==='вс') {
    document.write(`<p><i>${week[i]}</i></p>`);
  } else {
    document.write(`<p>${week[i]}</p>`);
  }
}
console.log(week);



