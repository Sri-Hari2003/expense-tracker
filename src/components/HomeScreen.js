// src/components/HomeScreen.js
import React from 'react';
import { useExpenseContext } from '../ExpenseContext';

const HomeScreen = () => {
  const { transactions } = useExpenseContext();

  return (
    <div>
      {/* Display balance, line graph, and transaction list */}
      {transactions.map((transaction) => (
        <div key={transaction.id}>
          {transaction.description} - ${transaction.amount}
        </div>
      ))}
      {/* Add transaction button */}
    </div>
  );
};

export default HomeScreen;
