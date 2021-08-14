const router = require('express').Router();
const varify = require('./auth');
const dotenv = require('dotenv');
const Issue = require('../model/Issue');
const { v1: uuidv1 } = require('uuid');

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
    issue.issueId = uuidv1();
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


router.get('/getissueById', varify, async (req, res) => {
    try{
        if (req.query.issueId) {
            const data = await Issue.findOne({"issueId": req.query.issueId});
            if (data) res.status(200).send(data);
        }
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
})

module.exports = router;
