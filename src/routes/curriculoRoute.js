const express = require('express');

const router = express.Router();
const controller = require('../controllers/curriculoController')
router.post('/', controller.postCurriculo);
router.get('/', controller.getCurriculos);
router.get('/:id', controller.getCurriculo);
router.put('/:id', controller.putCurriculo);
router.delete('/:id', controller.deleteCurriculo);
module.exports = router;