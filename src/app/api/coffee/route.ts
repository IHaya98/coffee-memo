import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreateCoffeeRecord } from '@/types/coffee'

export async function GET() {
  try {
    const records = await prisma.coffeeRecord.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(records)
  } catch (error) {
    console.error('Error fetching coffee records:', error)
    return NextResponse.json(
      { error: 'Failed to fetch coffee records' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateCoffeeRecord = await request.json()
    
    const record = await prisma.coffeeRecord.create({
      data: {
        variety: body.variety,
        shop: body.shop,
        price: body.price,
        acidity: body.acidity,
        bitterness: body.bitterness,
        sweetness: body.sweetness,
        aroma: body.aroma,
        comment: body.comment,
      },
    })
    
    return NextResponse.json(record, { status: 201 })
  } catch (error) {
    console.error('Error creating coffee record:', error)
    return NextResponse.json(
      { error: 'Failed to create coffee record' },
      { status: 500 }
    )
  }
}
