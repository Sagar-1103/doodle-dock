import { NextMiddleware, NextResponse } from "next/server";

export default function middleware(request:NextMiddleware){

    return NextResponse.next();
}