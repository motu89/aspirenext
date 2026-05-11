import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Order from '@/models/Order';

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error('Fetch orders error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await connectDB();
    await Order.deleteMany({});
    return NextResponse.json({ success: true, message: 'All orders deleted successfully' });
  } catch (error) {
    console.error('Delete all orders error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete orders' },
      { status: 500 }
    );
  }
}
