const Sequelize = require("sequelize");
const db = require("../database/db.js");
const User = require("./User");
const Chat = require("./Chat");

module.exports = db.sequelize.define(
    "tbl_message",
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        author: {
            type: Sequelize.INTEGER,
            references: {
                model: User,
                key: 'id',
            }
        },
        chat_id: {
            type: Sequelize.INTEGER,
            references: {
                model: Chat,
                key: 'id',
            }
        },
        content:{
            type: Sequelize.STRING(3000),
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        read: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    },
    {
        timestamps: false
    }
);