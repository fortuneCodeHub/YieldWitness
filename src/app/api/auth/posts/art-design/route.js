import Post from "@/models/post";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

// export async function GET(request) {
//   try {
//     await connectToDB();

//     const posts = await Post.find({
//       category: "art-design",
//     }).sort({ createdAt: -1 });

//     return new NextResponse(
//       JSON.stringify({ success: true, posts }),
//       {
//         status: 200,
//         headers: {
//           "Access-Control-Allow-Origin": "https://pixelmuseart.vercel.app",
//           "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//           "Access-Control-Allow-Headers": "Content-Type, Authorization",
//         }
//       }
//     );

//   } catch (err) {
//     console.error("Fetch Posts API Error:", err);

//     return new NextResponse(
//       JSON.stringify({ error: "Server error" }),
//       {
//         status: 500,
//         headers: {
//           "Access-Control-Allow-Origin": "https://pixelmuseart.vercel.app",
//         }
//       }
//     );
//   }
// }

// // Allow OPTIONS request for CORS preflight
// export async function OPTIONS() {
//   return new NextResponse(null, {
//     status: 204,
//     headers: {
//       "Access-Control-Allow-Origin": "https://pixelmuseart.vercel.app",
//       "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//     }
//   });
// }


export async function GET(request) {
    const origin = request.headers.get("origin");
    const allowedOrigins = [
      "https://pixelmuseart.vercel.app",
      "https://www.pixelmuseart.vercel.app",
    ];
  
    const CORS_HEADERS = {
      "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Vary": "Origin",
    };
  
    try {
      await connectToDB();
  
      const posts = await Post.find({ category: "art-design" })
        .sort({ createdAt: -1 });
  
      return new NextResponse(JSON.stringify({ success: true, posts }), {
        status: 200,
        headers: CORS_HEADERS
      });
  
    } catch (err) {
      return new NextResponse(JSON.stringify({ error: "Server error" }), {
        status: 500,
        headers: CORS_HEADERS
      });
    }
}
  