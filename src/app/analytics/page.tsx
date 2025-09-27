'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import { CoffeeStats } from '@/types/coffee'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Coffee, DollarSign, TrendingUp, Star } from 'lucide-react'

const COLORS = ['#8B4513', '#A0522D', '#CD853F', '#DEB887', '#F5DEB3']

export default function AnalyticsPage() {
  const [stats, setStats] = useState<CoffeeStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">読み込み中...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">統計データの取得に失敗しました</p>
          </div>
        </main>
      </div>
    )
  }

  const tasteData = [
    { name: '酸味', value: stats.averageAcidity, color: '#FF6B6B' },
    { name: '苦み', value: stats.averageBitterness, color: '#4ECDC4' },
    { name: '甘み', value: stats.averageSweetness, color: '#45B7D1' },
    { name: '香り', value: stats.averageAroma, color: '#96CEB4' },
  ].filter(item => item.value > 0)

  const priceData = [
    { name: '平均価格', value: stats.averagePrice },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-coffee-800 mb-2">
            コーヒー分析
          </h1>
          <p className="text-gray-600">
            あなたのコーヒー記録を分析してみましょう
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <Coffee className="w-8 h-8 text-coffee-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">総記録数</p>
                <p className="text-2xl font-bold text-coffee-800">
                  {stats.totalRecords}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-coffee-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">平均価格</p>
                <p className="text-2xl font-bold text-coffee-800">
                  ¥{stats.averagePrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-coffee-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">お気に入り店舗</p>
                <p className="text-lg font-bold text-coffee-800">
                  {stats.favoriteShop}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-coffee-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">平均評価</p>
                <p className="text-2xl font-bold text-coffee-800">
                  {((stats.averageAcidity + stats.averageBitterness + stats.averageSweetness + stats.averageAroma) / 4).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {tasteData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                味の傾向
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tasteData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8B4513" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                味のバランス
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={tasteData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value.toFixed(1)}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {tasteData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {stats.totalRecords === 0 && (
          <div className="text-center py-12">
            <Coffee className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              まだ記録がありません
            </h3>
            <p className="text-gray-500">
              コーヒーを記録して分析データを確認しましょう
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
