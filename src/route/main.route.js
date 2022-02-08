const router = require('express').Router();
const { checkAuthenticated } = require('../middleware/auth.middleware');

router.use('/api', checkAuthenticated, require('../route/api.route'))
router.use('/auth', require('../modules/auth/auth.route'));

module.exports = router;