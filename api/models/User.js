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
            allowNull: false
        },
        username: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: {
                args: true,
                msg: 'Пользователь с такой почтой уже существует'
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Не соответствует формату email'
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        token: {
            type: Sequelize.STRING
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isAdmin: {
            type: Sequelize.INTEGER
        },
        birthday: {
            type: Sequelize.DATEONLY,
            defaultValue: Sequelize.NOW,
            allowNull: false
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