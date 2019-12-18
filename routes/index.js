const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Anime Modele
const Anime = require('../models/Anime');


// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// home Page
router.get('/home', ensureAuthenticated, (req, res) =>
    res.render('home', {
        user: req.user
    })
);

// Add Page
router.get('/add', ensureAuthenticated, (req, res) => res.render('add'));

// Add Handler
router.post('/add',
    (req, res) => {
        const {animeImage,title,description}=req.body;
        const newAnime = new Anime({
            animeImage,
            title,
            description
        }).save().then(() => {
            req.flash(
                'success_msg',
                'Anime ',title, ' was added successfully'
            );
            console.log(newAnime);
            res.redirect('/home');
        })
            .catch(err => console.log(err));
    });




module.exports = router;