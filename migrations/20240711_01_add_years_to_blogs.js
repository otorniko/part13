const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn("blogs", "year", {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: { isAfter: "1990-12-31" },
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn("blogs", "year")
    },
}
