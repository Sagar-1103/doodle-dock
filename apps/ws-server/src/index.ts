import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port:3001});

wss.on("connection",function connection(ws){

    ws.on("message", async function message(data){
        console.log("Data : ",data.toString());
    })

})