// src/controllers/registerController.ts
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, senha } = req.body

  try {
    const userExists = await prisma.usuario.findUnique({
      where: { email },
    })

    if (userExists) {
      res.status(400).json({ mensagem: 'E-mail já cadastrado' })
      return
    }

    // Criar o hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10)

    // Salvar o novo usuário no banco de dados
    const newUser = await prisma.usuario.create({
      data: {
        email,
        senha: hashedPassword,
        nome: 'Default Name', // Replace 'Default Name' with the appropriate value
      },
    })

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', usuario: newUser })
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' })
  }
}
