const express =require('express');
const app = express();
const mongo=require('mongoose')
const port = process.env.PORT || 8000
const Expense = require('./models/Expense');
const cors = require('cors');


mongo.connect('mongodb+srv://shreesanjai:Shreesanr34@cluster0.mcujdbo.mongodb.net/expense-tracker?retryWrites=true&w=majority')

app.use(express.json())

const corsOptions = {
    origin: 'https://e-commerce-material-ui.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.get('/expense',async(req,res)=>{
    try{
        const expense = await Expense.find();
        res.send(expense);    
    }
    catch(err)
    {
        res.send(err);
    }
    
})

app.post('/expense/:id',async(req,res)=>{
    try{
    console.log(req.params);
    const id =req.params.id;
    const expense = await Expense.findById(id);
    if(expense)
        res.send(expense);
    else
        res.send("No Output");
    }
    catch(err)
    {
        res.send(err); 
    }   
    
})

app.post('/expense/delete/:id',async(req,res)=>{
    try{
    console.log(req.params);
    const id =req.params.id;
    const expense = await Expense.findByIdAndDelete(id);
    if(expense)
        res.send(expense);
    else
        res.send(`{"Message" : "No Data Found"}`);
    }
    catch(err)
    {
        res.send(`{"Message" : "Error Occured while delete operation"}`); 
    }   
    
})

app.post('/add/expense',async(req,res)=>{
    try{
        console.log(req.body);
        const newEx=req.body;
        await Expense.create(newEx);
        res.send(`{"Message" : "New Instance Created"}`); 
    }
    catch(err)
    {
        res.send(`{"Message" : "Error Occured Instance not Added."}`); 
        
    }
})
  


app.put('/expense/update/:id',async(req,res)=>{
    try{
    console.log(req.params);
    const id =req.params.id;
    const expense = await Expense.findByIdAndUpdate(id,{$set:req.body},{new:true});

    if(expense)
        res.send(expense);
    else
        res.send(`{"Message" : "No Data Found"}`);
    }
    catch(err)
    {
        res.send(`{"Message" : "Error Occured while Update operation"}`); 
    }   
    
})

app.listen(port,()=>console.log(`Server running in ${port}`))