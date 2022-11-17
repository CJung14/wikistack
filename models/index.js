const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});

const Page = db.define("page", {
  title: {
    type: { type: Sequelize.STRING, allowNull: false },
  },
  slug: {
    type: { type: Sequelize.STRING, allowNull: false },
  },
  content: {
    type: { type: Sequelize.TEXT, allowNull: false },
  },
  status: {
    type: Sequelize.ENUM("open", "closed"),
  },
});

const User = db.define("user", {
  name: {
    type: { type: Sequelize.STRING, allowNull: false },
  },
  email: {
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
});

module.exports = { db, Page, User };
