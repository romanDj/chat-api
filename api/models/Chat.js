const Sequelize = require("sequelize");
const db = require("../database/db.js");
const User = require("./User");

module.exports = db.sequelize.define(
    "tbl_chat",
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        user1: {
            type: Sequelize.INTEGER,
            references: {
                model: User,
                key: 'id',
            }
        },
        user2: {
            type: Sequelize.INTEGER,
            references: {
                model: User,
                key: 'id',
            }
        }
    },
    {
        timestamps: false
    }
);