// import User from '@/models/user'
// import { connectToDB } from '@/utils/database'
// import { NextResponse } from 'next/server'
// import { serialize } from 'cookie'
// // import { cookies } from 'next/headers'
// import bcrypt from 'bcrypt'
// import jwt from "jsonwebtoken"
// import { validateRegister } from '@/components/helpers/validateBackendForms'

// export async function POST(request) {
//   try {
//     const body = await request.json()

//     // Validate input
//     const { email, username, password, passwordClue, access, rememberMe } = validateRegister(body)

//     const hashedPassword = await bcrypt.hash(password, 10)
    
//     await connectToDB()

//     //  Check if user already exists through email or username
//     const existingUser = await User.findOne({
//       $or: [{ email }, { username }],
//     });

//     if (existingUser) {
//       return NextResponse.json({
//         success: false,
//         error: 'User already registered!! Change your username or email',
//       }, { status: 409 }) // 409 = Conflict
//     }

//     // Create a new user
//     const newUser = new User({
//       email,
//       username,
//       password: hashedPassword,
//       access,
//       passwordClue,
//       avatar: "/assets/images/bot-1.png",
//     })

//     await newUser.save()

//     // Generate JWT for Chrome extension
//     const token = jwt.sign(
//       {
//         id: newUser._id,
//         username: newUser.username,
//         access: newUser.access,
//       },
//       process.env.JWT_SECRET, 
//       {
//         expiresIn: rememberMe ? "1h" : "30d",
//       }
//     )

//     const cookie = serialize('yield_witness_auth', token, {
//       path: '/',
//       httpOnly: true,
//       maxAge: rememberMe ? (60 * 60) : (60 * 60 * 24 * 30),
//       sameSite: 'Lax',
//       secure: process.env.NODE_ENV === 'production'
//     })

//     // const response = NextResponse.redirect(new URL('/dashboard', request.url))
//     const response = NextResponse.json({ success: true, user: newUser, token, })
//     response.headers.set('Set-Cookie', cookie)

//     return response
//   } catch (err) {
//     console.error('Registration error:', err)
//     return NextResponse.json({ success: false, error: err.message }, { status: 500 })
//   }
// }