import Link from 'next/link'
import { Coffee, Plus, BarChart3, List } from 'lucide-react'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-coffee-800 mb-4">
          Coffee Memo
        </h1>
        <p className="text-lg text-gray-600">
          飲んだコーヒーを記録して、味の傾向を分析しよう
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <Link
          href="/add"
          className="card hover:shadow-lg transition-shadow duration-200 group"
        >
          <div className="text-center">
            <Plus className="w-12 h-12 text-coffee-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              新しい記録
            </h2>
            <p className="text-gray-600">
              コーヒーの記録を追加
            </p>
          </div>
        </Link>

        <Link
          href="/records"
          className="card hover:shadow-lg transition-shadow duration-200 group"
        >
          <div className="text-center">
            <List className="w-12 h-12 text-coffee-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              記録一覧
            </h2>
            <p className="text-gray-600">
              過去の記録を確認
            </p>
          </div>
        </Link>

        <Link
          href="/analytics"
          className="card hover:shadow-lg transition-shadow duration-200 group"
        >
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-coffee-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              分析
            </h2>
            <p className="text-gray-600">
              味の傾向を分析
            </p>
          </div>
        </Link>

        <div className="card bg-coffee-50 border-coffee-200">
          <div className="text-center">
            <Coffee className="w-12 h-12 text-coffee-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-coffee-800 mb-2">
              統計
            </h2>
            <p className="text-coffee-600">
              総記録数: 0件
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
