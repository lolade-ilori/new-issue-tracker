import issuesSchema from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH (request: NextRequest, {params: {id}} : {params: {id: string}}) {
    const body = await request.json()
    const validation = issuesSchema.safeParse(body)

    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(!issue)
        return NextResponse.json("Issue not valid", {status: 404})

    const updatedIssue = await prisma.issue.update({
        where:{
            id: issue.id
        },
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(updatedIssue)
}


export async function DELETE(request: NextRequest, {params: {id}} : {params: {id: string}}) {
    // Fetch issue from db
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    })
    // If not found, return 404
    if (!issue)
        return NextResponse.json({error: 'Issue not found'}, {status: 404})
    // Delete the user
    await prisma.issue.delete({
        where: {id: issue.id}
    })
    // Return 200
    return NextResponse.json({})
}