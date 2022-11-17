const express = require('express');
const {addPage, editPage, wikiPage, main} = require('../views')
const {Page, db} = require('../models');


const router = express.Router();

const slugString = (title) => {
    return title.replaceAll(/[^a-zA-Z\d\s:]/g, '').replaceAll(/\s+/g, '_');
}

router.get('/', async (req, res) => {

    const pages = await Page.findAll();
    console.log(pages[0]);

    res.send(main(pages));
})

router.get('/add', (req, res) => {
    res.send(addPage());
})

router.post('/', async (req,res, next) => {
    try {
        const page = new Page({
          title: req.body.title,
          content: req.body.content,
          slug: slugString(req.body.title)
        });
        
        await page.save();
        // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
        res.redirect(`/wiki/${page.slug}`);
      } catch (error) { next(error) }
    });

router.get('/:slug', async (req, res, next) => {
    try{
    const slug = req.params.slug;
    const page = await Page.findAll({
        where: {
            slug:`${slug}`
        }
    })
    res.send(wikiPage(page[0]));
}
    catch (error) {
        next(error);
    }
})

module.exports = router;



