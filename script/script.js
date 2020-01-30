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
money = prompt('Ваш месячный доход?');
do {
(!isNumber(money));
money = prompt('Ваш месячный доход?');
}
while (money < 1);
};

start();

// let start = function () {
// money = prompt('Ваш месячный доход?');
// while (!isNumber(money)) {
// money = prompt('Ваш месячный доход?');
// }
// };

// start();

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
addExpenses = addExpenses.toLocaleLowerCase().split(', ');
console.log(addExpenses);
deposit = confirm('Есть ли у вас депозит в банке?');
console.log(deposit);

let expenses1, expenses2;

let getExpensesMonth = function () {

let sum = 0;
for (let i = 0; i < 2; i++) {

if (i === 0) {
expenses1 = prompt('Введите обязательную статью расходов?');
} else if (i === 1) {
expenses2 = prompt('Введите обязательную статью расходов?');
}
sum += !isNumber(prompt('Во сколько это обойдется?'));
}

console.log(sum);
return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);

let getAccumulatedMonth = function (money, expensesAmount) {
return money - expensesAmount;
};
console.log(getAccumulatedMonth(money, getExpensesMonth()));

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth());
console.log(accumulatedMonth);

let getTargetMonth = function getTargetMonth(mission, accumulatedMonth) {
if ((mission / accumulatedMonth) < 0) {
return ('Цель не будет достигнута');
}
return mission / accumulatedMonth;
};

console.log('Миссия будет достигнута за:' + ' ' + Math.ceil(getTargetMonth(mission, accumulatedMonth)));

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
