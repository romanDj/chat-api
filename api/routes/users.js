const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Chat = require('../models/Chat');
const Message = require('../models/Message');



router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'Здесь булут продукты'
    });
});

router.get('/:productId', (req, res, next)=>{
    res.status(200).json({
        message: req.params.productId
    });
});

router.post('/create', (req, res, next)=>{
    User.create({email: 'lol12@gmail.com', password: 'mypass'})
        .then(() => {
            res.json("Task Added")
        })
        .catch(err => {
            res.json(err.errors)
        });
    // res.status(200).json(req.body);
});

router.post('/uploadimg', (req, res, next)=>{
    req.files.avatar.mv('/uploads/'+new Date().toISOString()+req.files.avatar.name, function (err) {
        if(err){
            res.json(err);
        }else{
            res.json({my:'Картинка загружена'});
        }

    });
});

module.exports = router;