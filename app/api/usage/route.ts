import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      include: {
        humanizations: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Calculate stats for free model
    const totalHumanizations = user.humanizations.length
    const wordsProcessed = user.humanizations.reduce((total, h) => total + h.wordCount, 0)

    return NextResponse.json({
      totalHumanizations,
      wordsProcessed,
      recentHumanizations: user.humanizations.slice(0, 5).map(h => ({
        id: h.id,
        wordCount: h.wordCount,
        style: h.style,
        createdAt: h.createdAt.toISOString()
      }))
    })

  } catch (error) {
    console.error("Usage stats error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
