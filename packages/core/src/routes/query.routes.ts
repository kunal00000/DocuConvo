import express from 'express'

import { searchQuery } from '../controllers/query.controllers.js'

const router = express.Router()

router.route('/query').get(searchQuery)

export default router
