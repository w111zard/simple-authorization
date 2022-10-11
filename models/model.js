const sequelize = require('../database');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   username: {type: DataTypes.STRING, unique: true, allowNull: false},
   password: {type: DataTypes.STRING, allowNull: false}
});

const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const UserRole = sequelize.define('user_role', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

User.belongsToMany(Role, {through: UserRole});
Role.belongsToMany(User, {through: UserRole});

module.exports = {
    User,
    Role,
    UserRole
};