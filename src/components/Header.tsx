import Link from 'next/link'
import { Coffee } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Coffee className="w-8 h-8 text-coffee-600" />
            <span className="text-xl font-bold text-coffee-800">
              Coffee Memo
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/add"
              className="text-gray-600 hover:text-coffee-600 transition-colors duration-200"
            >
              記録追加
            </Link>
            <Link
              href="/records"
              className="text-gray-600 hover:text-coffee-600 transition-colors duration-200"
            >
              記録一覧
            </Link>
            <Link
              href="/analytics"
              className="text-gray-600 hover:text-coffee-600 transition-colors duration-200"
            >
              分析
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
