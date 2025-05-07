// src/controllers/loginController.ts
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, senha } = req.body

  try {
    // Verificar se o usuário existe
    const user = await prisma.usuario.findUnique({
      where: { email },
    })

    if (!user) {
      res.status(400).json({ mensagem: 'Usuário não encontrado' })
      return
    }

    // Comparar a senha fornecida com a senha armazenada
    const validPassword = await bcrypt.compare(senha, user.senha)

    if (!validPassword) {
      res.status(400).json({ mensagem: 'Senha incorreta' })
      return
    }

    // Gerar o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key', // Use uma chave secreta segura no .env
      { expiresIn: '1h' } // O token expira em 1 hora
    )

    res.status(200).json({ mensagem: 'Login bem-sucedido', token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro no login' })
  }
}
