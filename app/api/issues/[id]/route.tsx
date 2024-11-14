import authOptions from "@/app/auth/authOptions";
import  { patchIssuesSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH (request: NextRequest, {params: {id}} : {params: {id: string}}) {
    const session = await getServerSession(authOptions)

    if (!session) 
        return NextResponse.json({}, {status: 401})

    const body = await request.json()
    const validation = patchIssuesSchema.safeParse(body)

    const {assignedUserId, title, description} = body

    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    // validate user id
    if (assignedUserId) {
        const user = await prisma.user.findUnique({
            where: {
                id: assignedUserId
            }
        })

        if (!user) 
            return NextResponse.json({error: "User not valid"}, {status:400})
    }

    // validate issue id
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(!issue)
        return NextResponse.json({error:"Issue not valid"}, {status: 404})

    // update issue sections
    const updatedIssue = await prisma.issue.update({
        where:{
            id: issue.id
        },
        data: {
            title,
            description,
            assignedUserId
        }
    })

    return NextResponse.json(updatedIssue)
}


export async function DELETE(request: NextRequest, {params: {id}} : {params: {id: string}}) {
    const session = await getServerSession(authOptions)
    if (!session) 
        return NextResponse.json({}, {status: 401})
    
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