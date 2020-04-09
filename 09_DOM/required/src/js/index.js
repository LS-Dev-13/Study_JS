'use strict';

// getElemenetById
const startСalc = document.getElementById('start');
// getElementsByTagName
const buttonAddFirst = document.getElementsByTagName('button')[0],
      buttonAddSecond = document.getElementsByTagName('button')[1];
// querySelectorAll - nodelist
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
//getElementsByClassName
const budgetMonthValue = document.getElementsByClassName('budget_month-value'),
      budgetDayValue = document.getElementsByClassName('budget_day-value'),
      expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
      additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
      incomePeriodValue = document.getElementsByClassName('income_period-value'),
      targetMonthValue = document.getElementsByClassName('target_month-value');
// querySelector можно по классу, тэгу, айди и атрибуту
const salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-items>.income-title'),
      incomeAmount = document.querySelector('.income-items>.income-amount'),
      expensesTitle = document.querySelector('.expenses-items>.expenses-title'),
      expensesAmount = document.querySelector('.expenses-items>.expenses-amount'),
      expensesItem = document.querySelector('.additional_expenses-item'),
      depositCheck = document.querySelector('#deposit-check'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select');

/* console.log(startСalc, buttonAddFirst, buttonAddSecond, additionalIncomeItem, 
budgetMonthValue, budgetDayValue, expensesMonthValue, additionalIncomeValue, 
additionalExpensesValue, incomePeriodValue, targetMonthValue, salaryAmount, 
incomeTitle, incomeAmount, expensesTitle, expensesAmount, expensesItem, 
depositCheck, depositAmount, depositPercent, targetAmount, periodSelect); */