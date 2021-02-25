const router = require("express").Router();
let Excercise = require("../models/exercise.model");
router.route("/").get((req, res) => {
  Excercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error" + err));
});
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExcercise = new Excercise({
    username,
    description,
    duration,
    date,
  });
  newExcercise
    .save()

    .then(() => res.json("Excercise added"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/:id").get((req, res) => {
  Excercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/:id").delete((req, res) => {
  Excercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Excercise deleted"))
    .catch((err) => res.status(400).json("Error" + err));
});
router.route('/update/:id').post((req, res) => {
  Excercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);
      exercise
        .save()

        .then(() => res.json("Excercise added"))
        .catch((err) => res.status(400).json("Error" + err));
    })
    .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
