'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import CoffeeForm from '@/components/CoffeeForm'
import { CreateCoffeeRecord } from '@/types/coffee'

export default function AddCoffeePage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: CreateCoffeeRecord) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/coffee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create coffee record')
      }

      router.push('/records')
    } catch (error) {
      console.error('Error creating coffee record:', error)
      alert('記録の保存に失敗しました。もう一度お試しください。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-coffee-800 mb-2">
              新しいコーヒー記録
            </h1>
            <p className="text-gray-600">
              飲んだコーヒーの詳細を記録しましょう
            </p>
          </div>

          <div className="card">
            <CoffeeForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  )
}
