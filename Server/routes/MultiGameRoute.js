const {
    createEpisode,
    getAllEpisodes,
    getEpisodeById,
    deleteEpisode
} = require('../Controllers/MultiGameController')

const route = require('express').Router()

route.route('/')
    .post(createEpisode)
    .get(getAllEpisodes)

route.route('/:id')
    .get(getEpisodeById)
    .delete(deleteEpisode)

module.exports = route
