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

// let reg = /^[а-яё\s]+$/ig;
// let reg2 = /^[а-яё\s,]+$/ig;

let isString = function (str) {
  return /^[а-яё\s,]+$/ig.test(str);
};

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
      } while (!isString(itemIncome));

      let cashIncome;
      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses;
    do {
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
      appData.addExpenses = addExpenses.split(',');
    } while (!isString(addExpenses));

    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {

      let expenses1;
      do {
        expenses1 = prompt('Введите обязательную статью расходов?', 'машина');
      } while (!isString(expenses1));

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
appData.getInfoDeposit();

for (let key in appData) {
  console.log(key + ': ', appData[key]);
}

console.log(String(appData.addExpenses.map((item) => item[0].toUpperCase() + item.slice(1).toLowerCase())));

// кнопка рассчитать
let calc = document.getElementById('start');

// + через Tag
// let incomeAdd = document.getElementsByTagName('income_add');
// let incomeAdd = document.getElementsByTagName('button');
let incomeAdd = document.querySelector('button');
// let expensesAdd = document.getElementsByTagName('expenses_add');
// let expensesAdd = document.getElementsByTagName('button');
let expensesAdd = document.querySelector('button');
console.log(incomeAdd); //
console.log(expensesAdd); //
// checkbox
let checkBox = document.querySelector('#deposit-check');
// Поля для ввода возможных доходов
let incomeItem = document.querySelectorAll('.additional_income-item');
// Каждый элемент в правой части программы через класс, которые имеют в имени класса "-value"
// Доход за месяц
let budgetMonthValue = document.querySelector('.budget_month-value');
// Дневной бюджет
let budgetDayValue = document.querySelector('.budget_day-value');
// Расход за месяц
let expensesMonthValue = document.querySelector('.expenses_month-value');
// Возможные доходы
let additionalIncomeValue = document.querySelector('.additional_income-value');
// Возможные расходы
let additionalExpensesValue = document.querySelector('.additional_expenses-value');
// Накопления за период
let incomePeriodValue = document.querySelector('.income_period-value');
// Срок достижения цели в месяцах
let targetMonthValue = document.querySelector('.target_month-value');

// поля ввода (input) с левой стороны
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let incomeAmount = document.querySelector('.income-amount');

// использовать querySelectorAll?
let additionalIncomeItem = document.querySelector('.additional_income-item');
let additionalIncomeItem2 = document.querySelector('.additional_income-item');
//
let expensesTitle = document.querySelector('.expenses-title');
let expensesAmount = document.querySelector('.expenses-amount');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
// range
let myRange = document.querySelector('.period-select');
// кнопка отмены
let cancel = document.getElementById('cancel');