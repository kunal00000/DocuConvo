import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const projectId = searchParams.get('projectId')

    if (!projectId) {
      return NextResponse.json({ error: 'No projectId provided' })
    }

    const logs = await prisma.logMessage.findMany({
      where: {
        projectId: projectId!
      }
    })

    return NextResponse.json({ logs })
  } catch (error) {
    return NextResponse.json({ error })
  }
}
