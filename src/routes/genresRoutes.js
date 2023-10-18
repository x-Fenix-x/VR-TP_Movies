const express = require('express');
const router = express.Router();
const {list, detail, add, create, edit, update, remove, destroy} = require('../controllers/genresController');

router.get('/genres', list);
router.get('/genres/detail/:id', detail);

//Rutas creación del CRUD
router
    .get('/genres/add', add)
    .post('/genres/create', create)
    .get('/genres/edit/:id', edit)
    .put('/genres/update/:id', update)
    .get('/genres/delete/:id', remove)
    .delete('/genres/delete/:id', destroy);

module.exports = router;
