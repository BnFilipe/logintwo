// src/components/ChangePassword.tsx
'use client'
import React, { useState } from 'react'
import axiosInstance from '../utils/axios'

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const token = localStorage.getItem('token') // Supondo que o token JWT está armazenado no localStorage

      if (!token) {
        setErrorMessage('Você precisa estar autenticado para alterar a senha.')
        return
      }

      // Enviar a requisição PUT para a mudança de senha
      interface ChangePasswordResponse {
        mensagem: string
      }

      const response = await axiosInstance.put<ChangePasswordResponse>(
        'http://localhost:5000/user/change-password',
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Passando o token JWT no cabeçalho
          },
        }
      )

      setSuccessMessage(response.data.mensagem)
      setErrorMessage('')
    } catch (error: any) {
      setErrorMessage(error.response?.data?.mensagem || 'Erro ao alterar a senha.')
      setSuccessMessage('')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Alterar Senha</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
              Senha Atual:
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              Nova Senha:
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Alterar Senha
          </button>
        </form>

        {errorMessage && <p className="mt-4 text-sm text-red-600">{errorMessage}</p>}
        {successMessage && <p className="mt-4 text-sm text-green-600">{successMessage}</p>}
      </div>
    </div>
  )
}

export default ChangePassword
