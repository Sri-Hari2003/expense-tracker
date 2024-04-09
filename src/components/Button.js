import React, { useState } from 'react';
import './ButtonStyles.css';

const IncomeButton = ({ isActive, onClick }) => {
  return (
    <button
      className={`income-button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      Income
    </button>
  );
};

const ExpenseButton = ({ isActive, onClick }) => {
  return (
    <button
      className={`expense-button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      Expense
    </button>
  );
};

const ButtonContainer = ({ onFilterIncome, onFilterExpense }) => {
  const [incomeActive, setIncomeActive] = useState(false);
  const [expenseActive, setExpenseActive] = useState(false);

  const handleIncomeClick = () => {
    setIncomeActive(!incomeActive); // Toggle the active state
    setExpenseActive(false); // Ensure the other button is inactive
    onFilterIncome(!incomeActive); // Toggle the filter state
    onFilterExpense(false); // Ensure the other filter is inactive
  };

  const handleExpenseClick = () => {
    setExpenseActive(!expenseActive); // Toggle the active state
    setIncomeActive(false); // Ensure the other button is inactive
    onFilterIncome(false); // Ensure the other filter is inactive
    onFilterExpense(!expenseActive); // Toggle the filter state
  };

  return (
    <div>
      <IncomeButton isActive={incomeActive} onClick={handleIncomeClick} />
      <ExpenseButton isActive={expenseActive} onClick={handleExpenseClick} />
    </div>
  );
};

export default ButtonContainer;
