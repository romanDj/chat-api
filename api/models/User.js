const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
    "tbl_user",
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstname: {
            type: Sequelize.STRING,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: 'Поле фамилия обязательно для заполнения.'
                }
            }
        },
        username: {
            type: Sequelize.TEXT,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: 'Поле имя обязательно для заполнения.'
                }
            }
        },
        email: {
            type: Sequelize.STRING,
            defaultValue: '',
            unique: {
                args: true,
                msg: 'Пользователь с такой почтой уже существует'
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Не соответствует формату email'
                },
                notEmpty: {
                    msg: 'Поле email обязательно для заполнения.'
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            defaultValue: '',
            validate:{
                notEmpty: {
                    msg: 'Поле пароль обязательно для заполнения.'
                }
            }
        },
        token: {
            type: Sequelize.STRING
        },
        photo: {
            type: Sequelize.STRING
        },
        isAdmin: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        birthday: {
            type: Sequelize.DATEONLY,
            validate: {
                notEmpty: {
                    msg: 'Поле дата рождения обязательно для заполнения.'
                }
            }
        },
        // ,bar_id: {
        //     type: Sequelize.INTEGER,
        //
        //     references: {
        //         // This is a reference to another model
        //         model: Bar,
        //
        //         // This is the column name of the referenced model
        //         key: 'id',
        //
        //         // This declares when to check the foreign key constraint. PostgreSQL only.
        //         deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        //     }
        // }
    },
    {
        timestamps: false
    }
);