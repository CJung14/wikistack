const express = require("express");
const morgan = require("morgan");

const { db, Page, User } = require("./models");

const wikiRouter = require("./routes/wiki");
const usersRouter = require("./routes/users");

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/wiki", wikiRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.redirect("/wiki");
});

app.use("/", (err, req, res, next) => {
  console.error(err);
  res.status(500).send("BOO >:(");
});
app.get("*", (req, res) => {
  res.status(404).send("PAGE DOES NOT EXIST >:(");
});

const connect = async () => {
  await db.authenticate();
  console.log("connected to the database");
  await db.sync();
  console.log("database synced");
  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};
connect();
