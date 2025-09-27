import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'トップ' },
  { href: '/add', label: '追加' },
  { href: '/records', label: '記録' },
  { href: '/analytics', label: '分析' },
]

export default function Navigation() {
  const pathname = usePathname()
  return (
    <nav>
      {/* PC: サイドバー */}
      <div className="fixed hidden h-full w-48 flex-col bg-gray-100 p-4 md:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`mb-4 rounded p-2 hover:bg-gray-200 ${pathname === item.href ? 'bg-gray-300 font-bold' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      {/* モバイル: ボトムナビ */}
      <div className="fixed bottom-0 left-0 z-50 flex w-full justify-around border-t bg-gray-100 md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 py-2 text-center ${pathname === item.href ? 'bg-gray-300 font-bold' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
