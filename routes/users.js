const express = require("express");
const { User, Page } = require("../models");
const { userPages, userList } = require("../views");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const pages = await Page.findAll({
      where: { authorId: user.id },
    });
    res.send(userPages(user, pages));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
