const express = require('express');
const router = express.Router();

const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth');

// Anime Modele
const Anime = require('../models/Anime');


// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// home Page
router.get('/home', ensureAuthenticated, (req, res,next) =>{
    var resultArray = [];
    Anime.find({},(err, returnValue)=>{
        if(err){
            console.log(err);
        }
        else {
            //console.log(returnValue);
           /* res.render('home', {
                user: req.user,

            });*/
            res.render('home',{returnValue:returnValue})

        }
    });

    /* var cursor = Anime.find();
    cursor.forEach((doc) =>{
        resultArray.push(doc);
    },() =>{
        res.render('home', {
            resultArray: resultArray,
            user: req.user
        });
    });*/
});









// Add Page
router.get('/add', ensureAuthenticated, (req, res) => res.render('add'));

// Add Handler
router.post('/add',
    (req, res) => {
        const {animeImage, title, description} = req.body;
        let errors = [];
        if (!title || !description) {
            errors.push({msg: 'Please enter all fields'});
        }
        if (errors.length > 0) {
            res.render('add', {
                errors,
                animeImage,
                title,
                description
            });
        } else {
            const newAnime = new Anime({
                animeImage,
                title,
                description
            });
            newAnime
                .save()
                .then(() => {
                    req.flash(
                        'success_msg',
                        'Anime ', title, ' was added successfully'
                    );
                    console.log(newAnime);
                    res.redirect('/home');
                })
                .catch(err => console.log(err));
        }
    });


module.exports = router;