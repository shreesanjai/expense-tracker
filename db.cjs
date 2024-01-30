// db.cjs

const { MongoClient } = require('mongodb');

// Replace the following with your MongoDB Atlas connection string
const atlasConnectionString = 'mongodb+srv://shreesanjai:Shreesanr34@cluster0.mcujdbo.mongodb.net/?retryWrites=true&w=majority';

async function connectToMongoDB() {
  try {
    const client = new MongoClient(atlasConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

    await client.connect();

    console.log('Connected to MongoDB');

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();
