import React, { useState, useEffect, useRef } from 'react';
import './AddButtonStyles.css';

const AddButton = ({ onAdd }) => {
  const [isActive, setIsActive] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [date, setDate] = useState('');
  const promptRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (promptRef.current && !promptRef.current.contains(event.target)) {
        setPromptOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    setIsActive(!isActive);
    setPromptOpen(!promptOpen);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleAddItem = () => {
    if (!itemName.trim() || !amount.trim()) {
      alert('Input is empty. Please provide a transaction name and amount.');
      return;
    }

    const currentDate = date || new Date().toISOString().slice(0, 10); // Use selected date or current date
    onAdd({ type, itemName, amount, date: currentDate });
    setItemName('');
    setAmount('');
    setDate('');
    setPromptOpen(false);
  };

  return (
    <div className={`add-button ${isActive ? 'active' : ''}`} ref={promptRef}>
      <button className="circle" onClick={handleButtonClick}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 5C12.5523 5 13 5.44772 13 6V11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H13V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H11V6C11 5.44772 11.4477 5 12 5Z"
            fill="currentColor"
          />
        </svg>
      </button>
      {promptOpen && (
        <div className="prompt">
          <div className="type-options">
            <div>
              <input
                type="radio"
                value="income"
                checked={type === 'income'}
                onChange={handleTypeChange}
              />
              <label>Income</label>
            </div>
            <div>
              <input
                type="radio"
                value="expense"
                checked={type === 'expense'}
                onChange={handleTypeChange}
              />
              <label>Expense</label>
            </div>
          </div>
          <input
            type="text"
            placeholder="Transaction Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Transaction Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
          />
          <button className="add" onClick={handleAddItem}>Add</button>
        </div>
      )}
    </div>
  );
};

export default AddButton;
