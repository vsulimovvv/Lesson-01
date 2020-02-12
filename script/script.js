'use strict';

let calc = document.getElementById('start');
let btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  checkBox = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),

  // доход за месяц
  budgetMonthValue = document.querySelector('.budget_month-value'),
  // дневной бюджет
  budgetDayValue = document.querySelector('.budget_day-value'),
  // расход за месяц
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  // Возможные доходы
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  // Возможные расходы
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  // Накопления за период
  incomePeriodValue = document.querySelector('.income_period-value'),
  // Срок достижения цели в месяцах
  targetMonthValue = document.querySelector('.target_month-value'),

  salaryAmount = document.querySelector('.salary-amount'),
  incomeAmount = document.querySelector('.income-amount'),
  additionalIncomeItem2 = document.querySelector('.additional_income-item'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  incomeItems = document.querySelectorAll('.income-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  cancel = document.getElementById('cancel'),
  incomeItem = document.querySelectorAll('.income-items');

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function (str) {
  return /^[а-яё\s,]+$/ig.test(str);
};

let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: [],
  addExpenses: [],
  deposit: false,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  persentDeposit: 0,
  moneyDeposit: 0,
  start: function () {

    this.budget = +salaryAmount.value;

    this.blockStart();
    this.getExpenses();
    this.getIncome();

    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getIncome();
    this.getBudget();

    this.showResult();
  },
  blockStart: function () {
    calc.setAttribute('disabled', 1);
    calc.style.cssText = `cursor: not-allowed`;
    salaryAmount.addEventListener('input', e => {
      if (e.target.value.trim() !== '') {
        calc.removeAttribute('disabled');
        calc.style.cssText = `cursor: pointer`;
      } else {
        calc.setAttribute('disabled', 1);
        calc.style.cssText = `cursor: not-allowed`;
      }
    });
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth()); // в большую сторону
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function () {
      incomePeriodValue.value = this.calcPeriod();
    });
  },
  addExpensesBlock: function () {
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
      }
    });
    for (let key in appData.income) {
      appData.incomeMonth += appData.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return targetAmount.value / this.budgetMonth;
  },
  getStatusIncome: function () {
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
      return ('Что то пошло не так');
    }
  },

  getInfoDeposit: function () {
    if (this.deposit) {
      do {
        this.persentDeposit = prompt('Какой годовой процент?', '10');
      } while (!isNumber(this.persentDeposit));
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (!isNumber(this.moneyDeposit));
    }
  },
  calcPeriod: function () {
    return (this.budgetMonth * periodSelect.value);
  },
  calcMonth: function () {
    periodAmount.innerHTML = periodSelect.value;
  }
};

calc.addEventListener('click', appData.start.bind(appData));

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.calcMonth);






























// appData.asking();
// appData.getExpensesMonth();

// console.log('Расходы за месяц: ' + appData.expensesMonth);
// appData.getBudget();
// console.log('Период достижения цели: ' + Math.ceil(appData.getTargetMonth()));
// console.log(appData.getStatusIncome());
// appData.getInfoDeposit();

// for (let key in appData) {
//   console.log(key + ': ', appData[key]);
// }

// console.log(String(appData.addExpenses.map((item) => item[0].toUpperCase() + item.slice(1).toLowerCase())));