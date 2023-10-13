module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.STRING,
        },
        userId: { //one - one relationship with users
            type: DataTypes.INTEGER
        },
        processId: { // many to one relationship with process
            type: DataTypes.INTEGER
        },

    }, { timestamps: true })

    return Comment;
}