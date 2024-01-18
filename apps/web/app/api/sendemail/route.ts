import * as React from 'react'

import { NextResponse } from 'next/server'

import { Resend } from 'resend'

import DocuConvoWelcomeEmail from '@/emails/welcome-email'
import { prisma } from '@/lib/db'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
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
      from: 'DocuConvo <team@docuconvo.com>',
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
