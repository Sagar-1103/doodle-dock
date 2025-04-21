import { WebSocketServer,WebSocket } from "ws";
import dotenv from "dotenv";
import { importJWK, JWTPayload, jwtVerify } from "jose";
import prisma from "@repo/db/client";
dotenv.config();

const wss = new WebSocketServer({port:3001});

interface User {
    ws:WebSocket;
    roomIds:number[]
    userId:string;
}

interface Data {
    type:"join_room"|"leave_room"|"chat";
    roomId:number;
    message?:string;
}

const users:User[] = []

const getUserId = async(token:string):Promise<string|null>=>{
try {
    const secret = process.env.JWT_SECRET || '';
    const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });
    const { payload:decoded } = await jwtVerify(token, jwk);
    
    if (!decoded || !(decoded as JWTPayload).id) {
        return null;
    }
    
    return (decoded as JWTPayload).id as string;
} catch (error) {
    console.log(error);
    return null;
}
}

wss.on("connection", async function connection(ws,request){
    const url = request.url;
    if(!url){
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";
    const userId = await getUserId(token);
    if(!userId){
        ws.close();
        return;
    }

    users.push({
        userId,
        ws,
        roomIds:[]
    });
    
    ws.on("message",async function message(data){
        const parsedData:Data = JSON.parse(data.toString());

        if(parsedData.type==="join_room"){
            const user = users.find(u=>u.ws===ws);
            if(!user) return;
            user.roomIds.push(parsedData.roomId);
        }
        if(parsedData.type==="leave_room"){
            const user = users.find(u=>u.ws===ws);
            if(!user) return;
            user.roomIds = user.roomIds.filter(roomId=>roomId!==parsedData.roomId);
        }
        if(parsedData.type==="chat"){
            const roomId = parsedData.roomId;
            const message = parsedData.message || "";
            console.log({
                roomId,
                message,
                userId
            });
            
            await prisma.chat.create({
                data:{
                    roomId:Number(roomId),
                    message,
                    userId
                }
            })

            users.forEach((user:any)=>{
                if(user.roomIds.includes(roomId)){
                    const data:Data = {type:"chat",roomId,message}
                    user.ws.send(JSON.stringify(data))
                }
            })
        }
    })
})