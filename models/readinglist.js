const { Model, DataTypes } = require("sequelize")
const { sequelize } = require("../utils/db")

class Readinglist extends Model {}

Readinglist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "users", key: "id" },
        },
        blogId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "blogs", key: "id" },
            onDelete: "CASCADE",
        },
        read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: "readinglist",
    }
)

module.exports = Readinglist
