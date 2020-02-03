'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,

  start = function () {
    do {
      money = prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
  };

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: [],
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  budget: +money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLocaleLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    for (let i = 0; i < 2; i++) {
      let expenses1 = prompt('Введите обязательную статью расходов?');
      let expenses2;
      do {
        expenses2 = prompt('Во сколько это обойдется?');
      }
      while (!isNumber(expenses2));
      appData.expenses[expenses1] = +expenses2;
      console.log(appData.expenses);
    }
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
      console.log(appData.expensesMonth); // number
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.money - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
    console.log(appData.budgetMonth); //number 
    console.log(appData.budgetDay);
  },
  getTargetMonth: function () {
    return appData.mission / appData.budgetMonth;
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay < 0) {
      return ('Что то пошло не так');
    }
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

// for (let key in appData) {
//   console.log('Наша программа включает в себя данные: ' + key + 'Значение: ' + appData[key]);
// }

// console.log(typeof appData.income);
// console.log(typeof appData.addIncome);
// console.log(typeof appData.expenses);
// console.log(typeof appData.addExpenses);
// console.log(typeof appData.deposit);
// console.log(typeof appData.mission);
// console.log(typeof appData.period);
// console.log(typeof appData.budget);
// console.log(typeof appData.budgetDay);
// console.log(typeof appData.budgetMonth);
// console.log(typeof appData.expensesMonth);
// console.log(typeof appData.asking);
// console.log(typeof appData.getExpensesMonth);
// console.log(typeof appData.getBudget);
// console.log(typeof appData.getTargetMonth);
// console.log(typeof appData.getStatusIncome);