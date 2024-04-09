import React from 'react';

const TotalBalance = ({ total }) => {
  return (
    <div className="total-balance">
      <h2>Total Balance</h2>
      <p>₹ {total}</p>
    </div>
  );
};

export default TotalBalance;
