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
  budget: money,
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
  //   8) Переписать метод getExpensesMonth: с помощью цикла считаем сумму всех обязательных расходов и сохраняем результат в свойство expensesMonth нашего объекта  для того, чтобы посчитать сумму используйте цикл for in
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth = key[appData.espenses2];
      console.log(appData.expensesMonth);
    }
  },
  getAccumulatedMonth: function () {
    return money - expensesAmount;
  },
  getTargetMonth: function (mission, accumulatedMonth) {
    return mission / accumulatedMonth;
  },
  getStatusIncome: function (budgetDay) {
    if (budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (budgetDay >= 600 && budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay < 0) {
      return ('Что то пошло не так');
    }
  }
};

appData.asking();

// let expensesAmount = appData.getExpensesMonth();
// console.log('Расходы за месяц: ' + expensesAmount);

// let accumulatedMonth = appData.getAccumulatedMonth(money, expensesAmount);

// if (appData.getTargetMonth(appData.mission, accumulatedMonth) < 0) {
//   console.log('Цель не будет достигнута');
// } else {
//   console.log('Миссия будет достигнута за:' + ' ' + Math.ceil(appData.getTargetMonth(appData.mission, accumulatedMonth)));
// }

// let budgetDay = Math.floor(accumulatedMonth / 30);
// console.log('Бюджет на день:' + ' ' + budgetDay);

// console.log(appData.getStatusIncome(budgetDay));