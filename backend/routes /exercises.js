const router = require("express").Router();
let Excercise = require("../models/exercise.model");
router.route("/").get((req, res) => {
  Excercise.find()
    .then((excercises) => res.json(excercises))
    .cath((err) => res.status(400).json("Error" + err));
});
router.route;
