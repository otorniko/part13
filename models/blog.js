const { Model, DataTypes } = require("sequelize")
const { sequelize } = require("../utils/db")

class Blog extends Model {}
Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: { isAfter: "1990-12-31" },
        },
    },
    {
        sequelize,
        timestamps: true,
        updatedAt: "updated_at",
        createdAt: "created_at",
        underscored: true,
        modelName: "blog",
    }
)

module.exports = Blog
