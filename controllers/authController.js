const {User} = require('../models/model');
const {Role} = require('../models/model');
const {UserRole} = require('../models/model');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {secretKey} = require('../config');

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    };
    return jwt.sign(payload, secretKey, {expiresIn: "24h"});
}

class AuthController {
    async signUp(req, res) {
        try {
            // Check correctness of username and password
            const errors = validationResult(req);
            if (! errors.isEmpty()) {
                return res.status(400).json({message: "Error while sign up!", errors});
            }

            // Check if user already exists
            const {username, password} = req.body;
            const candidate = await User.findAll({where: {username: username}});
            if (candidate.length !== 0) {
                return res.status(400).json({message: `User with name ${username} already exists.`});
            }

            // Add user in User table
            const hashedPassword = bcrypt.hashSync(password, 7);
            const {dataValues:{id:userId}} = await User.create({username: username, password: hashedPassword});


            // Add data in UserRole table
            const roleId = 2;
            await UserRole.create({userId: userId, roleId: roleId});

            res.json({message: "User has been created successfully."});
        } catch (error) {
            res.json(error);
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;

            // Check if user exists
            const user = await User.findOne({where: {username: username}});
            if (! user) {
                return res.status(400).json({message: `User with name ${username} doesn't exist!`});
            }

            // Check password
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (! passwordIsValid) {
                return res.status(400).json({message: 'Wrong password!'});
            }

            // Generate JWT token
            let userRoles = await UserRole.findOne({raw: true, where: {userId: user.id}, attributes: ['roleId']});
            userRoles = Object.values(userRoles);

            const token = generateAccessToken(user.id, userRoles);

            return res.json({message: token});
        } catch (error) {
            console.log(error);
            res.status(400).json({message: "Login error!"})
        }
    }

    async getUsers(req, res) {
        try {
            res.json("server works");
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AuthController();