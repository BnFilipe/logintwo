// src/routes/registerRoutes.ts
import { Router } from 'express'
import { register } from '../controllers/registerController'

const router = Router()

router.post('/', register)

export default router
