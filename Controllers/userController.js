const db = require("../Models");
const jwt = require("jsonwebtoken");
const bcryprt = require("bcrypt");
const { Op } = require('sequelize');



//sign up logic 
// create a new user by hashing pswd, and save in database
//login logic
//find the email of the request in db, -> compare the pswd, generate jwt token -> return User


//TODO: loginId need to be updated

const User = db.users;

const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const data = {
            userName,
            email,
            password: await bcrypt.hash(password, 10),
        };
        const user = await User.create(data);

        if (user) {
            let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);
            return res.status(201).send(user);
        } else {
            return res.status(400).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};


//login authentication
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                [Op.and]: [
                    { email: email },
                    { phone: phone }
                ]
            }

        });
        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            if (isSame) {
                let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);
                //send user data
                return res.status(201).send(user);
            } else {
                return res.status(401).send("Authentication failed");
            }
        } else {
            return res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.log(error);
    }
};


//get all the users map name -> login Id
//api/users/
const allUserDetails = async (req, res) => {

    try {
        const users = await User.findAll();

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};




//getUser Details using the given phone number
//api/users/:phone
const userDetails = async (userIds) => {
    try {
        const users = await User.findAll({
            where: {
                id: userIds
            }
        });

        const userDetailsMap = new Map();

        users.forEach(user => {
            userDetailsMap.set(user.id, {
                userName: user.userName,
                email: user.email,
                phone: user.phone,
                password: user.password
            });
        });

        return userDetailsMap;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

//get process associated with user
// if (!user) {
//     return res.status(404).json({ error: 'User Not found' });
// }




module.exports = {
    signup,
    login,
    allUserDetails,
    userDetails

};

