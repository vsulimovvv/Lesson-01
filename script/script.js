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
  additionalExpensesItem = document.querySelector('.additional_expenses-item'), // возможные расходы
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  cancel = document.getElementById('cancel'),
  incomeItem = document.querySelectorAll('.income-items'),
  incomeTitle = document.querySelectorAll('.income-title'),
  // expensesTitle = document.querySelectorAll('.expenses-title'),
  classData = document.querySelector('.data'),
  inputTypeText = classData.querySelectorAll('input[type="text"]'),
  resultTotal = document.querySelectorAll('.result-total'),
  allInput = document.querySelectorAll('input');

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function (str) {
  return /^[а-яё\s,]+$/ig.test(str);
};

const AppData = function () {
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = [];
  this.addExpenses = [];
  this.deposit = false;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.persentDeposit = 0;
  this.moneyDeposit = 0;
};

AppData.prototype.blockStart = function () {
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
};

AppData.prototype.start = function () {

  for (let item of inputTypeText) {
    item.disabled = true;
  }

  this.budget = +salaryAmount.value;

  this.getExpenses();
  this.getIncome();

  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();

  this.showResult();

  this.changeButton();
};
AppData.prototype.showResult = function () {
  const _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth()); // в большую сторону
  incomePeriodValue.value = appData.calcPeriod();
  periodSelect.addEventListener('input', function () {
    incomePeriodValue.value = _this.calcPeriod();
  });
};
AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItems = expensesItems[0].cloneNode(true);

  expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');

  if (expensesItems.length === 3) {
    expensesPlus.style.display = 'none';
  }
};
AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItems = incomeItems[0].cloneNode(true);

  incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
  incomeItems = document.querySelectorAll('.income-items');

  if (incomeItems.length === 3) {
    incomePlus.style.display = 'none';
  }
};
AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function (item) {

    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;

    if (itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = +cashExpenses;
    }
  });
};
AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      appData.income[itemIncome] = +cashIncome;
    }
  });
  for (let key in appData.income) {
    _this.incomeMonth += appData.income[key];
  }
};
AppData.prototype.getAddExpenses = function () {
  const _this = this;
  let addExpenses = additionalExpensesItem.value.split(',');

  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== '') {
      _this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function () {
  const _this = this;
  additionalIncomeItem.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.getExpensesMonth = function () {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
};
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {
  if (this.budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
    return ('У вас средний уровень дохода');
  } else if (this.budgetDay < 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else if (this.budgetDay < 0) {
    return ('Что то пошло не так');
  }
};
AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.persentDeposit = prompt('Какой годовой процент?', '10');
    } while (!isNumber(this.persentDeposit));
    do {
      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    }
    while (!isNumber(this.moneyDeposit));
  }
};
AppData.prototype.calcPeriod = function () {
  return (this.budgetMonth * periodSelect.value);
};
AppData.prototype.calcMonth = function () {
  periodAmount.innerHTML = periodSelect.value;
};
AppData.prototype.changeButton = function () {
  calc.style.cssText = ' display: none';
  cancel.style.cssText = ' display: block';
};
AppData.prototype.reset = function () {
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = [];
  this.addExpenses = [];
  this.deposit = false;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.persentDeposit = 0;
  this.moneyDeposit = 0;

  for (let i = 0; i < allInput.length; i++) {
    allInput[i].value = '';
  }

  for (let item of inputTypeText) {
    item.disabled = false;
  }

  // кнопка
  calc.style.cssText = ' display: block';
  cancel.style.cssText = ' display: none';

  //  ползунок
  periodSelect.value = 1;
  periodAmount.textContent = '1';

  // плюсы
  expensesItems.forEach(function (item, i) {
    if (i > 0) {
      item.remove();
    }
  });
  expensesPlus.style.display = 'block';

  incomeItems.forEach(function (item, i) {
    if (i > 0) {
      item.remove();
    }
  });
  incomePlus.style.display = 'block';
};


AppData.prototype.eventsListeners = function () {
  calc.addEventListener('click', this.start.bind(appData));
  cancel.addEventListener('click', this.reset.bind(appData));

  expensesPlus.addEventListener('click', this.addExpensesBlock);
  incomePlus.addEventListener('click', this.addIncomeBlock);

  periodSelect.addEventListener('input', this.calcMonth);
};

const appData = new AppData();
const eventsListeners = new EventsListeners();

console.log(appData);

appData.blockStart();