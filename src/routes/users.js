const { Router } = require('express');
const { UserController } = require('../controllers/UserController');
const router = Router();
const userCtrl = new UserController();

router.route('/').get(async (req, res) => {
    const data = await userCtrl.getAllUsers();
    res.render('users/listUser', {users: data });
});

router.route('/new-user/').get((req, res) => {
    res.render('users/addUser');
});

router.route('/create-user/').post(async (req, res) => {
    const data = await userCtrl.createUser(req.body);
    if (data === 1) {
        res.redirect('/users/');
    }
});

router.route('/detail-user/:id').get(async (req, res) => {
    const data = await userCtrl.getUser(req.params.id);
    res.render('users/detailUser', {user: data});
});

router.route('/confirmation/:id').get(async (req, res) => {
    const data = await userCtrl.getUser(req.params.id);
    res.render('users/confirmation', {user: data});
});

router.route('/delete-user/:id').get(async (req, res) => {
    const data = await userCtrl.deleteUser(req.params.id);
    res.redirect('/users/');
})

module.exports = router;