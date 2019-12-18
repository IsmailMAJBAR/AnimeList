const express = require('express');
const router = express.Router();

const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth');

// Anime Modele
const Anime = require('../models/Anime');


// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// home Page
router.get('/home', ensureAuthenticated, (req, res,next) =>{
    Anime.find({},(err, returnValue)=>{
        if(err){
            console.log(err);
        }
        else {
            res.render('home',{
                returnValue:returnValue,
                user: req.user
            })
        }
    });
});


//Edit Handler
router.post('/edit',(req,res)=>{
    /* in progress
    const id = req.body['idAnime'];
    console.log(id);
    console.log('delete Handler redirected to home');
    Anime.deleteOne({_id:id},(err)=>{
        if(err){
            console.log(err);
            return;
        }else{
            res.redirect('/home');
        }

    });*/
});



//delete Handler
router.post('/delete',(req,res)=>{
    const id = req.body['idAnime'];
            console.log(id);
            console.log('delete Handler redirected to home');
    Anime.deleteOne({_id:id},(err)=>{
        if(err){
            console.log(err);
            return;
        }else{
            res.redirect('/home');
        }

    });
});


// Add Page
router.get('/add', ensureAuthenticated, (req, res) => res.render('add'));

// Add Handler
router.post('/add',
    (req, res) => {
        const {animeImage, title,category, description} = req.body;
        let errors = [];
        if (!title || !category ||!description) {
            errors.push({msg: 'Please enter all fields'});
        }
        if (errors.length > 0) {
            res.render('add', {
                errors,
                animeImage,
                category,
                title,
                description
            });
        } else {
            const newAnime = new Anime({
                animeImage,
                title,
                category,
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