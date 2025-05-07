// src/controllers/updateProfileController.ts
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  const { nome, email } = req.body
  const { id } = req.user as { id: number }

  if (!nome || !email) {
    res.status(400).json({ mensagem: 'Nome e e-mail são obrigatórios.' })
    return
  }

  // Validação simples para o formato do e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    res.status(400).json({ mensagem: 'E-mail inválido.' })
    return
  }

  try {
    const userWithEmail = await prisma.usuario.findUnique({
      where: { email },
    })

    if (userWithEmail && userWithEmail.id !== id) {
      res.status(400).json({ mensagem: 'E-mail já em uso por outro usuário' })
      return
    }

    const updatedUser = await prisma.usuario.update({
      where: { id },
      data: { nome, email },
    })

    res.status(200).json({ mensagem: 'Dados atualizados com sucesso', usuario: updatedUser })
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro ao atualizar os dados' })
  }
}
