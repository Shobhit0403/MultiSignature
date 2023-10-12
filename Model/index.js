const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(`postgres://postgres:shobhit@04@localhost:5432/xalts`, { dialect: "postgres" })


sequelize.authenticate().then(() => {
    console.log(`DataBase is connected to Xalts`);
}).catch((err) => {
    console.log(err);
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connecting to the model

db.users = require('./userModel')(sequelize, DataTypes);
db.process = require('./process')(sequelize, DataTypes);
db.comment = require('./comment')(sequelize, DataTypes);
db.approval = require('./approval')(sequelize, DataTypes);


//1-1 process user relation ship - jis user ka wo process hai
db.users.hasOne(db.process, { foreignKey: 'processUserId' });
db.process.belongsTo(db.users, { foreignKey: 'processUserId' });

//1 - many process - approval realtionship - 5 approvals 
db.process.hasMany(db.approval, { foreignKey: 'processId' });
db.approval.belongsTo(db.process, { foreignKey: 'processId' });

//1 - many relationship - process - comments
db.process.hasMany(db.comment, { foreignKey: 'processId' });
db.comment.belongsTo(db.process, { foreignKey: 'processId' });

//1 - 1 relationship -  comment - user
db.users.hasOne(db.comment, { foreignKey: 'userId' });
db.comment.belongsTo(db.users, { foreignKey: 'userId' });

//1 - 1 relationship - approval - user
db.users.hasOne(db.approval, { foreignKey: 'approverId' });
db.approval.belongsTo(db.users, { foreignKey: 'approverId' });



module.exports = db;