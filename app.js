const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const colorPicker = document.getElementById("jsColorPicker");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// for paint bucket
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
const col = {r: 0xff, g: 0xff, b: 0x0, a: 0xff}

// before setting ctx.fillStyle, 기본 배경색 입히기
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function colorChange(color){
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if(!filling){
        if(!painting){
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
}

function onMouseUp(){
    stopPainting(); // painting logic을 한 곳에 모아두기 위해서
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    colorChange(color);
}

function handleRangeChange(event){
    const size = event.target.value; 
    ctx.lineWidth = size;
}

function handleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(event){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // const rect = canvas.getBoundingClientRect()
        // const x = Math.round(event.clientX - rect.left)
        // const y = Math.round(event.clientY - rect.top)
        // floodFill(imageData, col, x, y)
        // ctx.putImageData(imageData, 0, 0)
    }
}
    
function handleCM(event){
    event.preventDefault();
}

function saveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "download_paintJS";
    link.click();
}

function handleColorPick(e){
    const color = e.target.value;
    colorChange(color);
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);

    // 캔버스 마우스 우클릭 메뉴 방지
    canvas.addEventListener("contextmenu", handleCM);
}

colorPicker.addEventListener("change", handleColorPick);

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", saveClick);
}