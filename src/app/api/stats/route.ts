import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const records = await prisma.coffeeRecord.findMany()
    
    const totalRecords = records.length
    
    const averagePrice = records.length > 0
      ? records
          .filter((r: any) => r.price !== null)
          .reduce((sum: number, r: any) => sum + Number(r.price), 0) / records.filter((r: any) => r.price !== null).length
      : 0
    
    const shopCounts = records.reduce((acc: Record<string, number>, record: any) => {
      acc[record.shop] = (acc[record.shop] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const favoriteShop = Object.keys(shopCounts).reduce((a, b) => 
      shopCounts[a] > shopCounts[b] ? a : b, 'なし'
    )
    
    const averageAcidity = records.length > 0
      ? records
          .filter((r: any) => r.acidity !== null)
          .reduce((sum: number, r: any) => sum + (r.acidity || 0), 0) / records.filter((r: any) => r.acidity !== null).length
      : 0
    
    const averageBitterness = records.length > 0
      ? records
          .filter((r: any) => r.bitterness !== null)
          .reduce((sum: number, r: any) => sum + (r.bitterness || 0), 0) / records.filter((r: any) => r.bitterness !== null).length
      : 0
    
    const averageSweetness = records.length > 0
      ? records
          .filter((r: any) => r.sweetness !== null)
          .reduce((sum: number, r: any) => sum + (r.sweetness || 0), 0) / records.filter((r: any) => r.sweetness !== null).length
      : 0
    
    const averageAroma = records.length > 0
      ? records
          .filter((r: any) => r.aroma !== null)
          .reduce((sum: number, r: any) => sum + (r.aroma || 0), 0) / records.filter((r: any) => r.aroma !== null).length
      : 0
    
    const stats = {
      totalRecords,
      averagePrice: Math.round(averagePrice * 100) / 100,
      favoriteShop,
      averageAcidity: Math.round(averageAcidity * 100) / 100,
      averageBitterness: Math.round(averageBitterness * 100) / 100,
      averageSweetness: Math.round(averageSweetness * 100) / 100,
      averageAroma: Math.round(averageAroma * 100) / 100,
    }
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
