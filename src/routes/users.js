const { Router } = require('express');
const { UserController } = require('../controllers/UserController');
const router = Router();
const userCtrl = new UserController();
const { loggued } = require('../lib/auth');

router.get('/', loggued, async (req, res) => {
    let id = req.user !== undefined ? req.user.id : null;
    const data = await userCtrl.getAllUsers(id);
    res.render('users/listUser', {users: data });
});

router.get('/new-user/', loggued, (req, res) => {
    res.render('users/addUser');
});

router.route('/create-user/').post(async (req, res) => {
    const data = await userCtrl.createUser(req.body);
    var message, url;
    if (data === 0) {
        message = 'failed saved';
    } else if(data == 2) {
        message = 'the fields are required';
    } else if(data == 3) {
        message = 'user already exists';
    } else if(data == 4) {
        message = 'email already exists';
    } else {
        message = 'user created';
    }
    if (data == 0 || data >= 2) {
        url = '/users/new-user/';
    } else {
        url = '/users/';
    }
    req.flash('notifications', message);
    res.redirect(url);
});

router.get('/detail-user/:id', loggued, async (req, res) => {
    const data = await userCtrl.getUser(req.params.id);
    res.render('users/detailUser', {user: data});
});

router.get('/confirmation/:id', loggued, async (req, res) => {
    const data = await userCtrl.getUser(req.params.id);
    res.render('users/confirmation', {user: data});
});

router.get('/delete-user/:id', loggued, async (req, res) => {
    const data = await userCtrl.deleteUser(req.params.id);
    res.redirect('/users/');
})

module.exports = router;