const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const del = require('del');

/*************Настройки для загрузки изображений*************/

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/');
    },

    filename: function (req, file, callback) {
        let nameFile = Date.now() + file.originalname;
        callback(null, nameFile.replace(' ', ''));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        let fullName = file.originalname;
        const arr = fullName.split('.');
        const ext = arr[arr.length - 1];
        let rulExtention = ['png', 'jpg', 'gif', 'jpeg', 'JPG', 'JPEG', 'PNG'];
        if (!rulExtention.find(key => {
            return key === ext
        })) {
            return callback({error: 'Не подходит формат изображения!'})
        }
        callback(null, true)
    }
}).single('avatar');


/*************Запросы*************/

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Здесь булут продукты'
    });
});

//получение пользователя
router.get('/:user_id', (req, res, next) => {
    User.findOne({where: {id: req.params.user_id}})
        .then((user) => {
            if (user) {
                res.send(user);
            } else {
                res.send({error: 'Пользователь не найден'});
            }
        });
    res.status(200).json({
        message: req.params.productId
    });
});

//добавление нового пользователя
router.post('/create', (req, res, next) => {
    let us = User.build(req.body);
    us.validate().then((r) => {
        us.save().then(() => {
            res.send({status: true});
            res.end();
        });
    }).catch((e) => {
        const err = {status: false, errors: []};
        for (let item of e.errors) {
            err.errors.push({path: item.path, msg: item.message});
        }
        res.send(err);
        res.end();
    });

    // res.status(200).json(us);
    //http://docs.sequelizejs.com/manual/tutorial/instances.html
});

//загрузка аватарки
router.post('/:user_id/uploadimg', (req, res, next) => {
    User.findOne({where: {id: req.params.user_id}}).then((user) => {
        if (user) {
            upload(req, res, function (err) {
                if (err) {
                    res.send({error: err.error});
                } else {
                    try {
                        if (user.photo) {
                            del(['uploads/' + user.photo]).then(paths => {
                            });
                        }
                        User.update({photo: req.file.filename}, {where: {id: user.id}})
                            .then(() => {
                                res.send({status: true});
                            });
                    } catch (e) {
                        res.send({error: 'Изображение не загружено!'});
                    }
                }
            });
        } else {
            res.send({error: 'Пользователь не найден'});
        }
    });
});


//удаление аватарки
router.post('/:user_id/removeimg', (req, res, next) => {
    User.findOne({where: {id: req.params.user_id}}).then((user) => {
        if (user) {
            if (user.photo) {
                del(['uploads/' + user.photo]).then(paths => {
                });
            }
            User.update({photo: null}, {where: {id: user.id}})
                .then(() => {
                    res.send({status: true});
                });
        } else {
            res.send({error: 'Пользователь не найден'});
        }
    });
});


module.exports = router;