const express = require('express');
const router = express.Router();
const {ensureAuthentificated}= require('../config/auth');

//WelcomePage
router.get('/', (req, res) => res.render('welcome'));

//DashBoard
router.get('/dashboard', (req, res) =>
    res.render('dashboard',{
    name:req.user.name
}));

module.exports = router;
