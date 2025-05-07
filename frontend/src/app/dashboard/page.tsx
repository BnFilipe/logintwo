'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [carregando, setCarregando] = useState(true)
  const [usuario, setUsuario] = useState<string | null>(null)

  useEffect(() => {
    // Verifica se o código está sendo executado no cliente (apenas no cliente é possível usar localStorage)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')

      if (!token) {
        router.push('/login') // Redireciona se não estiver logado
      } else {
        setUsuario('Usuário logado')
      }
      setCarregando(false) // Acessa o estado de carregamento
    }
  }, [router])

  if (carregando) return <div>Loading...</div> // Ou um loading spinner

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Bem-vindo ao Painel</h1>
        <p className="text-center text-gray-700">Você está autenticado! 🎉</p>
        <p className="text-center mt-2 text-sm text-gray-500">{usuario}</p>
      </div>
    </div>
  )
}
