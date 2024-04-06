import connectDB from '../../../utils/db';
import Product from '../../../models/Product';
import { NextResponse } from 'next/server';
export const revalidate = 0;
export const PUT = async (req, res) => {
  try {
    const db = await connectDB();

    // Extract ID and data ensuring correct field name
    const { _id, ...data } = await req.json();

    // Ensure ID is extracted correctly
    if (!_id) {
      throw new Error('Missing product ID in request');
    }

    // Correctly use findOneAndUpdate with filter for _id
    const product = await Product.findOneAndUpdate(
      { _id },
      data,
      { new: true } // Return the updated document
    );

    if (!product) {
      throw new Error('Product not found');
    }

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
};
