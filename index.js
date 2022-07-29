const express = require('express');
const cors = require('cors');
var app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://student:CYQdMfqnLzMd8AbR@cluster0.4pdhn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const studentCollection = client.db("student").collection("profile");
        // create a document to insert

        app.post('/profile', async (req, res) => {
            const student = req.body;
            const result = await studentCollection.insertOne(student);
            res.send(result)
        })


        app.get('/profile', async (req, res) => {
            const users = await studentCollection.find().toArray();
            res.send(users)
        })
        app.get('/profile/:id', async (req, res) => {
            const id=req.params.id;
            const query = {_id: ObjectId(id)};
            const result= await studentCollection.findOne(query) ;     
            res.send(result)
        })

        app.delete('/profile/:id', async (req, res) => {
            const id= req.body.id;            
            const query = { _id: ObjectId(id) };
            const result = await studentCollection.deleteOne(query);
            res.send(result)
          })

    } finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(port, function () {
    console.log(`Listening on port ${port}`)
})