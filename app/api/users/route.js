// pages/api/products.js
import connectDB from '../../../utils/db';
import User from '../../../models/User';
import { NextResponse } from 'next/server';
export const revalidate = 0;
export const GET = async (req, res) => {
  const db = await connectDB();
  try {
    const products = await User.find({});
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
};
