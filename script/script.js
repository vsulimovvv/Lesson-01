'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,

  start = function () {
    do {
      money = prompt('Ваш месячный доход?', 50000);
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
  persentDeposit: 0,
  moneyDeposit: 0,
  asking: function () {
    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome;
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      } while (isNumber(itemIncome));
      let cashIncome;
      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    // appData.addExpenses = addExpenses.toLocaleLowerCase().split(', ');
    appData.addExpenses = addExpenses.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ');

    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    for (let i = 0; i < 2; i++) {
      let expenses1;
      do {
        expenses1 = prompt('Введите обязательную статью расходов?', 'квартира');
      }
      while (isNumber(expenses1));
      let expenses2;
      do {
        expenses2 = prompt('Во сколько это обойдется?', 10000);
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
  },

  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.persentDeposit = prompt('Какой годовой процент?', '10');
      } while (!isNumber(appData.persentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return (appData.budgetMonth * appData.period);
  }
};

appData.asking();
appData.getExpensesMonth();

console.log('Расходы за месяц: ' + appData.expensesMonth);
appData.getBudget();
console.log('Период достижения цели: ' + Math.ceil(appData.getTargetMonth()));
console.log(appData.getStatusIncome());
console.log(appData.persentDeposit, appData.moneyDeposit);
appData.getInfoDeposit();

for (let key in appData) {
  console.log(key + ': ', appData[key]);
}



// console.log(appData.calcSavedMoney, appData.moneyDeposit, appData.calcSavedMoney());

// for (let i = 0; i < 2; i++) {
// let expenses1 = prompt('Введите обязательную статью расходов?', 'квартира');
//   let expenses1;
//   let expenses2;
//   do {
//     expenses1 = prompt('Введите обязательную статью расходов?', 'квартира');
//     expenses2 = prompt('Во сколько это обойдется?', 3000);

//   }
//   while (!isNumber(expenses2) && !isNumber(expenses1));
//   appData.expenses[expenses1] = +expenses2;
// }


// appData.persentDeposit = prompt('Какой годовой процент?', '10');
//     appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
// let expenses1;
//     do {
//       expenses1 = prompt('Введите обязательную статью расходов?', 'квартира');
//     }
//     while (isNumber(expenses1));
//     let expenses2;
//     do {
//       expenses2 = prompt('Во сколько это обойдется?', 3000);
//     }
//     while (!isNumber(expenses2));
//     appData.expenses[expenses1] = +expenses2;

// if (appData.deposit) {
//   appData.persentDeposit = prompt('Какой годовой процент?', '10');
//   do {
//     appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
//   }
//   while (!isNumber(appData.moneyDeposit));
// }