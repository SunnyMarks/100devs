const { request, response } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const PORT = 3000;
let db,
dbConnectionStr = process.env.DB_STRING

MongoClient.connect(dbConnectionStr, { 
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
        app.set('view engine', 'ejs')
        ///Middlewares ------
        app.use(bodyParser.urlencoded({ extended: true }))
            console.log('May Node be with you');
        //Routes -----
        app.get('/', (request, response) => {
            db.collection('quotes').find().toArray()
            
            .then(results => {
                response.render('index.ejs', { quotes: results })
            })
            .catch(error => console.error(error))
           
            // response.sendFile(__dirname + '/index.html')
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
