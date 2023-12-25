import { NextResponse } from "next/server"
import * as jwt from 'jsonwebtoken'

export async function POST(req: Request) {
	const { projectId } = await req.json()
	const secret = process.env.TOKEN_SECRET

	const token = jwt.sign(projectId as string, secret as string)

	return NextResponse.json(token)

}
