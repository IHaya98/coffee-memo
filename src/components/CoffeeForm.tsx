'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CoffeeRecord } from '@/types/coffee'

const coffeeSchema = z.object({
  variety: z.string().min(1, '品種を入力してください'),
  shop: z.string().min(1, '店舗名を入力してください'),
  price: z.number().min(0, '金額は0以上で入力してください').optional(),
  acidity: z.number().min(1).max(5).optional(),
  bitterness: z.number().min(1).max(5).optional(),
  sweetness: z.number().min(1).max(5).optional(),
  aroma: z.number().min(1).max(5).optional(),
  comment: z.string().optional(),
})

type CoffeeFormData = z.infer<typeof coffeeSchema>

interface CoffeeFormProps {
  onSubmit: (data: CoffeeFormData) => Promise<void>
  initialData?: Partial<CoffeeFormData>
  isLoading?: boolean
}

export default function CoffeeForm({
  onSubmit,
  initialData,
  isLoading = false,
}: CoffeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CoffeeFormData>({
    resolver: zodResolver(coffeeSchema),
    defaultValues: initialData,
  })

  const handleFormSubmit = async (data: CoffeeFormData) => {
    try {
      await onSubmit(data)
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="variety"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            品種 *
          </label>
          <input
            {...register('variety')}
            type="text"
            id="variety"
            className="input-field"
            placeholder="例: エチオピア モカ"
          />
          {errors.variety && (
            <p className="mt-1 text-sm text-red-600">
              {errors.variety.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="shop"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            店舗名 *
          </label>
          <input
            {...register('shop')}
            type="text"
            id="shop"
            className="input-field"
            placeholder="例: スターバックス"
          />
          {errors.shop && (
            <p className="mt-1 text-sm text-red-600">{errors.shop.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            金額 (円)
          </label>
          <input
            {...register('price', { valueAsNumber: true })}
            type="number"
            id="price"
            className="input-field"
            placeholder="例: 450"
            min="0"
            step="10"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">
          味の評価 (1-5段階)
        </h3>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <label
              htmlFor="acidity"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              酸味
            </label>
            <select
              id="acidity"
              className="input-field"
              {...register('acidity', {
                valueAsNumber: true,
                onChange: (e) => {
                  const value =
                    e.target.value === '' ? undefined : Number(e.target.value)
                  e.target.value = e.target.value
                  return value
                },
              })}
            >
              <option value="">選択してください</option>
              <option value={1}>1 - 弱い</option>
              <option value={2}>2 - やや弱い</option>
              <option value={3}>3 - 普通</option>
              <option value={4}>4 - やや強い</option>
              <option value={5}>5 - 強い</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="bitterness"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              苦み
            </label>
            <select
              id="bitterness"
              className="input-field"
              {...register('bitterness', {
                valueAsNumber: true,
                onChange: (e) => {
                  const value =
                    e.target.value === '' ? undefined : Number(e.target.value)
                  e.target.value = e.target.value
                  return value
                },
              })}
            >
              <option value="">選択してください</option>
              <option value={1}>1 - 弱い</option>
              <option value={2}>2 - やや弱い</option>
              <option value={3}>3 - 普通</option>
              <option value={4}>4 - やや強い</option>
              <option value={5}>5 - 強い</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="sweetness"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              甘み
            </label>
            <select
              id="sweetness"
              className="input-field"
              {...register('sweetness', {
                valueAsNumber: true,
                onChange: (e) => {
                  const value =
                    e.target.value === '' ? undefined : Number(e.target.value)
                  e.target.value = e.target.value
                  return value
                },
              })}
            >
              <option value="">選択してください</option>
              <option value={1}>1 - 弱い</option>
              <option value={2}>2 - やや弱い</option>
              <option value={3}>3 - 普通</option>
              <option value={4}>4 - やや強い</option>
              <option value={5}>5 - 強い</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="aroma"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              香り
            </label>
            <select
              id="aroma"
              className="input-field"
              {...register('aroma', {
                valueAsNumber: true,
                onChange: (e) => {
                  const value =
                    e.target.value === '' ? undefined : Number(e.target.value)
                  e.target.value = e.target.value
                  return value
                },
              })}
            >
              <option value="">選択してください</option>
              <option value={1}>1 - 弱い</option>
              <option value={2}>2 - やや弱い</option>
              <option value={3}>3 - 普通</option>
              <option value={4}>4 - やや強い</option>
              <option value={5}>5 - 強い</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="comment"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          コメント
        </label>
        <textarea
          {...register('comment')}
          id="comment"
          rows={4}
          className="input-field"
          placeholder="味の感想やメモを入力してください"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => reset()}
          className="btn-secondary"
          disabled={isLoading}
        >
          リセット
        </button>
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? '保存中...' : '保存'}
        </button>
      </div>
    </form>
  )
}
