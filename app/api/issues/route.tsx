import { NextRequest, NextResponse } from "next/server";
import issuesSchema from "../../validationSchema";
import prisma from "@/prisma/client";


export async function POST (request: NextRequest) {
    const body =  await request.json()
    const validation =  issuesSchema.safeParse(body) // So what if I send anther entity with the required items does it go/?

    if(!validation.success) 
        return NextResponse.json(validation.error.errors ,{status: 400})

    const newIssue = await prisma.issue.create({
        data: {title: body.title, description: body.description}
    })

    return NextResponse.json(newIssue, {status: 201})
}