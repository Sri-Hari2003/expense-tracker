const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Transaction = require('./models/Transaction');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/expense-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Define routes

// Route to add a new transaction
app.post('/api/transactions', (req, res) => {
  const { type, itemName, amount, date } = req.body;
  const newTransaction = new Transaction({ type, itemName, amount, date });

  newTransaction.save()
    .then(transaction => res.json(transaction))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
