const express = require('express');
const sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const userRoutes = require('./Routes/userRoutes')
const approvalRoutes = require('./Routes/approvalRoutes')
const commentRoutes = require('./Routes/commentRoutes')
const processRoutes = require('./Routes/processRoutes')
const db = require('./Model/index')


const PORT = process.env.PORT || 8080

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

db.sequelize.sync({ force: true }).then(() => {
    console.log("db has been re sync")
})

//routes for the user API
app.use('/api/users', userRoutes)
app.use('/api/approvals', approvalRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/process', processRoutes)

app.listen(PORT, () => console.log(`Server is Started on ${PORT}`));

