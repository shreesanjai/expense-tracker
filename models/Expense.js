const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    amount: Number,
    title: String,
    desc: String

});

const Expense = mongoose.model('Expense',Schema);
module.exports=Expense;