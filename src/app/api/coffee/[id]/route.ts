import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreateCoffeeRecord } from '@/types/coffee'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    const record = await prisma.coffeeRecord.findUnique({
      where: { id },
    })
    
    if (!record) {
      return NextResponse.json(
        { error: 'Coffee record not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(record)
  } catch (error) {
    console.error('Error fetching coffee record:', error)
    return NextResponse.json(
      { error: 'Failed to fetch coffee record' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    const body: CreateCoffeeRecord = await request.json()
    
    const record = await prisma.coffeeRecord.update({
      where: { id },
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
    
    return NextResponse.json(record)
  } catch (error) {
    console.error('Error updating coffee record:', error)
    return NextResponse.json(
      { error: 'Failed to update coffee record' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    
    await prisma.coffeeRecord.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Coffee record deleted successfully' })
  } catch (error) {
    console.error('Error deleting coffee record:', error)
    return NextResponse.json(
      { error: 'Failed to delete coffee record' },
      { status: 500 }
    )
  }
}
