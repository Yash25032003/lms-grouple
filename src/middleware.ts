import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isProtectedRoute = createRouteMatcher(["/group(.*)"])

export default clerkMiddleware(async (auth, req) => {
  const baseHost = "localhost:3000"
  const host = req.headers.get("host")
  const reqPath = req.nextUrl.pathname
  const origin = req.nextUrl.origin
  if (isProtectedRoute(req)) auth().protect()
  if (!baseHost.includes(host as string) && reqPath.includes("/group")) {
    const response = await fetch(`${origin}/api/domain?host=${host}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Check for successful response and parse JSON conditionally
    if (response.ok) {
      try {
        const data = await response.json()
        if (data && data.status === 200) {
          return NextResponse.rewrite(
            new URL(reqPath, `https://${data.domain}/${reqPath}`),
          )
        }
      } catch (error) {
        console.error("Error parsing JSON:", error)
        return NextResponse.next() // Handle gracefully if JSON parsing fails
      }
    } else {
      console.error("Fetch error:", response.status, await response.text())
      return NextResponse.next() // Handle gracefully if fetch fails
    }

    const data = await response.json()
    if (data.status === 200 && data) {
      return NextResponse.rewrite(
        new URL(reqPath, `https://${data.domain}/${reqPath}`),
      )
    }
  }
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
