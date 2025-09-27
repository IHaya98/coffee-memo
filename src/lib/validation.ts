import { z } from 'zod'

export const coffeeRecordSchema = z.object({
  variety: z.string().min(1, '品種を入力してください').max(100, '品種は100文字以内で入力してください'),
  shop: z.string().min(1, '店舗名を入力してください').max(100, '店舗名は100文字以内で入力してください'),
  price: z.number().min(0, '金額は0以上で入力してください').max(999999, '金額は999,999円以下で入力してください').optional(),
  acidity: z.number().min(1, '酸味は1以上で入力してください').max(5, '酸味は5以下で入力してください').optional(),
  bitterness: z.number().min(1, '苦みは1以上で入力してください').max(5, '苦みは5以下で入力してください').optional(),
  sweetness: z.number().min(1, '甘みは1以上で入力してください').max(5, '甘みは5以下で入力してください').optional(),
  aroma: z.number().min(1, '香りは1以上で入力してください').max(5, '香りは5以下で入力してください').optional(),
  comment: z.string().max(1000, 'コメントは1000文字以内で入力してください').optional(),
})

export const searchSchema = z.object({
  q: z.string().optional(),
  sortBy: z.enum(['date', 'price', 'variety']).optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
})

export type CoffeeRecordInput = z.infer<typeof coffeeRecordSchema>
export type SearchInput = z.infer<typeof searchSchema>
