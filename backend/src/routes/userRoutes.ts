// src/routes/userRoutes.ts
import { Router } from 'express'
import { verifyToken } from '../middlewares/authMiddleware'
import { updateProfile } from '../controllers/updateProfileController'
import { changePassword } from '../controllers/changePasswordController'

const router = Router()

// Rota protegida que retorna os dados do usuário logado
router.get('/me', verifyToken, updateProfile, changePassword,  (req, res) => {
  // O usuário está autenticado e podemos acessar seus dados via req.user
  res.status(200).json({ usuario: req.user })
})

export default router
