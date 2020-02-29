'use strict';

let calc = document.getElementById('start');
let btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  depositCheck = document.querySelector('#deposit-check'),
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
  allInput = document.querySelectorAll('input'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent');


let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function (str) {
  return /^[а-яё\s,]+$/ig.test(str);
};

class AppData {
  constructor(options) {
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
  }
  blockStart() { // блокировка кнопки
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
  }
  start() {
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();

    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();

    this.showResult();

    this.changeButton();

    this.blockInput();

    this.blockInputValue();

    this.checkPercent();
  }
  blockInput() {
    inputTypeText = classData.querySelectorAll('input[type="text"]');
    for (let item of inputTypeText) {
      item.disabled = true;
    }
  }
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth()); // в большую сторону
    incomePeriodValue.value = appData.calcPeriod();
    periodSelect.addEventListener('input', function () {
      incomePeriodValue.value = appData.calcPeriod();
    });
  }
  addExpensesBlock() {
    let cloneExpensesItems = expensesItems[0].cloneNode(true);

    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  }
  addIncomeBlock() {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);

    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  }
  getExpenses() {
    expensesItems.forEach(function (item) {

      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }
  getIncome() {
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
  }
  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(',');

    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }
  getBudget() {
    const monthDeposit = this.moneyDeposit + (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }
  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
      return ('Что то пошло не так');
    }
  }
  // getInfoDeposit() {
  //   if (this.deposit) {
  //     do {
  //       this.persentDeposit = prompt('Какой годовой процент?', '10');
  //     } while (!isNumber(this.persentDeposit));
  //     do {
  //       this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
  //     }
  //     while (!isNumber(this.moneyDeposit));
  //   }
  // }
  calcPeriod() {
    return (this.budgetMonth * periodSelect.value);
  }
  calcMonth() {
    periodAmount.innerHTML = periodSelect.value;
  }
  changeButton() {
    calc.style.cssText = ' display: none';
    cancel.style.cssText = ' display: block';
  }
  reset() {
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
  }
  blockInputValue() {
    let placeName = classData.querySelectorAll('input[placeholder=Наименование]');
    placeName.forEach(function (item) {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[^А-Яа-я\s]/, '');
      });
    });
  }
  blockSumValue() {
    let placeSum = classData.querySelectorAll('input[placeholder=Сумма]');
    placeSum.forEach(function (item) {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[^0-9]/, '');
      });
    });
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  // changePercent() {
  //   const valueSelect = this.value;
  //   if (valueSelect === 'other') {
  //     depositPercent.style.display = 'inline-block';
  //     depositPercent.removeAttribute('disabled');
  //     console.log(this.percentDeposit);
  //   } else {
  //     depositPercent.value = valueSelect;
  //   } 
  // }

  changePercent() {

    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.removeAttribute('disabled');
      console.log(depositPercent.value);
    } else {
      depositPercent.value = valueSelect;
    }
  }

  checkPercent() {
    depositPercent.addEventListener('input', function () {
      depositPercent.value = depositPercent.value.replace(/[^0-9]/, '');
    });
    if (depositPercent.value >= 0 || depositPercent.value <= 100) {
      alert("Введите корректное значение в поле проценты");
      appData.blockStart();
    }
    depositPercent.addEventListener('input', this.checkPercent);
  }

  depositHundler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  eventsListeners() {
    calc.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));

    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);

    periodSelect.addEventListener('input', this.calcMonth);

    depositCheck.addEventListener('change', this.depositHundler.bind(this));
  }
}

const appData = new AppData();

appData.checkPercent();

appData.eventsListeners();
appData.blockStart();

appData.blockInputValue();
appData.blockSumValue();