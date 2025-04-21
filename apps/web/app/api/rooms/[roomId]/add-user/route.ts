import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../../lib/auth";
import { importJWK, JWTPayload, jwtVerify } from "jose";
import prismaClient from "../../../../../lib/db";

export async function PATCH(req: NextRequest,{ params }: { params: Promise<{ roomId: string }> }) {
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

    const { email } = await req.json();
    const { roomId } = await params;

    if (!email || typeof email !== "string") {
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    
    const numericRoomId = Number(roomId);
    if (isNaN(numericRoomId)) {
        return NextResponse.json({ error: "Invalid room ID" }, { status: 400 });
    }

    try {
        const user = await prismaClient.user.findUnique({
          where: {
            email,
          },
        });
    
        if (!user) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
    
        const room = await prismaClient.room.update({
          where: { id: numericRoomId },
          data: {
            members: {
              connect: { id: user?.id },
            },
          },
        });
        
        return NextResponse.json({ room }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" },{ status: 500 });
    }
}