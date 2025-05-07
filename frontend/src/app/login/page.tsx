'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [senha, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const router = useRouter()
  
  interface LoginResponse {
    token: string
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post<LoginResponse>('http://localhost:3333/login', {
        email,
        senha,
      })

      // Armazenar o token no cookies e no localStorage
      Cookies.set('token', response.data.token, { expires: 1 }) // Expira em 1 dia
      localStorage.setItem('token', response.data.token)

      // Verificar se o login foi bem-sucedido
      if (response.status === 200) {
        // Redireciona para o dashboard
        router.push('/dashboard')
      }

      // Exibir mensagem de sucesso
      setSuccessMessage('Login realizado com sucesso!')
      setErrorMessage('') // Limpa a mensagem de erro, se houver
    } catch (error: any) {
      // Exibir mensagem de erro se algo der errado
      setErrorMessage(error.response?.data?.mensagem || 'Erro ao realizar o login!')
      setSuccessMessage('') // Limpa a mensagem de sucesso, se houver
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        {successMessage && (
          <div className="bg-green-200 text-green-800 p-3 rounded-md text-center">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="bg-red-200 text-red-800 p-3 rounded-md text-center">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-600">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              required
              value={senha}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
