// pages/api/orderUpdate.js
import connectDB from '../../../utils/db';
import Payment from '../../../models/Payment';
import { NextResponse } from 'next/server';
export const revalidate = 0;
export async function PUT(req) {
  await connectDB();

  try {
    const orderData = await req.json();
    console.log(orderData._id);

    // Find the order by its ID and update the status
    const updatedOrder = await Payment.findByIdAndUpdate(orderData._id, { status: orderData.status }, { new: true });

    if (!updatedOrder) {
      throw new Error('Order not found');
    }

    return NextResponse.json({ success: true, data: updatedOrder }, { status: 200 });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
