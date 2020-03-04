'use strict';

const start = document.getElementById('start'),
  salaryAmount = document.querySelector('.salary-amount'),
  btnIncAdd = document.getElementsByTagName('button')[0],
  additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
  btnExpAdd = document.getElementsByTagName('button')[1],
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  checkbox = document.querySelector('#deposit-check'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  cancel = document.getElementById('cancel'),
  data = document.querySelector('.data'),
  inputs = document.querySelectorAll('input[type="text"]');

let expensesItems = document.querySelectorAll('.expenses-items'),
  incomeItems = document.querySelectorAll('.income-items');

class AppData {
  constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  }

  start() {
    this.budget = +salaryAmount.value;
    this.getAddIncomeAndExpenses(additionalExpensesItem, additionalIncomeItems);
    this.getExpenses();
    this.getIcnome();
    this.getExpensesMonth();
    this.getInfoDeposit();
    this.getBudget();
    this.getReset();
    this.getCancel();
    this.showResults();
  }

  getCheckPlaceholder(item) {
    if (item.placeholder === 'Наименование' || item.placeholder === 'название') {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[^А-Яа-я\s.,]/, '');
      });
    }
    if (item.placeholder === 'Сумма') {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[^\d]/, '');
      });
    }
    if (item.placeholder === 'Процент') {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[^\d.]/, '');
      });

    }
  }

  showResults() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalIncomeValue.value = this.addExpenses.join(', ');
    additionalExpensesValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', () => incomePeriodValue.value = this.calcPeriod());
  }

  getExpenses() {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }

  getExpensesMonth() {
    for (let item in this.expenses) {
      this.expensesMonth += +this.expenses[item];
    }
  }

  getIcnome() {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth +
      (this.moneyDeposit * this.percentDeposit) / 12;

    this.budgetDay = this.budgetMonth / 30;
  }

  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }

  getInfoDeposit() {
    if (this.deposit) {

      this.percentDeposit = +depositPercent.value;
      this.moneyDeposit = +depositAmount.value;
    }
  }

  periodSelect() {
    periodAmount.innerHTML = periodSelect.value;
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  getReset() {
    start.style.display = 'none';
    cancel.style.display = 'block';
  }

  getCancel() {
    const dataChildren = data.querySelectorAll('*');

    for (let i = 0; i < dataChildren.length; i++) {
      if (dataChildren[i].type == 'text' ||
        dataChildren[i].type == 'submit' ||
        dataChildren[i].type == 'checkbox') {
        dataChildren[i].setAttribute('disabled', '');
      }
    }
  }

  checkSalaryAmount() {
    if (salaryAmount.value == '') {
      start.setAttribute('disabled', 'disabled');
      start.style.pointerEvents = 'none';
    } else {
      start.removeAttribute('disabled');
      start.style.pointerEvents = null;
    }
  }

  reset() {
    const inputTextData = document.querySelectorAll('.data input[type=text]'),
      resultInputAll = document.querySelectorAll('.result input[type=text]');

    inputTextData.forEach(function (elem) {
      elem.value = null;
      elem.removeAttribute('disabled');
      periodSelect.value = 1;
      periodAmount.innerHTML = periodSelect.value;
    });

    btnIncAdd.removeAttribute('disabled');
    btnExpAdd.removeAttribute('disabled');

    resultInputAll.forEach(function (elem) {
      elem.value = '';
    });

    for (let i = 1; incomeItems.length > i; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      btnIncAdd.style.display = '';
    }

    for (let i = 1; expensesItems.length > i; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      btnExpAdd.style.display = 'block';
    }

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;

    start.style.display = 'block';
    cancel.style.display = 'none';
    checkbox.checked = false;
    checkbox.removeAttribute('disabled');
    this.checkDeposit();
  }

  addBlock() {
    if (event.target.classList[1] === 'income_add') {
      const cloneIncomeItem = incomeItems[0].cloneNode(true);
      let incomeChildren = cloneIncomeItem.querySelectorAll('*');

      for (let i = 0; i < incomeChildren.length; i++) {
        incomeChildren[i].value = null;
      }

      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncAdd);
      incomeItems = document.querySelectorAll('.income-items');

      if (incomeItems.length === 3) {
        btnIncAdd.style.display = 'none';
      }

      incomeChildren.forEach(this.getCheckPlaceholder);

    } else if (event.target.classList[1] === 'expenses_add') {
      const cloneExpensesItem = expensesItems[0].cloneNode(true);
      const expensesChildren = cloneExpensesItem.querySelectorAll('*');

      for (let i = 0; i < expensesChildren.length; i++) {
        expensesChildren[i].value = '';
      }

      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpAdd);
      expensesItems = document.querySelectorAll('.expenses-items');

      if (expensesItems.length == 3) {
        btnExpAdd.style.display = 'none';
      }

      expensesChildren.forEach(this.getCheckPlaceholder);
    }
  }

  getAddIncomeAndExpenses() {
    const _this = this;
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        _this.addExpenses.push(item);
      }
    });
    additionalIncomeItems.forEach(function (item) {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        _this.addIncome.push(itemValue);
      }
    });
  }

  checkDeposit() {
    const _this = this;
    if (event.target.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', function () {
        let selectIndex = this.value;
        if (selectIndex === 'other') {
          depositPercent.removeAttribute('disabled');
          depositPercent.style.display = 'inline-block';
          depositPercent.value = '';
        } else {
          depositPercent.style.display = 'none';
          depositPercent.value = selectIndex;
        }
      });
    } else {
      depositBank.style.display = 'none';
      depositBank.selectedIndex = 0;
      depositAmount.style.display = 'none';
      depositAmount.value = '';
      this.deposit = false;
      depositPercent.setAttribute('disabled', true);
      depositPercent.style.display = 'none';
    }
  }

  preparation() {
    inputs.forEach(this.getCheckPlaceholder);
    this.checkSalaryAmount();
    salaryAmount.addEventListener('input', this.checkSalaryAmount);
    btnIncAdd.addEventListener('click', this.addBlock.bind(this));
    btnExpAdd.addEventListener('click', this.addBlock.bind(this));
    checkbox.addEventListener('change', this.checkDeposit.bind(this));
    periodSelect.addEventListener('input', this.periodSelect);
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
  }

}

const appData = new AppData();
appData.preparation();