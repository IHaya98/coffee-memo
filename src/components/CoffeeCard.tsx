import { CoffeeRecord } from '@/types/coffee'
import { Calendar, MapPin, DollarSign, Star } from 'lucide-react'

interface CoffeeCardProps {
  record: CoffeeRecord
  onEdit?: (record: CoffeeRecord) => void
  onDelete?: (id: number) => void
}

export default function CoffeeCard({ record, onEdit, onDelete }: CoffeeCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  }

  const renderRating = (value: number | undefined, label: string) => {
    if (!value) return null
    
    return (
      <div className="flex items-center space-x-1">
        <span className="text-sm text-gray-600">{label}:</span>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= value ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">({value})</span>
      </div>
    )
  }

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {record.variety}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{record.shop}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{formatDate(record.createdAt)}</span>
        </div>
      </div>

      {record.price && (
        <div className="flex items-center text-gray-600 mb-3">
          <DollarSign className="w-4 h-4 mr-1" />
          <span className="text-sm">¥{record.price.toLocaleString()}</span>
        </div>
      )}

      <div className="space-y-2 mb-4">
        {renderRating(record.acidity, '酸味')}
        {renderRating(record.bitterness, '苦み')}
        {renderRating(record.sweetness, '甘み')}
        {renderRating(record.aroma, '香り')}
      </div>

      {record.comment && (
        <div className="mb-4">
          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
            {record.comment}
          </p>
        </div>
      )}

      {(onEdit || onDelete) && (
        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
          {onEdit && (
            <button
              onClick={() => onEdit(record)}
              className="text-sm text-coffee-600 hover:text-coffee-700 font-medium"
            >
              編集
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(record.id)}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              削除
            </button>
          )}
        </div>
      )}
    </div>
  )
}
