import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export async function GET(request) {
  try {
    // Get token from cookies
    const cookieHeader = request.headers.get('cookie') || ''
    const cookies = parse(cookieHeader)
    const token = cookies.yield_witness_auth || null

    if (!token) {
      return NextResponse.json({ success: false , error: 'Not Authenticated' }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return NextResponse.json({ success: false , error: 'Not Authenticated' }, { status: 401 })
    }
    
    await connectToDB()

    // Get user detail
    const user = await User.findOne({ _id: decoded.id }).lean()

    if (!user) {
        return NextResponse.json({ success: false , error: 'User not found' }, { status: 404 })
    }

    // Return decoded user info
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        access: user.access,
        avatar: user.avatar,
      }, // contains the payload you put when signing the token
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid or expired token or It could be an internet connection issue" },
      { status: 401 }
    );
  }
}
