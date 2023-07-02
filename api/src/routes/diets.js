const { Router } = require('express')
const { getDietsHandler } = require('../handlers/DietsHandler.js')

const router = Router()

router.get('/', getDietsHandler)

module.exports = router
