// src/controllers/changePasswordController.ts
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const changePassword = async (req: Request, res: Response): Promise<void> => {
  const { currentPassword, newPassword } = req.body
  const { id } = req.user as { id: number } // Pegando o id do usuário autenticado

  if (!currentPassword || !newPassword) {
    res.status(400).json({ mensagem: 'Senha atual e nova senha são obrigatórias.' })
    return
  }

  try {
    // Buscar o usuário no banco
    const user = await prisma.usuario.findUnique({
      where: { id },
    })

    if (!user) {
      res.status(404).json({ mensagem: 'Usuário não encontrado.' })
      return
    }

    // Verificar se a senha atual está correta
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.senha)

    if (!isPasswordCorrect) {
      res.status(400).json({ mensagem: 'Senha atual incorreta.' })
      return
    }

    // Validar a nova senha (mínimo de 6 caracteres, por exemplo)
    if (newPassword.length < 6) {
      res.status(400).json({ mensagem: 'A nova senha precisa ter pelo menos 6 caracteres.' })
      return
    }

    // Gerar um hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Atualizar a senha do usuário no banco
    const updatedUser = await prisma.usuario.update({
      where: { id },
      data: { senha: hashedPassword },
    })

    res.status(200).json({ mensagem: 'Senha alterada com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro ao alterar a senha' })
  }
}
