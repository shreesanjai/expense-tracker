// server.js

const express = require('express');
const app = express();
const port = 3000;

// Import the connectToMongoDB function from db.cjs
const { connectToMongoDB } = require('./db.cjs');

// Define a route to fetch data from the "expenses" collection
app.get('/expenses', async (req, res) => {
  try {

    const client = await connectToMongoDB();

    const db = client.db('expense-tracker');
    const expensesCollection = db.collection('expenses');

    const expenses = await expensesCollection.find({});

    // Respond with the fetched data
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});