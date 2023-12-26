import { Resend } from 'resend'
import * as React from 'react'
import DocuConvoWelcomeEmail from '@/emails/welcome-email'
import { prisma } from '@docuconvo/database'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request, res: NextResponse) {
  const bodyData = await req.json()
  const isUserExist = await prisma.userwaitlist.findFirst({
    where: {
      email: bodyData.email as string
    }
  })

  if (isUserExist) {
    return NextResponse.json({
      res: 'You are already in Wailist'
    })
  }

  await prisma.userwaitlist.create({
    data: {
      email: bodyData.email,
      username: bodyData.username
    }
  })

  try {
    const data = await resend.emails.send({
      from: 'DocuConvo <onboarding@resend.dev>',
      to: [bodyData.email],
      subject: 'Onboarding Mail From DocuConvo',
      react: DocuConvoWelcomeEmail({
        userFirstname: bodyData.username
      }) as React.ReactElement
    })
    return Response.json(data)
  } catch (error) {
    return Response.json({ error })
  }
}
