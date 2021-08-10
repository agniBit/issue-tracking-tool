const router = require('express').Router();
const varify = require('./auth');
const dotenv = require('dotenv');
const Issue = require('../model/Issue');

dotenv.config();


router.get('/getissues', varify, async (req, res) => {
    try {
        const skipValue = parseInt(req.query.skip) || 0;
        const limitValue = parseInt(req.query.limit) || 50;
        const posts = await Issue.find().limit(limitValue).skip(skipValue);
        res.status(200).send(posts);
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
});


router.post('/addissue', varify, async (req, res) => {
    const issue = new Issue(req.body);
    try{
        await issue.save(function(err, doc){
            if(err) res.json({"status":"error","error":err});
            else {
                res.json({"status":"success"});
            }
        });
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
});





module.exports = router;
