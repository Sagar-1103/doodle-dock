import { ModeTypes } from "../types";

export class CanvasEngine {
    private canvas:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D;
    private roomId?:string;
    private socket?:WebSocket;
    private objects:{startX:number,startY:number,width:number,height:number,stroke:string,strokeWidth:number,bg:string|null}[] = []
    private selectedMode:ModeTypes = "view";
    private isPanning = false;
    private isDrawing = false;
    private scale = 1;
    private origin = { x: 0, y: 0 };
    private start = { x: 0, y: 0 };
    public palette:{stroke:string,bg:string|null} = {stroke:"#ffffff",bg:null}

    constructor(canvas:HTMLCanvasElement,roomId?:string,socket?:WebSocket){
        this.canvas = canvas;
        const canvasContext = canvas.getContext("2d");
        if(!canvasContext) throw new Error("No canvas context");
        this.ctx = canvasContext;
        this.socket = socket;
        this.roomId = roomId;
        this.palette = {stroke:"#ffffff",bg:null};
        this.getObjects();
    }

    private initCanvas = ()=>{
        this.ctx.fillStyle = "#101011"
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    }

    private refreshCanvas = ()=>{
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.initCanvas();
        this.objects.map((object)=>{
            this.ctx.strokeStyle = object.stroke;
            this.ctx.lineWidth = object.strokeWidth;
            this.ctx.strokeRect(object.startX,object.startY,object.width,object.height);
            if(object.bg){
                // this.ctx.fillStyle = object.bg;
                // this.ctx.fillRect(object.startX,object.startY,object.width,object.height);
            }
        })
    }

    private getObjects = async()=>{
        if(!this.roomId){
            const totalObjects = localStorage.getItem('objects');
            if (totalObjects) {
                this.objects = JSON.parse(totalObjects)   
            }
        }
        this.draw();
    }

    public clearCanvas = async()=>{
        if(!this.roomId){
            localStorage.removeItem('objects');
        }
        this.draw();
    }

    private handleMouseDown = async(e:MouseEvent)=>{
        if(this.selectedMode==="grab"){
            this.isPanning=true;
            this.start = {x:e.clientX-this.origin.x,y:e.clientY-this.origin.y};
        }
        if(this.selectedMode==="rectangle"){
            this.isDrawing = true;
            const rect = this.canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left - this.origin.x) / this.scale;
            const y = (e.clientY - rect.top - this.origin.y) / this.scale;
            this.start = { x, y };
        }
    }

    private handleMouseUp = async(e:MouseEvent)=>{
        if(this.isDrawing){
            if(this.selectedMode==="rectangle"){
                const rect = this.canvas.getBoundingClientRect();
                // Convert screen coordinates to world coordinates
                const x = (e.clientX - rect.left - this.origin.x) / this.scale;
                const y = (e.clientY - rect.top - this.origin.y) / this.scale;
                
                const width = x - this.start.x;
                const height = y - this.start.y;
                
                this.objects.push({
                    startX: this.start.x,
                    startY: this.start.y,
                    strokeWidth: 5 / this.scale,
                    width,
                    height,
                    stroke:this.palette.stroke,
                    bg:this.palette.bg,
                });

                if (this.socket) {
                    this.socket.send(JSON.stringify({type:"chat",roomId:this.roomId,message:JSON.stringify({
                        startX: this.start.x,
                        startY: this.start.y,
                        width,
                        height,
                        strokeWidth: 5 / this.scale,
                        stroke:this.palette.stroke,
                        bg:this.palette.bg,
                    })}));
                }
                if(!this.socket){
                    const totalObjects = [...this.objects,{
                        startX: this.start.x,
                        startY: this.start.y,
                        width,
                        height,
                        strokeWidth: 5 / this.scale,
                        stroke:this.palette.stroke,
                        bg:this.palette.bg,
                    }];
                    localStorage.setItem('objects',JSON.stringify(totalObjects));
                }
                    this.draw();
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
                const rect = this.canvas.getBoundingClientRect();
                // Convert screen coordinates to world coordinates
                const x = (e.clientX - rect.left - this.origin.x) / this.scale;
                const y = (e.clientY - rect.top - this.origin.y) / this.scale;
                
                const width = x - this.start.x;
                const height = y - this.start.y;
                
                this.draw();
                this.ctx.strokeStyle = this.palette.stroke;
                this.ctx.lineWidth = 5 / this.scale;
                this.ctx.strokeRect(this.start.x, this.start.y, width, height);
                if(this.palette.bg){
                    // this.ctx.fillStyle = this.palette.bg;
                    // this.ctx.fillRect(this.start.x, this.start.y, width, height);
                }
            }
        }
    }

    public changeSelectedMode = async(mode:ModeTypes)=>{
        this.selectedMode = mode;
    }

    public changeSelectedPalette = async({stroke,bg}:{stroke:string,bg:string|null})=>{
        this.palette = {stroke,bg};
    }

    private handleZoom = (e: WheelEvent) => {
        e.preventDefault();

        const zoomIntensity = 0.1;
        const minScale = 0.1;
        const maxScale = 5;
    
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
    
        // Convert mouse position to world space before zoom
        const worldX = (mouseX - this.origin.x) / this.scale;
        const worldY = (mouseY - this.origin.y) / this.scale;
    
        const direction = e.deltaY < 0 ? 1 : -1;
        const factor = 1 + direction * zoomIntensity;
    
        const newScale = Math.min(maxScale, Math.max(minScale, this.scale * factor));
        
        // Only update if we're not at scale limits
        if (newScale !== this.scale) {
          this.scale = newScale;
          
          // Adjust origin to zoom toward mouse position
          this.origin.x = mouseX - worldX * this.scale;
          this.origin.y = mouseY - worldY * this.scale;
          
          this.draw();
          
        }
    };

    private draw() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.setTransform(this.scale, 0, 0, this.scale, this.origin.x, this.origin.y);
        this.refreshCanvas();
    }

    public getSocketMessage = (received:{type:string,roomId?:string,message:string})=>{
        if (received.type==="chat") {
            this.objects.push(JSON.parse(received.message));
            this.draw();
        }
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

    // Set canvas size with proper pixel ratio
    public resizeCanvas(width: number, height: number) {
        const pixelRatio = window.devicePixelRatio || 1;
        this.canvas.width = width * pixelRatio;
        this.canvas.height = height * pixelRatio;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        this.draw();
    }

}