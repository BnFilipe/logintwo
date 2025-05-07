// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express'

// Extend the Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']

  if (!token) {
    res.status(403).json({ mensagem: 'Acesso negado. Token não fornecido.' })
    return
  }

  // Remover o prefixo 'Bearer ' do token
  const bearerToken = token.split(' ')[1]

  jwt.verify(bearerToken, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      res.status(403).json({ mensagem: 'Token inválido ou expirado' })
      return
    }

    // Atribui o usuário à requisição
    req.user = user
    next()
  })
}
