const router = require('express').Router();
const varify = require('./auth');
const dotenv = require('dotenv');
const Issue = require('../model/Issue');
const { v1: uuidv1 } = require('uuid');
const Comment = require('../model/Comment');

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
    console.log(req.body);
    issue.issueId = uuidv1();
    console.log(issue);
    try{
        await issue.save(async function(err, doc){
            if(err) res.status(400).send({"status":"error","error":err});
            else {
                res.status(200).send({"status":"success"});
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
            if (data)
            res.status(200).send(data);
        }
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
})

router.put('/addComment', varify, async (req, res) => {
    try {
        if (req.query.issueId) {
            req.body.id = uuidv1();
            Comment.findOneAndUpdate(
                {issueId: req.query.issueId},
                {$push: {comments: {$each : [req.body] , $position: 0}}},
                {safe: true, upsert: true, new : true, useFindAndModify: false},
                function(err, model) {
                    if (err) {
                        res.status(400).send({status:'error','error':err});
                    } else {
                        res.status(200).send({status:'success'});
                    }
                }
            );
        } else {
            res.status(400).send({status:'error',error:'invalid params - issueId'});
        }
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
})


router.get('/getCommentsById', varify, async (req, res) => {
    try{
        if (req.query.issueId) {
            const data = await Comment.findOne({ issueId: req.query.issueId }, 
            { comments : { $slice: [ parseInt(req.query.skip) || 0, parseInt(req.query.limit) || 20 ] } });
            res.status(200).send(data);
        } else {
            res.status(400).send({status:'error',error:'invalid params - issueId'});
        }
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
})

module.exports = router;
