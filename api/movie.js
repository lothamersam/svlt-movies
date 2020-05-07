const express = require('express');
const router = express.Router();
const movieController = require('../controller/movieController');

router.post("/", movieController.addMovie);
router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovie);

module.exports = router;