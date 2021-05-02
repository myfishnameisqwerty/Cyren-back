const express = require('express');
const router = express.Router();
const controller = require('../controllers/users')
/* GET users listing. */
router.get('/', controller.findAll)
router.post('/', controller.Create)
router.put('/:id', controller.Edit)
router.delete('/:id', controller.Delete)

module.exports = router;
