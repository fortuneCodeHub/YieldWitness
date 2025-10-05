import User from '@/models/user'
import { connectToDB } from '@/utils/database'
import { NextResponse } from 'next/server'
import { serialize } from 'cookie'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { validateLogin } from '@/components/helpers/validateBackendForms'

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate input
    const { email, password, rememberMe } = validateLogin(body)

    await connectToDB()

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email or password',
      }, { status: 401 }) // 401 = Unauthorized
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email or password',
      }, { status: 401 })
    }

    // Generate JWT for Chrome extension
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        access: user.access,
      },
      process.env.JWT_SECRET, // put a strong secret in .env
      {
        expiresIn: rememberMe ? "1h" : "30d", // match your cookie logic
      }
    )

    const cookie = serialize('yield_witness_auth', token, {
      path: '/',
      httpOnly: true,
      maxAge: rememberMe ? (60 * 60) : (60 * 60 * 24 * 30),
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production'
    })

    const response = NextResponse.json({ 
      success: true, 
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        access: user.access,
      },
      token,
    })
    response.headers.set('Set-Cookie', cookie)

    return response
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
