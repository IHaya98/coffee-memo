'use client'

import { useState, useEffect, useCallback } from 'react'
import Header from '@/components/Header'
import CoffeeCard from '@/components/CoffeeCard'
import { CoffeeRecord } from '@/types/coffee'
import { Search, Filter } from 'lucide-react'

export default function RecordsPage() {
  const [records, setRecords] = useState<CoffeeRecord[]>([])
  const [filteredRecords, setFilteredRecords] = useState<CoffeeRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'variety'>('date')

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/coffee')
      if (response.ok) {
        const data = await response.json()
        setRecords(data)
      }
    } catch (error) {
      console.error('Error fetching records:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterAndSortRecords = useCallback(() => {
    const filtered = records.filter(record =>
      record.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.shop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.comment?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'price':
          return (b.price || 0) - (a.price || 0)
        case 'variety':
          return a.variety.localeCompare(b.variety)
        default:
          return 0
      }
    })

    setFilteredRecords(filtered)
  }, [records, searchTerm, sortBy])

  useEffect(() => {
    fetchRecords()
  }, [])

  useEffect(() => {
    filterAndSortRecords()
  }, [filterAndSortRecords])

  const handleDelete = async (id: number) => {
    if (!confirm('この記録を削除しますか？')) return

    try {
      const response = await fetch(`/api/coffee/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setRecords(records.filter(record => record.id !== id))
      } else {
        alert('削除に失敗しました')
      }
    } catch (error) {
      console.error('Error deleting record:', error)
      alert('削除に失敗しました')
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-coffee-800 mb-2">
            コーヒー記録一覧
          </h1>
          <p className="text-gray-600">
            {filteredRecords.length}件の記録があります
          </p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="品種、店舗名、コメントで検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'price' | 'variety')}
                className="input-field"
              >
                <option value="date">日付順</option>
                <option value="price">金額順</option>
                <option value="variety">品種順</option>
              </select>
            </div>
          </div>
        </div>

        {filteredRecords.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              {searchTerm ? '検索結果が見つかりません' : '記録がありません'}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? '検索条件を変更してみてください' : '最初のコーヒー記録を追加してみましょう'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map((record) => (
              <CoffeeCard
                key={record.id}
                record={record}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
