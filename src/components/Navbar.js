import React from 'react';
import ButtonContainer from './Button'; // Corrected import statement
import AddButton from './AddButton';
import SearchBar from './SearchBar';
import TotalBalance from './TotalBalance';
import './Navbar.css';

const Navbar = ({ onAddTransaction, onSearch, totalBalance, onFilterIncome, onFilterExpense }) => {
  return (
    <div className="navbar">
      <div className="containerMain">
        <div className="container">
          <ButtonContainer onFilterIncome={onFilterIncome} onFilterExpense={onFilterExpense} /> {/* Pass onFilterIncome and onFilterExpense as props */}
          <AddButton onAdd={onAddTransaction} />
        </div>
        <div className="container">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
      <TotalBalance total={totalBalance} />
    </div>
  );
};

export default Navbar;
