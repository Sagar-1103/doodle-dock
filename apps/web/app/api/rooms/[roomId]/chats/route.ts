import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { NextResponse } from "next/server";
import { importJWK, JWTPayload, jwtVerify } from "jose";
import prisma from "@repo/db/client";

export async function GET(req: Request,{ params }: { params: Promise<{ roomId: string }> }){
    const session = await getServerSession(authOptions);
    if (!session?.jwtToken) {
        return NextResponse.json({ error: "Unauthorized: Missing custom token" },{ status: 401 });
    }
    let userId;
    try {
        const secret = process.env.JWT_SECRET || '';
        const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });
        const { payload } = await jwtVerify(session.jwtToken, jwk);
        userId = (payload as JWTPayload).id as string;
    } catch (error) {
        return NextResponse.json({ error: "Unauthorized: Invalid token" },{ status: 401 });
    }

    const { roomId } = await params;
    const numericRoomId = Number(roomId);
    if (isNaN(numericRoomId)) {
        return NextResponse.json({ error: "Invalid room ID" }, { status: 400 });
    }

    try {
        const chats = await prisma.chat.findMany({
            where:{
                roomId:numericRoomId
            },
            orderBy:{
                id:"desc"
            },
            take:50
        })
        return NextResponse.json({ chats }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" },{ status: 500 });
    }
}

export async function DELETE(req: Request,{ params }: { params: Promise<{ roomId: string }> }){
    const session = await getServerSession(authOptions);
    if (!session?.jwtToken) {
        return NextResponse.json({ error: "Unauthorized: Missing custom token" },{ status: 401 });
    }
    let userId;
    try {
        const secret = process.env.JWT_SECRET || '';
        const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });
        const { payload } = await jwtVerify(session.jwtToken, jwk);
        userId = (payload as JWTPayload).id as string;
    } catch (error) {
        return NextResponse.json({ error: "Unauthorized: Invalid token" },{ status: 401 });
    }

    const { roomId } = await params;
    const numericRoomId = Number(roomId);
    if (isNaN(numericRoomId)) {
        return NextResponse.json({ error: "Invalid room ID" }, { status: 400 });
    }

    try {
        // const chats = await prisma.chat.findMany({
        //     where:{
        //         roomId:numericRoomId
        //     },
        //     orderBy:{
        //         id:"desc"
        //     },
        //     take:50
        // })
        await prisma.chat.deleteMany({
            where:{
                roomId:numericRoomId
            }
        })
        return NextResponse.json({ }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" },{ status: 500 });
    }
}