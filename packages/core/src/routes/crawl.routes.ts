import express from 'express'
import { crawlController } from '../controllers/crawl.controllers'

const router = express.Router()

router.route('/crawl').post(crawlController)

export default router
