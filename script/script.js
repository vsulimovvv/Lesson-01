let money = 10000;
let income = 'Фриланс';
let addExpenses = 'Интернет, комуналка, такси, автобус, кино';
let deposit = true;
let mission = 100000;
let period = 6;
// alert('Я стану программистом?');
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен' + ' ' + period + ' ' + 'месяцев.' + ' ' + 'Цель заработать' + ' ' + mission + ' ' + 'долларов.' + ' ');

console.log(addExpenses.toLocaleLowerCase().split(', '));


let budgetDay = money / 30;
console.log(budgetDay);