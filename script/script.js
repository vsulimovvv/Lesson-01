'use strict';
let money = 10000; // доход за месяц
let income = 'Фриланс';
let addExpenses = 'Интернет, комуналка, такси, автобус, кино';
let deposit = true;
let mission = 100000;
let period = 6;

money = +prompt('Ваш месячный доход?');
// console.log('Бюджет: ' + money);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
addExpenses = addExpenses.toLocaleLowerCase().split(', ');
console.log(addExpenses);
deposit = confirm('Есть ли у вас депозит в банке?');
// console.log('Депозит: ' + deposit);

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

let getExpensesMonth = function (amount1, amount2) {
  return amount1 + amount2;
};

console.log('Расходы за месяц: ' + getExpensesMonth(amount1, amount2));

let getAccumulatedMonth = function (money, getExpensesMonth) {
  return money - getExpensesMonth;
};
// console.log(getAccumulatedMonth(money, getExpensesMonth(amount1, amount2)));

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));
// console.log(accumulatedMonth);

let getTargetMonth = function getTargetMonth(mission, accumulatedMonth) {
  return mission / accumulatedMonth;
};

console.log('Миссия будет достигнута за:' + ' ' + Math.ceil(getTargetMonth(mission, accumulatedMonth)));

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день:' + ' ' + budgetDay);

let getStatusIncome = function (budgetDay) {
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