module.exports = (sequelize, DataTypes) => {
    const Approval = sequelize.define("approval", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        approverId: { // one - one relationship with users
            type: DataTypes.INTEGER,
        },
        processId: { // many to one relationship with process
            type: DataTypes.INTEGER
        },
        photoURL: {
            type: DataTypes.STRING,
        },
        isApproved: {
            type: DataTypes.BOOLEAN,
        },
    }, { timestamps: true })

    return Approval;
}