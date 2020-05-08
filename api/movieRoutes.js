const express = require('express');
const router = express.Router();
const movieController = require('./movieController');

router.post("/", movieController.addMovie);
router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovie);

router.post("/:id", movieController.addCriteria);

module.exports = router;