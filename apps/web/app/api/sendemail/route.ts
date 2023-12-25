import { Resend } from 'resend';
import * as React from 'react'
import DocuConvoWelcomeEmail from '@/emails/welcome-email';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request, res: NextResponse) {
	const bodyData = await req.json()


	const isUserExist = await prisma.userwaitlist.findFirst({
		where: {
			email: bodyData.email as string
		}
	})

	if (isUserExist) {
		return NextResponse.json({
			res: 'You are already in Wailist! Thanks for Supporting DocuConvo'
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
			from: 'DocuConvo <wassup@adityadafe.rocks>',
			to: [bodyData.email],
			subject: 'Onboarding Mail From DocuConvo',
			react: DocuConvoWelcomeEmail({ userFirstname: bodyData.username }) as React.ReactElement
		});
		return Response.json({ res: 'Yay you are now part of DocuConvo Waitlist' });
	} catch (error) {
		return Response.json({ res: 'Something Went Wrong Can You Try Again?' });
	}
}

