const router = require('express').Router();
let MongoClient = require('mongodb').MongoClient;
const varify = require('./auth');
const dotenv = require('dotenv');
dotenv.config();

router.post('/getdata', varify, async (req, res) => {
    MongoClient.connect(process.env.mongo_url).then((client) => { 

        const connect = client.db('userData'); 
      
        // Collection name 
        const collection = connect.collection("msgIdLogDB"); 
      
        var data = collection.find().skip(parseInt(req.body.skip)).limit(parseInt(req.body.limit)).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
        });
    }).catch((err) => { 
        console.log(err.Message); 
    })
});

module.exports = router;
