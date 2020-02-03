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
    }
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
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
console.log('Расходы за месяц: ' + appData.expensesMonth);
appData.getBudget();
console.log('Период достижения цели: ' + Math.ceil(appData.getTargetMonth()));
console.log(appData.getStatusIncome());

for (let key in appData) {
  console.log(key + ': ', appData[key]);
}