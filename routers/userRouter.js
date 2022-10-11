const Router = require('express');
const router = new Router();
const userContoller = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', userContoller.create);
router.get('/', roleMiddleware([2]), userContoller.getAll);
router.get('/:id', userContoller.getOne);
router.delete('/:id', userContoller.delete);

module.exports = router;