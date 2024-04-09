import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TransactionList from './components/TransactionList';
import './App.css';
import BarGraph from './components/BarGraph';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showIncome, setShowIncome] = useState(false);
  const [showExpense, setShowExpense] = useState(false);

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterIncome = (show) => {
    setShowIncome(show);
  };

  const handleFilterExpense = (show) => {
    setShowExpense(show);
  };

  const handleDeleteTransaction = (index) => {
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    setTransactions(updatedTransactions);
  };

  // Calculate total balance
  const totalBalance = transactions.reduce((total, transaction) => {
    return transaction.type === 'income' ? total + parseFloat(transaction.amount) : total - parseFloat(transaction.amount);
  }, 0);

  

  return (
    <div className='app-container'>
      <h1>Expense Tracker</h1>
      <Navbar
        onAddTransaction={handleAddTransaction}
        onSearch={handleSearch}
        onFilterIncome={handleFilterIncome}
        onFilterExpense={handleFilterExpense}
        totalBalance={totalBalance} // Pass the total balance as a prop to Navbar
      />

      <div className='content-container'>
        <div className='transaction-list-container'>
          <TransactionList
            transactions={transactions}
            searchQuery={searchQuery}
            showIncome={showIncome}
            showExpense={showExpense}
            onDelete={handleDeleteTransaction}
          />
        </div>
        <div className='bar-graph-container'>
          <BarGraph transactions={transactions} period='daily' />
        </div>
      </div>
    </div>
  );
};

export default App;
