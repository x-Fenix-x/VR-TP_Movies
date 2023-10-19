const db = require('../database/models');
const sequelize = db.sequelize;

const actorsController = {
    list: (req, res) => {
        db.Actor.findAll({
            include: ['movies'],
        }).then((actors) => {
            // return res.send(genres);
            return res.render('actorsList', { actors });
        });
    },
    detail: (req, res) => {
        db.Actor.findByPk(req.params.id).then((actor) => {
            return res.render('ActorsDetail', { actor });
        });
    },

    // Rutas para trabajar con el CRUD

    add: function (req, res) {
        const actors = db.Actor.findAll({
            order: [['first_name'], ['last_name']],
        })

            .then(() => {
                return res.render('actorsAdd', {
                    actors,
                });
            })
            .catch((error) => console.log(error));
    },
    create: function (req, res) {
        const { first_name, last_name, rating, favorite_movie_id } = req.body;

        db.Actor.create({
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            rating: rating,
            favorite_movie_id: favorite_movie_id || null,
        })
            .then(() => {
                console.log('Actor agregado exitosamente');
                return res.redirect('/actors');
            })
            .catch((error) => {
                console.error('Error al agregar el actor:', error);
            });
    },
    edit: function (req, res) {
        db.Actor.findByPk(req.params.id)
            .then((actor) => {
                return res.render('actorsEdit', { actor });
            })
            .catch((error) => {
                console.log(error);
            });
    },
    update: function (req, res) {
        const { first_name, last_name, rating, favorite_movie_id } = req.body;

        db.Actor.update(
            {
                first_name: first_name.trim(),
                last_name: last_name.trim(),
                rating,
                favorite_movie_id: favorite_movie_id || null,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
            .then(() => {
                console.log('Actor agregado correctamente');
                return res.redirect('/actors');
            })
            .catch((error) => console.log(error));
    },
    remove: function (req, res) {
        db.Actor.findByPk(req.params.id).then((actor) => {
            return res.render('actorsDelete', {
                actor,
            });
        });
    },
    destroy: function (req, res) {
        db.Actor_Movie.destroy({
            where: {
                actor_id: req.params.id,
            },
        })
            .then(() => {
                db.Actor.update(
                    {
                        actor_episode: null,
                    },
                    {
                        where: {
                            actor_episode: req.params.id,
                        },
                    }
                ).then(() => {
                    db.Actor.destroy({
                        where: {
                            id: req.params.id,
                        },
                    }).then(() => {
                        return res.redirect('/actors');
                    });
                });
            })
            .catch((error) => console.log(error));
    },
};

module.exports = actorsController;
