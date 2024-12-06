const express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo");
const Schema = new mongoose.Schema({
  name: String,
});
const item = mongoose.model("task", Schema);
const todo = new item({
  name: "Go for a morning walk",
});
const todo2 = new item({
  name: "Learn Web_D",
});
const todo3 = new item({
  name: "Assignment work",
});
const todo4 = new item({
  name: "Dinner with family",
});
todo.save();
todo2.save();
todo3.save();
todo4.save();
app.get("/", function (req, res) {
  item
    .find({})
    .then((foundItems) => {
      res.render("list", { ejes: foundItems });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/", function (req, res) {
  const itemName = req.body.ele1;
  const todo4 = new item({
    name: itemName,
  });
  todo4.save();
  res.redirect("/");
});
app.post("/delete", function (req, res) {
  const checked = req.body.checkbox1;
  item
    .findByIdAndDelete(checked)
    .then(() => {
      console.log("deleted");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.listen("8000", function () {
  console.log("server is running");
});
