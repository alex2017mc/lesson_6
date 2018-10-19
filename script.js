'use strict';
let start = document.getElementById('start'),
  daybudgetValue = document.getElementsByClassName('daybudget-vallevel'),

  expensesValue = document.getElementsByClassName('expenses-value')[0],
  optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value'),
  incomeValue = document.getElementsByClassName('income-value')[0],
  monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
  yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],
  
  taG = document.getElementsByTagName('button'),
  lexpensesBtn = document.getElementsByTagName('button')[1],
  countBudgetBtn = document.getElementsByTagName('button')[2],
  expensesItemBtn = document.getElementsByTagName('button')[0],
  optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'), 
  savings = document.querySelector('#savings'),
  chooseSum = document.querySelector('.choose-sum'),
  choosePercent = document.querySelector('.choose-percent'),
  yearValue = document.querySelector('.year-value'),
  month = document.querySelector('.month-value'),
  chooseIncome = document.querySelector('.choose-income'),
  budgetValue = document.querySelector('.budget-value'),
  dayValue = document.querySelector('.day-value'),
  expensesItem = document.getElementsByClassName('expenses-item'),
  dayBtValue = document.querySelector('.daybudget-value'),
  levelValue = document.querySelector('.level-value');


console.log(optionalexpensesItem);
console.log(month);
console.log(savings);

let money, time;
countBudgetBtn.disabled = true;
start.addEventListener('click', function () {
  time = prompt('Введите дату в формате YYYY-MM-DD ', '');
  money = +prompt('Ваш бюджет на месяц', '');
  //isNaN(money) возращайт true когда попадйть не числа
  while (isNaN(money) || money == '' || money == null) {
    money = +prompt('Ваш бюджет на месяц', '');
  }
  appData.budjet = money;
  appData.timeData = time;
  budgetValue.textContent = money.toFixed();
  countBudgetBtn.disabled = false;
  //1970год
  yearValue.value = new Date(Date.parse(time)).getFullYear();
  month.value = new Date(Date.parse(time)).getMonth() + 1;
  dayValue.value = new Date(Date.parse(time)).getDay();

});

expensesItemBtn.disabled =true;
for (let i = 0; i < expensesItem.length; i++){
  expensesItem[i].addEventListener('input', function () {
    let unblock = false;
    for (let j = 0; j < expensesItem.length; j++) {
      unblock |= expensesItem[j].value == '';
    }
    expensesItemBtn.disabled = unblock;
  });
}

lexpensesBtn.disabled = true;
for (let i = 0; i < optionalexpensesItem.length; i++) {
  optionalexpensesItem[i].addEventListener('input', function () {
    let unblock = false;
    for (let j = 0; j < optionalexpensesItem.length; j++) {
      unblock |= optionalexpensesItem[j].value == '';
    }
    lexpensesBtn.disabled = unblock;
  });
}


expensesItemBtn.addEventListener('click', function () {
  let sum = 0;
  for (let i = 0; i < expensesItem.length; i++) {
    let a = expensesItem[i].value,
        b = expensesItem[++i].value;
    console.log(((isNaN(b))) + ' tet');
    if ((typeof (a)) === "string" && isNaN(b) === false && (a != null) && (b != null) && a != "" && b != "" && a.length < 50) {
      console.log("done");
      appData.expenses[a] = b;
      // +b число
      sum += +b;
    } else {
      i--;
    }
  }
  expensesValue.textContent = sum;
});

lexpensesBtn.addEventListener('click', function () {
  for (let i = 0; i < optionalexpensesItem.length; i++) {
    let opt = optionalexpensesItem[i].value;
    appData.optionalExpenses[i] = opt;
    optionalexpensesValue[0].textContent += opt + ' ';
    console.log(optionalexpensesValue);
  }
});
countBudgetBtn.addEventListener('click', function () {
  if (appData.budjet != undefined) {
    appData.moneyPerDay = (appData.budjet / 30).toFixed(1);
    dayBtValue.textContent = appData.moneyPerDay;
    if (appData.moneyPerDay < 100) {
      levelValue.textContent = "Минимальный уровень достатка";
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
      levelValue.textContent = 'Средний уровень достатка';
    } else if (appData.moneyPerDay > 2000) {
      levelValue.textContent = 'Высокий уровень достатка';
    } else {
      levelValue.textContent = 'Произошла ошибка';
    }
    
  } else {
    levelValue.textContent = 'Произошла ошибка';
    dayBtValue.textContent = 'Произошла ошибка';
  }


});

chooseIncome.addEventListener('input', function () {
  //change
  let items = chooseIncome.value;
  appData.icnome = items.split(',  ');
  incomeValue.textContent = appData.icnome;
});
savings.addEventListener('click', function () {
  if (appData.savings == true) {
    appData.savings = false;
  } else {
    appData.savings = true;
  }
});
chooseSum.addEventListener('input', function () {
  if (appData.savings == true) {
    let sum = +chooseSum.value,
      percent = +choosePercent.value;
    appData.monthIncome = sum / 100 / 12 * percent;

    appData.yearIncome = sum / 100 * percent;
    monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearsavingsValue.textContent = appData.yearIncome.toFixed(1);

  }
});
choosePercent.addEventListener('input', function () {
  if (appData.savings == true) {
    let sum = +chooseSum.value,
      percent = +choosePercent.value;
    appData.monthIncome = sum / 100 / 12 * percent;

    appData.yearIncome = sum / 100 * percent;
    monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});

let appData = {
  expenses: {},
  optionalExpenses: {},
  icnome: null,
  savings: false,

};


function appDataKey(appData) {
  for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key);
    //получайм ключи мисива
  }
};

console.log(appData);
