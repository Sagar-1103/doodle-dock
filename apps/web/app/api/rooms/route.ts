import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth";
import { importJWK, JWTPayload, jwtVerify } from "jose";
import prismaClient from "../../../lib/db";

export async function POST(req:NextRequest){
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

    const {slug} = await req.json();

    if(!slug || typeof slug !=="string"){
        return NextResponse.json({ error: "Invalid input" },{ status: 400 });
    }

    let room;
    try {
        room = await prismaClient.room.create({
            data: {
                slug,
                adminId: userId,
                members:{
                    connect:{id:userId}
                }
            }
        })
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error: Failed to create room" },{ status: 500 });
    }
    return NextResponse.json({ room }, { status: 201 });
}


export async function GET(){
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
    let rooms;
    try {
        rooms = await prismaClient.room.findMany({
            where: {
              members: {
                some: {
                  id: userId,
                },
              },
            },
            select: {
              id: true,
              slug: true,
              adminId: true,
              members: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
          });
          
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error: Failed to fetch rooms" },{ status: 500 });
    }
    return NextResponse.json({rooms,userId},{status:200});
}