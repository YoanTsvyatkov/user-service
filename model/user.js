const  { sqInst  } = require("../sql-inst");
const { Sequelize } = require("sequelize");

const User = sqInst.define("user", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING(25),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { tableName: "user" });

exports.User =  User