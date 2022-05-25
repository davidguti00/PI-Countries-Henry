const { Router } = require('express');
const controllersC = require ('../function/countries_controllers');
const controllersA = require ('../function/activity_controllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use('/countries', controllersC)
router.use('/activity', controllersA)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
