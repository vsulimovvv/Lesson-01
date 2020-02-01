'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money, // доход за месяц
  income = 'Фриланс',
  addExpenses = 'Интернет, комуналка, такси, автобус, кино',
  deposit = true,
  mission = 100000,
  period = 6;

let start = function () {
  // money = prompt('Ваш месячный доход?');
  do {
    money = prompt('Ваш месячный доход?');
  }
  while (!isNumber(money));
};


start();

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
addExpenses = addExpenses.toLocaleLowerCase().split(', ');
console.log(addExpenses);
deposit = confirm('Есть ли у вас депозит в банке?');
// console.log(deposit);

// let start = function () {
//   money = prompt('Ваш месячный доход?');

//   while (!isNumber(money)) {
//     money = prompt('Ваш месячный доход?');
//   }
// };

// start();

let expenses = [];
let getExpensesMonth = function () {
  let sum = 0;
  let newSum;
  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');

    do {
      newSum = prompt('Во сколько это обойдется?');
    }
    while (!isNumber(newSum));
    sum += +newSum;
    console.log(expenses);
  }
  return sum;
};

let expensesAmount = getExpensesMonth();
console.log('Расходы за месяц: ' + expensesAmount);

let getAccumulatedMonth = function () {
  return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount); //


let getTargetMonth = function (mission, accumulatedMonth) {
  return mission / accumulatedMonth;
};

if (getTargetMonth(mission, accumulatedMonth) < 0) {
  console.log('Цель не будет достигнута');
} else {
  console.log('Миссия будет достигнута за:' + ' ' + Math.ceil(getTargetMonth(mission, accumulatedMonth)));
}

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день:' + ' ' + budgetDay);

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

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