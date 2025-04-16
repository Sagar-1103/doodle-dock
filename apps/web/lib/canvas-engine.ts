import { ModeTypes } from "../types";

export class CanvasEngine {
    private canvas:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D;
    private roomId?:string;
    private socket?:WebSocket;
    private objects:{startX:number,startY:number,width:number,height:number}[] = []
    private selectedMode:ModeTypes = "view";
    private isPanning = false;
    private isDrawing = false;
    private scale = 1;
    private origin = { x: 0, y: 0 };
    private start = { x: 0, y: 0 };

    constructor(canvas:HTMLCanvasElement,roomId?:string,socket?:WebSocket){
        this.canvas = canvas;
        const canvasContext = canvas.getContext("2d");
        if(!canvasContext) throw new Error("No canvas context");
        this.ctx = canvasContext;
        this.socket = socket;
        this.roomId = roomId;
        this.getObjects();
    }

    private initCanvas = ()=>{
        this.ctx.fillStyle = "rgb(16, 16, 17)"
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    }

    private refreshCanvas = ()=>{
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.initCanvas();
        this.objects.map((object)=>{
            this.ctx.strokeStyle = "red";
            this.ctx.strokeRect(object.startX,object.startY,object.width,object.height);
        })
    }

    private getObjects = async()=>{

        this.draw();
    }

    private handleMouseDown = async(e:MouseEvent)=>{
        if(this.selectedMode==="grab"){
            this.isPanning=true;
            this.start = {x:e.clientX-this.origin.x,y:e.clientY-this.origin.y};
        }
        if(this.selectedMode==="rectangle"){
            this.isDrawing = true;
            this.start = {x:e.clientX,y:e.clientY};
        }
    }

    private handleMouseUp = async(e:MouseEvent)=>{
        if(this.isDrawing){
            if(this.selectedMode==="rectangle"){
                const width = e.clientX - this.start.x;
                const height = e.clientY - this.start.y;
                this.objects.push({startX:this.start.x,startY:this.start.y,width,height});
            this.refreshCanvas();
            }
        this.isDrawing = false;
        }
        this.isPanning = false;
    }

    private handleMouseMove = async(e:MouseEvent)=>{
        if(this.selectedMode==="grab" && this.isPanning){
            this.origin.x = e.clientX - this.start.x;
            this.origin.y = e.clientY - this.start.y;
            this.draw();
        }
        if(this.selectedMode==="rectangle"){
            if (this.isDrawing) {
                const width = e.clientX - this.start.x;
                const height = e.clientY - this.start.y;
                this.refreshCanvas();
                this.ctx.strokeStyle = "red";
                this.ctx.strokeRect(this.start.x,this.start.y,width,height);
            }
        }
    }

    public changeSelectedMode = async(mode:ModeTypes)=>{
        this.selectedMode = mode;
    }

    private handleZoom = (e: WheelEvent) => {
        e.preventDefault();
    
        const zoomIntensity = 0.1;
        const minScale = 0.2;
        const maxScale = 5;
    
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;
    
        const direction = e.deltaY < 0 ? 1 : -1;
        const factor = 1 + direction * zoomIntensity;
    
        const prevScale = this.scale;
        this.scale = Math.min(maxScale, Math.max(minScale, this.scale * factor));
    
        const scaleRatio = this.scale / prevScale;
        this.origin.x = mouseX - (mouseX - this.origin.x) * scaleRatio;
        this.origin.y = mouseY - (mouseY - this.origin.y) * scaleRatio;
    
        this.draw();
    };

    private draw() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.setTransform(this.scale, 0, 0, this.scale, this.origin.x, this.origin.y);
        this.refreshCanvas();
    }
    
    public bindEvents = () =>{
        this.canvas.addEventListener("mousedown",this.handleMouseDown);
        this.canvas.addEventListener("mousemove",this.handleMouseMove);
        this.canvas.addEventListener("mouseup",this.handleMouseUp);
        this.canvas.addEventListener("mouseleave", this.handleMouseUp);
        this.canvas.addEventListener("wheel",this.handleZoom);
    }

    public unbindEvents = () =>{
        this.canvas.removeEventListener("mousedown",this.handleMouseDown);
        this.canvas.removeEventListener("mousemove",this.handleMouseMove);
        this.canvas.removeEventListener("mouseup",this.handleMouseUp);
        this.canvas.removeEventListener("mouseleave", this.handleMouseUp);
        this.canvas.removeEventListener("wheel",this.handleZoom);
    }
}