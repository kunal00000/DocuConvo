import express from 'express'

import { addToQueue } from '../controllers/addtoQueue.controllers.js'

const queueRouter = express.Router()

queueRouter.route('/queue').post(addToQueue)

export default queueRouter
