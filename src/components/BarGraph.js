import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarGraph = ({ transactions }) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy previous chart instance if exists
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Prepare x-axis labels (days of the week)
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Calculate total expenses and incomes for each day of the week
    const data = {
      labels: daysOfWeek,
      datasets: [
        {
          label: 'Expenses',
          backgroundColor: 'rgba(222, 36, 2, 1)',
          data: calculateData(daysOfWeek, transactions, 'expense')
        },
        {
          label: 'Incomes',
          backgroundColor: 'rgba(18, 225, 2, 1)',
          data: calculateData(daysOfWeek, transactions, 'income')
        }
      ]
    };

    // Initialize new chart instance
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            stepSize: 100 // Fixed step size for y-axis
          }
        }
      }
    });

    // Cleanup function
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [transactions]);

  // Helper function to calculate data points for each day of the week
  const calculateData = (labels, transactions, type) => {
    const data = new Array(labels.length).fill(0);
    transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      const index = transactionDate.getDay();
      if (transaction.type === type) {
        data[index] += parseFloat(transaction.amount);
      }
    });
    return data;
  };

  return (
    <div className='bar'>
        <h2>Weekly Summary</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarGraph;
