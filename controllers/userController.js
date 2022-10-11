const {User} = require('../models/model');

class UserController {
    async create(req, res) {
        try {
            const result = await User.create({
                username: req.body.username,
                password: req.body.password,
            });
            res.json(result);
        } catch (error) {
            res.json(error);
        }
    }

    async getAll(req, res) {
        const result = await User.findAll();
        res.json(result);
    }

    async getOne(req, res) {
        const result = await User.findAll({where: {id: req.params.id}});
        res.json(result);
    }

    async delete(req, res) {
        try {
            const result = await User.destroy({where: {id: req.params.id}});
            res.json(result);
        } catch (error) {
            res.json(error);
        }
    }
}

module.exports = new UserController();