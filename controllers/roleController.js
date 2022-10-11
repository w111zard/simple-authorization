const {Role} = require('../models/model');

class RoleController {
    async create(req, res) {
        try {
            const result = await Role.create({name: req.body.name});
            res.json(result);
        } catch (error) {
            res.json(error);
        }
    }

    async getAll(req, res) {
        const result = await Role.findAll();
        res.json(result);
    }

    async getOne(req, res) {
        const result = await Role.findAll({where: {id: req.params.id}});
        res.json(result);
    }

    async delete(req, res) {
        const result = await Role.destroy({where: {id: req.params.id}});
        res.json(result);
    }
}

module.exports = new RoleController();
