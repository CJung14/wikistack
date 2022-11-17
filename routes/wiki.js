const express = require("express");
const { addPage, wikiPage, main } = require("../views");
const { Page, User } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  try {
    res.send(addPage());
  } catch(error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findOrCreate({
      where: { name: `${req.body.name}` },
      defaults: { email: `${req.body.email}` },
    });
    const page = new Page({
      title: req.body.title,
      content: req.body.content,
      authorId: user[0].id,
    });
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const page = await Page.findAll({
      where: {
        slug: `${slug}`,
      },
    });
    const author = await User.findAll({
      where: { id: page[0].authorId },
    });
    console.log(author);
    res.send(wikiPage(page[0], author[0]));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
