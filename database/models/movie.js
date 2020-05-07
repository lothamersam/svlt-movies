'use strict';
module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        link: DataTypes.STRING,
        rating: DataTypes.INTEGER,
        image: DataTypes.STRING
    }, {});
    Movie.associate = function (models) {
        Movie.hasMany(models.Criteria, {
            foreignKey: 'movieId',
            as: 'criteria',
            onDelete: 'CASCADE'
        })
    };
    return Movie;
};