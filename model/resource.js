const  { sqInst } = require("../sql-inst")
const { Sequelize, DataTypes } = require("sequelize")

const Resource = sqInst.define("resource", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    resourceUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: "resource" })

exports.Resource = Resource