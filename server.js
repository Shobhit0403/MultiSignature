const express = require('express');
const sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();


// const PORT =  

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

db.sequelize.sync({ force: true }).then(() => {
    console.log("db has been re sync")
})

//routes for the user API
app.use('/api/users', userRoutes)

app.listen(process.env.PORT || 8080, () => console.log(`Server is Started`));

