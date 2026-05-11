import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Order from '@/models/Order';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, message: 'Name is required' },
        { status: 400 }
      );
    }
    if (!body.address || !body.address.trim()) {
      return NextResponse.json(
        { success: false, message: 'Address is required' },
        { status: 400 }
      );
    }
    if (!body.whatsapp || !body.whatsapp.trim()) {
      return NextResponse.json(
        { success: false, message: 'WhatsApp number is required' },
        { status: 400 }
      );
    }

    const orderId = 'AF-' + Date.now();

    const order = new Order({
      id: orderId,
      productName: body.productName || 'Unknown Product',
      product: body.product || body.productName || '',
      selectedSize: body.selectedSize || body.size || '',
      size: body.size || body.selectedSize || '',
      color: body.color || '',
      quantity: body.quantity || '',
      price: body.price || '',
      totalPrice: body.totalPrice || body.price || '',
      name: body.name,
      customer: body.customer || body.name || '',
      address: body.address || '',
      postcode: body.postcode || '',
      whatsapp: body.whatsapp || '',
      selectedImage: body.selectedImage || '',
      paymentMethod: body.paymentMethod || 'Cash on Delivery',
      unit: body.unit || '',
      status: 'pending',
    });

    await order.save();

    return NextResponse.json({
      success: true,
      message: 'Order placed successfully!',
      orderId: orderId,
    });
  } catch (error) {
    console.error('Order submission error:', error);
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        success: false,
        message: `Failed to place order: ${errorMsg}`,
      },
      { status: 500 }
    );
  }
}
