const models = require('../database/models');
const conn = require('../api/socket').conn;

const addMovie = async (req, res) => {
    try {
        const movie = await models.Movie.create(req.body.movie);
        conn.emit('newMovie', {movie, user: req.body.user});
        return res.status(200).json(movie);
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
};

const getMovies = async (req, res) => {
    try {
        const movies = await models.Movie.findAll();
        return res.status(200).json({movies});
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
};

const getMovie = async (req, res) => {
    try {
        const movie = await models.Movie.findOne({
            where: {id: req.params["id"]},
            include: {
                model: models.Criteria,
                as: "criteria"
            }
        });
        return res.status(200).json({movie});
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
};

module.exports = {
    addMovie,
    getMovies,
    getMovie
};