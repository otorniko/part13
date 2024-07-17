const { Model, DataTypes } = require("sequelize")
const { sequelize } = require("../utils/db")

class Session extends Model{}

Session.init(
    {
        sid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "users", key: "id" },
        },
        valid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: "session",
    }
)

module.exports = Session