const jwt = require('jsonwebtoken');
const {secretKey} = require('../config');

module.exports = function(roles) {
    return function(req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(403).json({message: "User isn't authorized!"});
            }
            const {roles: userRoles} = jwt.verify(token, secretKey);
            let hasRole = false;
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if (! hasRole) {
                return res.status(403).json({message: "You can't do this!"})
            }
            next();
        } catch (error) {
            console.log(error);
            return res.status(403).json({message: "User isn't authorized!"})
        }
    }
}