const express = require('express')
const router = express.Router()
const Author = require('../models/author')


// All Authors route

router.get('/', async (req, res, next) => {
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch (error) {
        res.redirect('/')
    }
})

//  New Author route

router.get('/new', (req, res, next) => {
    res.render('authors/new', { author: new Author() })
})

// Create Author route
router.post('/', async (req, res, next) => {
    const author = new Author({
        name: req.body.name
    });

    try {
        const newAuthor = await author.save();
        res.redirect('authors');
        // res.redirect(`authors/${newAuthor.id}`)
    } catch (error) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating author'
        });
    }
});






module.exports = router;