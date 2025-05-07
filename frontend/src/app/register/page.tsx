'use client'

import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  
  const router = useRouter() // <-- CORRETO: fora da função

  interface RegisterResponse {
    token: string
    mensagem: string
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (!nome.trim() || !email.trim() || !senha.trim()) {
        setMensagem('Por favor, preencha todos os campos.')
        return
      }
      const resposta = await axios.post<RegisterResponse>('http://localhost:3333/register', {
        nome,
        email,
        senha,
      })

      Cookies.set('token', resposta.data.token, { expires: 1 })
      localStorage.setItem('token', resposta.data.token)

      if (resposta.status === 200 || resposta.status === 201) {
        router.push('/dashboard') // <-- Agora vai funcionar corretamente
      }

      setMensagem(resposta.data.mensagem)
      setNome('')
      setEmail('')
      setSenha('')
    } catch (erro: any) {
      setMensagem(erro.response?.data?.mensagem || 'Erro no cadastro')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Cadastro</h2>

        <input
          type="text"
          placeholder="Nome"
          className="w-full mb-3 p-2 border rounded"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-4 p-2 border rounded"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Cadastrar
        </button>

        {mensagem && (
          <p className="mt-4 text-center text-sm text-gray-700">{mensagem}</p>
        )}
      </form>
    </div>
  )
}
