'use strict';
let money = 10000; // доход за месяц
let income = 'Фриланс';
let addExpenses = 'Интернет, комуналка, такси, автобус, кино';
let deposit = true;
let mission = 100000;
let period = 6;
// alert('Я стану программистом?');
// console.log(typeof money);
// console.log(typeof income);
// console.log(typeof deposit);
// console.log(addExpenses.length);
// console.log('Период равен' + ' ' + period + ' ' + 'месяцев.' + ' ' + 'Цель заработать' + ' ' + mission + ' ' + 'долларов.' + ' ');

// console.log(addExpenses.toLocaleLowerCase().split(', '));

money = +prompt('Ваш месячный доход?');
console.log(money);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
addExpenses = addExpenses.toLocaleLowerCase().split(', ');
console.log(addExpenses);
// deposit = confirm('Есть ли у вас депозит в банке?');
// console.log(deposit);

// let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
// let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

// console.log(amount1);
// console.log(amount2);

// 6) Вычислить бюджет на месяц, учитывая обязательные расходы, сохранить в новую переменную budgetMonth и вывести результат в консоль

// let budgetMonth = money - (amount1 + amount2);
// console.log(budgetMonth);

// 7) Зная budgetMonth, посчитать за сколько месяцев будет достигнута цель mission, вывести в консоль, округляя в большую сторону (методы объекта Math в помощь)

// console.log('Цель будет достигнута:' + ' ' + Math.ceil(mission / budgetMonth));

// 8) Поправить budgetDay учитывая бюджет на месяц, а не месячный доход.Вывести в консоль округлив в меньшую сторону

// budgetDay = Math.floor(budgetMonth / 30);
// console.log('Дневной бюджет:' + ' ' + budgetDay);

// 9) Написать конструкцию условий (расчеты приведены в рублях)	
// Если budgetDay больше 1200, то “У вас высокий уровень дохода”
// Если budgetDay больше 600 и меньше 1200, то сообщение “У вас средний уровень дохода”
// Если budgetDay меньше 600 то в консоль вывести сообщение “К сожалению у вас уровень дохода ниже среднего”
// Если отрицательное значение то вывести “Что то пошло не так”
// Учесть варианты 0, 600 и 1200

// if (budgetDay >= 1200) {
//   // console.log('У вас высокий уровень дохода');
// } else if (budgetDay >= 600 && budgetDay < 1200) {
//   // console.log('У вас средний уровень дохода');
// } else if (budgetDay < 600) {
//   // console.log('К сожалению у вас уровень дохода ниже среднего');
// } else if (budgetDay < 0) {
//   // console.log('Что то пошло не так');
// }


// 1) Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных расходов за месяц

let getExpensesMonth = function getExpensesMonth(amount1, amount2) {
  return amount1 + amount2;
};

let getAccumulatedMonth = function getAccumulatedMonth(money, one) {
  return money - one;
};

console.log(getAccumulatedMonth(money, getExpensesMonth(amount1, amount2)));

// 3) Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

console.log(getAccumulatedMonth(money, getExpensesMonth(amount1, amount2)));

// 4) Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления (accumulatedMonth) и возвращает результат

let three = function getTargetMonth(mission, accumulatedMonth) {
  return mission / accumulatedMonth;
};

console.log(three(mission, accumulatedMonth));

// 5) Удалить из кода переменную budgetMonth

// 6) budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)

let budgetDay = function budgetDay(accumulatedMonth) {
  return (accumulatedMonth / 30);
};

console.log(budgetDay(accumulatedMonth));

// 7) Почистить консоль логи и добавить недостающие, должны остаться:

// - вызовы функции showTypeOf 

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// - Расходы за месяц вызов getExpensesMonth
// - Вывод возможных расходов в виде массива (addExpenses) 
// - Cрок достижения цели в месяцах (результат вызова функции getTargetMonth)
// - Бюджет на день (budgetDay)
// - вызов функции getStatusIncome

let getStatusIncome = function getStatusIncome(budgetDay) {
  if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay < 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else if (budgetDay < 0) {
    return ('Что то пошло не так');
  }
};

console.log(getStatusIncome(budgetDay));