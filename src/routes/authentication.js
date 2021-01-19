const { Router } = require('express');
const router = Router();

router.route('/').get((req, res) => {
    res.json({ message: 'Vista de la autenticacion' });
});

module.exports = router;