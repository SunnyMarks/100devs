const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const PORT = 3000;

//fix dotenv to work with MongoClient.connect(dbConnectionStr, ...)
require('dotenv').config()

const dbConnectionStr = process.env.DB_STRING



MongoClient.connect(dbConnectionStr, { 
    useUnifiedTopology: true 
}) 

.then(client => {
        console.log('Connected to Database')
        const db = client.db('OrgTest001')
        const quotesCollection = db.collection('quotes')
        
        app.set('view engine', 'ejs')
        ///Middlewares ------
        app.use(express.urlencoded({ extended: true }))
            console.log('May Node be with you');
        
        app.use(express.json())
        app.use(express.static('public'))
        //Routes -----
        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
            
            .then(results => {
                res.render('index.ejs', { quotes: results })
            })
            .catch(error => console.error(error))
           
            // res.sendFile(__dirname + '/index.html')
        });
        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
            //console.log(req.body)
        })

        app.put('/quotes', (req, res) => {
           quotesCollection.findOneAndUpdate(
               { name: 'Yoda' },
               { 
                   $set: {
                       name: req.body.name,
                       quote: req.body.quote
                   }
                },
               { 
                   upsert: true
                }
           )
           .then(result => { 
               console.log(result)
            })
           .catch(error => console.error(error))
            console.log(req.body)
        })

        //Listeners-------
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`)
        })
    })

    .catch(error => console.error(error))
    


//Place body-parser before your CRUD handlers!
