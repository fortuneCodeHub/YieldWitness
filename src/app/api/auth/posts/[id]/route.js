import Post from "@/models/post"
import { NextResponse } from "next/server"

// GET - to help get a specific post, this is for the frontend post display page
export async function GET(request, { params }) {
   
    try {
        
        const { id } = await params
        if (!id) {
            return NextResponse.json({ success: false, error: "Post Id Required" }, { status: 400 })
        }

        const post = await Post.findById(id).lean()

        // Check if a post exists for that Id
        if (!post) {
            return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 })
        }

        // return the success response
        return NextResponse.json({ success: true, post }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 })
    }
}

// export async function PUT(request, { params }) {

// }