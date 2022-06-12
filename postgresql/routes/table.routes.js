const Router = require('express')
const router = new Router()
const tableController = require('../controller/table.controller')

router.post('/table', tableController.createTable)
router.get('/table', tableController.getTable)
router.get('/table/:id', tableController.getOneTable)
router.get('/table', tableController.updateTable)
router.delete('/table/:id', tableController.deleteTable)

module.exports = router
