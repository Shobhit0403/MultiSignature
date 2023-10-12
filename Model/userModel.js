// const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            },
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // createdAt: {
        //     type: DataTypes.DATE
        // },
        // updatedAt: {
        //     type: DataTypes.DATE
        // }
    }, { timestamps: true })
    return User;
}