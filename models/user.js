const { Model, DataTypes } = require("sequelize")
const { sequelize } = require("../utils/db")

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        disabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        timestamps: true,
        updatedAt: "updated_at",
        createdAt: "created_at",
        underscored: true,
        modelName: "user",
    }
)

module.exports = User
