const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("sessions", {
            sid: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                unique: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id" },
            },
            valid: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        }),
            await queryInterface.addColumn("users", "disabled", {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable("sessions")
        await queryInterface.removeColumn("users", "disabled")
    },
}
