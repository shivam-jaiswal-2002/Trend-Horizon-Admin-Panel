// pages/api/products.js
import connectDB from '../../../utils/db';
import Payment from '../../../models/Payment';
import { NextResponse } from 'next/server';
export const revalidate = 0;
export const GET = async (req, res) => {
  const db = await connectDB();
  try {
    const products = await Payment.find({});
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
};
