import { CanvasObject, ModeTypes, PaletteTypes, Rectangle } from "../types";

interface localCanvasObject {
    isSelected:boolean;
}

export class CanvasEngine {
    private canvas:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D;
    private roomId?:string;
    private socket?:WebSocket;
    private objects:(CanvasObject & localCanvasObject)[] = []
    private selectedMode:ModeTypes = "select";
    private isPanning = false;
    private isDrawing = false;
    private scale = 1;
    private origin = { x: 0, y: 0 };
    private start = { x: 0, y: 0 };
    public palette:PaletteTypes = {stroke:"#ffffff",bg:null,radii:70,lineDash:[0,0]};
    private selectedObjects:(CanvasObject & localCanvasObject)[] = [];
    private current = { x: 0, y: 0 };

    constructor(canvas:HTMLCanvasElement,roomId?:string,socket?:WebSocket){
        this.canvas = canvas;
        const canvasContext = canvas.getContext("2d");
        if(!canvasContext) throw new Error("No canvas context");
        this.ctx = canvasContext;
        this.socket = socket;
        this.roomId = roomId;
        this.palette = {stroke:"#ffffff",bg:null,radii:70,lineDash:[0,0]};
        this.getObjects();
    }

    private initCanvas = ()=>{
        this.ctx.fillStyle = "#101011"
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    }

    private refreshCanvas = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.initCanvas();
        this.objects.forEach((object) => {

            // Draw Existing Objects
            if(object.type==="rectangle"){
                this.drawRect(object);
            }

            // For all objects selected draw the selection box
            if (object.isSelected) {
                this.ctx.strokeStyle = "#60B5FF";
                this.ctx.lineWidth = 2 / this.scale;
                const x = object.startX + (object.width>0?-10:10);
                const y = object.startY - 10;
                const width =  object.width + (object.width>0?20:-20);
                const height = object.height + 20;
                this.ctx.setLineDash([0,0]);
                this.ctx.strokeRect(x,y,width,height);
            }
        });
        
        // While drawing on select draw the selecting box
        if (this.selectedMode === "select" && this.isDrawing) {
            const selectionRect: Rectangle = {
                type: "rectangle",
                startX: this.start.x,
                startY: this.start.y,
                width: this.current.x - this.start.x,
                height: this.current.y - this.start.y,
                stroke: "#60B5FF",
                bg: "#60B5FF33",
                strokeWidth: 1 / this.scale,
                radii:0,
                lineDash:[0,0]
            };
            this.drawRect(selectionRect);
        }

        //While drawing on rectangle draw the rectangle
        if (this.selectedMode === "rectangle" && this.isDrawing) {
            const selectionRect: Rectangle = {
                type: "rectangle",
                startX: this.start.x,
                startY: this.start.y,
                width: this.current.x - this.start.x,
                height: this.current.y - this.start.y,
                stroke: this.palette.stroke,
                bg: this.palette.bg,
                strokeWidth: 5 / this.scale,
                radii:this.palette.radii,
                lineDash:this.palette.lineDash
            };
            this.drawRect(selectionRect);
        }
    }

    private getObjects = async()=>{
        if(!this.roomId){
            // get all objects and set them as not selected
            const totalObjects = localStorage.getItem('objects');
            if (totalObjects) {
                const parsedObjects = JSON.parse(totalObjects);
                this.objects = parsedObjects.map((obj: CanvasObject) => ({
                    ...obj,
                    isSelected: false
                }));
            }
        }
        this.draw();
    }

    public clearCanvas = async()=>{
        if(!this.roomId){
            localStorage.removeItem('objects');
        }
        this.objects = [];
        this.selectedObjects = [];
        this.draw();
    }

    private handleMouseDown = async(e: MouseEvent) => {
        if (this.selectedMode === "grab") {
            this.isPanning = true;
            this.start = { x: e.clientX - this.origin.x, y: e.clientY - this.origin.y };
        } else {
            const rect = this.canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left - this.origin.x) / this.scale;
            const y = (e.clientY - rect.top - this.origin.y) / this.scale;
            this.start = { x, y };
            this.current = { x, y };
            
            if (this.selectedMode === "select") {
                    this.objects.forEach(obj => obj.isSelected = false);
                    this.selectedObjects = [];
                
                const clickedObject = this.findObjectAtPosition(x, y);
                if (clickedObject) {
                        clickedObject.isSelected = true;
                        if (!this.selectedObjects.includes(clickedObject)) {
                            this.selectedObjects.push(clickedObject);
                        }
                    this.draw();
                } else {
                    this.isDrawing = true;
                }
            } else {
                this.isDrawing = true;
            }
        }
    }

    private findObjectAtPosition(x: number, y: number): (CanvasObject & localCanvasObject) | null {
        for (let i = this.objects.length - 1; i >= 0; i--) {
            const obj = this.objects[i];
            if(!obj) return null;
            if (
                x >= obj.startX &&
                y >= obj.startY &&
                x <= obj.startX + obj.width &&
                y <= obj.startY + obj.height
            ) {
                return obj;
            }
        }
        return null;
    }

    private handleMouseUp = async(e: MouseEvent) => {
        if (this.isDrawing) {
            if (this.selectedMode === "select") {
                if (Math.abs(this.current.x - this.start.x) > 5 && Math.abs(this.current.y - this.start.y) > 5) {
                    const selectionRect = this.getNormalizedRect(
                        this.start.x, this.start.y, 
                        this.current.x - this.start.x, 
                        this.current.y - this.start.y
                    );
                    
                    this.objects.forEach(obj => {
                        const objRect = this.getNormalizedRect(
                            obj.startX, obj.startY, obj.width, obj.height
                        );
                        
                        if (this.isRectInside(objRect, selectionRect)) {
                            obj.isSelected = true;
                            if (!this.selectedObjects.includes(obj)) {
                                this.selectedObjects.push(obj);
                            }
                        }
                    });
                }
            } else if (this.selectedMode === "rectangle") {
                const rect = this.canvas.getBoundingClientRect();
                const x = (e.clientX - rect.left - this.origin.x) / this.scale;
                const y = (e.clientY - rect.top - this.origin.y) / this.scale;
                
                const width = x - this.start.x;
                const height = y - this.start.y;
                
                if (Math.abs(width) > 10 && Math.abs(height) > 10) {
                    const newRect:(CanvasObject & localCanvasObject) = {
                        type: "rectangle",
                        startX: this.start.x,
                        startY: this.start.y,
                        strokeWidth: 5 / this.scale,
                        width,
                        height,
                        stroke: this.palette.stroke,
                        bg: this.palette.bg,
                        isSelected: false,
                        radii:this.palette.radii,
                        lineDash:this.palette.lineDash
                    };
                    
                    this.objects.push(newRect);

                    if (this.socket) {
                        this.socket.send(JSON.stringify({
                            type: "chat",
                            roomId: this.roomId,
                            message: JSON.stringify({
                                type: "rectangle",
                                startX: this.start.x,
                                startY: this.start.y,
                                width,
                                height,
                                strokeWidth: 5 / this.scale,
                                stroke: this.palette.stroke,
                                bg: this.palette.bg,
                            })
                        }));
                    }
                    
                    if (!this.socket) {
                        localStorage.setItem('objects', JSON.stringify(this.objects));
                    }
                }
            }
            
            this.isDrawing = false;
            this.draw();
        }
        
        this.isPanning = false;
    }

    private getNormalizedRect(x: number, y: number, width: number, height: number) {
        return {
            x: width >= 0 ? x : x + width,
            y: height >= 0 ? y : y + height,
            width: Math.abs(width),
            height: Math.abs(height)
        };
    }

    private isRectInside(inner: {x: number, y: number, width: number, height: number},outer: {x: number, y: number, width: number, height: number}) {
        return (
            inner.x + inner.width >= outer.x &&
            inner.y + inner.height >= outer.y &&
            inner.x <= outer.x + outer.width &&
            inner.y <= outer.y + outer.height
        );
    }

    private handleMouseMove = async(e:MouseEvent)=>{
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left - this.origin.x) / this.scale;
        const y = (e.clientY - rect.top - this.origin.y) / this.scale;

        if(this.selectedMode==="grab" && this.isPanning){
            this.origin.x = e.clientX - this.start.x;
            this.origin.y = e.clientY - this.start.y;
            this.draw();
        } else if(this.isDrawing){
            this.current = { x, y };
            
            if (this.selectedMode === "select" || this.selectedMode === "rectangle") {
                this.draw();
            }
        }
    }

    public drawRect(rectangle:Rectangle){
        this.ctx.strokeStyle = rectangle.stroke;
        this.ctx.lineWidth = rectangle.strokeWidth;
        this.ctx.setLineDash(rectangle.lineDash);
        this.ctx.beginPath();
        this.ctx.roundRect(rectangle.startX,rectangle.startY,rectangle.width,rectangle.height,rectangle.radii);
        if(rectangle.bg){
            this.ctx.fillStyle = rectangle.bg;
            this.ctx.fill();
        }
        this.ctx.stroke();
    }

    public changeSelectedMode = async(mode:ModeTypes)=>{
        this.selectedMode = mode;
    }

    public changeSelectedPalette = async({stroke,bg,radii,lineDash}:PaletteTypes)=>{
        this.palette = {stroke,bg,radii,lineDash};
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

    public downloadCanvas(type: "png" | "jpeg" | "svg", fileName = "canvas-image"){
        if (type === "svg") {
            this.downloadCanvasSVG(fileName);
            return;
        }
        
        const mimeType = type === "jpeg" ? "image/jpeg" : "image/png";
        const dataURL = this.canvas.toDataURL(mimeType);
        const a = document.createElement("a");
        a.href = dataURL;
        a.download = `${fileName}.${type}`;
        a.click();
    }

    public downloadCanvasSVG(fileName = "canvas-drawing") {
        // Create an SVG element
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        // Set viewBox to match canvas dimensions while maintaining aspect ratio
        svg.setAttribute("viewBox", `0 0 ${this.canvas.width / this.scale} ${this.canvas.height / this.scale}`);
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        
        // Add background
        const background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        background.setAttribute("width", `${this.canvas.width / this.scale}`);
        background.setAttribute("height", `${this.canvas.height / this.scale}`);
        background.setAttribute("fill", "#101011");
        svg.appendChild(background);
        
        // Convert all objects to svg elements
        this.objects.forEach(obj => {
            if (obj.type === "rectangle") {
                const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                
                rect.setAttribute("x", obj.startX.toString());
                rect.setAttribute("y", obj.startY.toString());
                rect.setAttribute("width", obj.width.toString());
                rect.setAttribute("height", obj.height.toString());
                rect.setAttribute("stroke", obj.stroke || "none");
                rect.setAttribute("stroke-width", obj.strokeWidth.toString());
                rect.setAttribute("stroke-dasharray",obj.lineDash.toString());

                if(obj.radii){
                    rect.setAttribute("rx", obj.radii.toString());
                    rect.setAttribute("ry", obj.radii.toString());
                }

                if (obj.bg) {
                    rect.setAttribute("fill", obj.bg);
                } else {
                    rect.setAttribute("fill", "none");
                }
                
                svg.appendChild(rect);
            }
        });
        
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);
        const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        const svgUrl = URL.createObjectURL(svgBlob);
        
        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = `${fileName}.svg`;
        
        downloadLink.click();
        URL.revokeObjectURL(svgUrl);
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