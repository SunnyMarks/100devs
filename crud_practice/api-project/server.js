const { request, response } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const PORT = 3000;

MongoClient.connect('mongodb+srv://yoda:yodaisop@cluster0.pdtpo.mongodb.net/OrgTest001?retryWrites=true&w=majority', { 
    useUnifiedTopology: true 
}) 
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('OrgTest001')
        const quotesCollection = db.collection('quotes')
        //Handlers-------
        app.listen(PORT, ()=>{
            console.log(`Server running on ${PORT}`)
        })
        ///Middlewares ------
        app.use(bodyParser.urlencoded({ extended: true }))
            console.log('May Node be with you');
        //Routes -----
        app.get('/', (request, response) => {
            db.collection('quotes').find().toArray()
            
            .then(results => {
                console.log(results)
            })
            .catch(error => console.error(error))
           
            response.sendFile(__dirname + '/index.html')
        });
        app.post('/quotes', (request, response) => {
            quotesCollection.insertOne(request.body)
                .then(result => {
                    response.redirect('/')
                })
                .catch(error => console.error(error))
            //console.log(request.body)
        })
        
    })

    .catch(error => console.error(error))
    


//Place body-parser before your CRUD handlers!
