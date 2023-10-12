module.exports = (sequelize, DataTypes) => {
    const Process = sequelize.define("process", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        processName: {
            type: DataTypes.STRING,
        },
        processUserId: { //one - one relationship with user
            type: DataTypes.INTEGER,
        },
        // userAccessToComments: {// many to one relation ship
        //     type: DataTypes.INTEGER,
        // },
        totalApprovals: {
            type: DataTypes.INTEGER,
        },
        isApproved: {
            type: DataTypes.BOOLEAN,
        },

    }, { timestamps: true })

    return Process;
}