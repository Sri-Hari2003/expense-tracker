import React, { useState } from 'react';
import { IoIosList, IoIosTrendingUp, IoIosCash, IoIosAdd } from 'react-icons/io'; // Import icons from react-icons
import './ExpenseTracker.css'; // Import your CSS file

const ExpenseTracker = () => {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemAmount, setItemAmount] = useState('');
  const [isIncome, setIsIncome] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "itemName") {
      setItemName(value);
    } else if (name === "itemAmount") {
      setItemAmount(value);
    }
  };

  const handleAddItem = () => {
    if (!itemName.trim() || !itemAmount.trim()) {
      alert('Please enter both item name and amount!');
      return;
    }

    const sign = isIncome ? '+' : '-';
    const newItem = { name: itemName, amount: `${sign}${parseFloat(itemAmount)}` };

    if (isIncome) {
      setIncome([...income, newItem]);
    } else {
      setExpense([...expense, newItem]);
    }

    setItemName('');
    setItemAmount('');
    setShowPopup(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handlePopupSelection = (isIncomeSelected) => {
    setIsIncome(isIncomeSelected);
    setShowPopup(false);
  };

  return (
    <div className="expense-tracker-container">
      <h1 className="expense-tracker-title">Expenses Tracker</h1>

      {showPopup && (
        <div className="popup">
          <button onClick={() => handlePopupSelection(true)}>Income</button>
          <button onClick={() => handlePopupSelection(false)}>Expense</button>
        </div>
      )}

      <nav className="bottom-nav">
        <div className="nav-item" onClick={() => setIsIncome(true)}>
          <IoIosTrendingUp size={24} />
        </div>
        <div className="nav-item" onClick={() => setIsIncome(false)}>
          <IoIosCash size={24} />
        </div>
        <div className="nav-item" onClick={togglePopup}>
          <IoIosAdd size={24} />
        </div>
      </nav>

      <div>
        <input
          type="text"
          name="itemName"
          value={itemName}
          onChange={handleInputChange}
          placeholder="Enter item name"
          className="expense-tracker-input"
        />
        <input
          type="number"
          name="itemAmount"
          value={itemAmount}
          onChange={handleInputChange}
          placeholder="Enter item amount"
          className="expense-tracker-input"
        />
        <button onClick={handleAddItem} className="add-button">Add Item</button>
      </div>

      <h2 className="expense-tracker-title">{isIncome ? "Income List" : "Expense List"}</h2>
      <ul className="expense-list">
        {isIncome
          ? income.map((item, index) => (
              <li key={index} className="expense-item">
                {item.name}: ${item.amount}
              </li>
            ))
          : expense.map((item, index) => (
              <li key={index} className="expense-item">
                {item.name}: ${item.amount}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
