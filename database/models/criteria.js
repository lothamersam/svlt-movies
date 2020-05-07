'use strict';
module.exports = (sequelize, DataTypes) => {
    const Criteria = sequelize.define('Criteria', {
        name: DataTypes.STRING,
        value: DataTypes.STRING,
        note: DataTypes.STRING,
        movieId: DataTypes.INTEGER
    }, {});
    Criteria.associate = function (models) {
        Criteria.belongsTo(models.Movie, {
            foreignKey: 'movieId',
            as: 'movie'
        })
    };
    return Criteria;
};