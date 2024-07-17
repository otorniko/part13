const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("blogs", {
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
        })
        await queryInterface.createTable("users", {
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
        })
        await queryInterface.addColumn("blogs", "user_id", {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "users", key: "id" },
        }),
        await queryInterface.addColumn("users", "blog_id", {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: "blogs", key: "id" },
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable("blogs")
        await queryInterface.dropTable("users")
    },
}
