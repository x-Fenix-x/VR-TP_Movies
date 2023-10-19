const express = require('express');
const router = express.Router();
const {list, detail, add, create, edit, update, remove, destroy} = require('../controllers/actorsController');


router
    .get('/actors', list)
    .get('/actors/detail/:id', detail)

    //Rutas creación del CRUD
    .get('/actors/add', add)
    .post('/actors/create', create)
    .get('/actors/edit/:id', edit)
    .put('/actors/update/:id', update)
    .get('/actors/delete/:id', remove)
    .delete('/actors/delete/:id', destroy);

module.exports = router;
