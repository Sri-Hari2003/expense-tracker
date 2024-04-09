import React from 'react';
import './TransactionListStyles.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}-${month}-${year}`;
};

const TransactionList = ({ transactions, searchQuery, showIncome, showExpense, onDelete }) => {
  // Filter transactions based on searchQuery and active button
  const filteredTransactions = transactions.filter(transaction => {
    const matchSearch = transaction.itemName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = showIncome ? transaction.type === 'income' : showExpense ? transaction.type === 'expense' : true;
    return matchSearch && matchType;
  });

  return (
    <div className="container5">
        <h2>Transactions</h2>
      <div className="transaction-list">
        <ul>
          {filteredTransactions.map((transaction, index) => (
            <li key={index} className={transaction.type}>
              <span>{transaction.type === 'income' ? '+' : '-'}</span>
              <span>{transaction.itemName}</span>
              <span className="amount">₹ {transaction.amount}</span>
              <span className="date">{formatDate(transaction.date)}</span> {/* Format date */}
              <button onClick={() => onDelete(transaction.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;
