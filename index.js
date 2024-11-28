const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const products = require('./products.json');
const cors = require('cors');

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// alauddinhriday
// kzt11YddbJrw0h5W

const uri = "mongodb+srv://alauddinhriday:kzt11YddbJrw0h5W@cluster0.lgngp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      
      const database = client.db('userDB');
      const userCollection = database.collection('users');

      app.get('/users', async (req, res) => {
          const cursor = userCollection.find();
          const result = await cursor.toArray();
          res.send(result);
      });

      app.post('/users', async (req, res) => {
          const user = req.body;
        //   console.log('New User', user); 
          const result = await userCollection.insertOne(user);
          res.send(result);
    })
      
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World 2222');
})

app.get('/products', (req, res) => {
    res.send(products);
})
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const eachProduct = products.find(product => product.id === id);
    res.send(eachProduct);
})

app.listen(port, function () {
    console.log(`Server Running Successfull : ${port}`);  
})
