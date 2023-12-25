import { NextResponse } from 'next/server'
import * as jwt from 'jsonwebtoken'

export async function POST(req: Request) {

	const { encryptedToken, query } = await req.json()

	const secret = process.env.TOKEN_SECRET

	const decryptedToken = jwt.verify(encryptedToken as string, secret as string)

	return NextResponse.json(decryptedToken)
}
