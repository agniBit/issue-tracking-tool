const router = require('express').Router();
const User = require('../model/User');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
dotenv.config();

const Joi = require('joi')

const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
});

mongoose.connect(
    process.env.mongo_url,
    { useNewUrlParser: true },
    () => console.log('connected to DB')
);


router.post('/register', async (req, res) => {
    const validation = schema.validate(req.body);
    if(validation.error){
        res.status(400).send(validation.error);
    } else {
        // hash password
        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            username: req.body.username,
            password: hashPassword
        });
        try{
            await user.save(function(err, doc){
                if(err) res.json({"error()":err});
                else {
                        res.json({"doc ":doc});
                }
            })
            console.log('saved');
        } catch(err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
});


router.post('/login', async (req, res) => {
    const validation = schema.validate(req.body);
    if(validation.error){
        res.status(400).send(validation.error);
    } else {
        const checkUser = await User.findOne({"username": req.body.username});

        if (!checkUser) return res.status(400).send({'error':'user not found'});
        const validPass = await bcrypt.compare(req.body.password, checkUser.password);

        if (!validPass) return res.status(400).send({'error':'invalid password'});
        const token = jwt.sign({_id: checkUser._id}, process.env.token_secret);
        res.send({'token':token});
    }
});


module.exports = router;