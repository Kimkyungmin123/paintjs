const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const noteBtn = document.getElementById("jsNote");
const eraseBtn = document.getElementById("jsErase");


const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;



ctx.fillStyle = "white"; // 저장할 때 흰색 배경 갖게 됨. 없으면 투명배경으로 저장.
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;
let moding = false;


function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        ctx.beginPath(); // 경로 생성
        ctx.moveTo(x, y); // 선 시작 좌표

    } else {
        ctx.lineTo(x, y); // 선 끝 좌표
        ctx.stroke(); // 선 그리기

    }



}

function onMouseMoveEraser(event) {
    filling = false;
    handleRangeChange(event)
    ctx.strokeStyle = "white"; 
    

}

function handledColorClick(event) {
    const color = event.target.style.backgroundColor; // event.target : 이벤트가 발생한 요소를 반환
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}




function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerHTML = "Fill"
    } else {
        filling = true;
        mode.innerHTML = "Paint"
        ctx.fillStyle = ctx.strokeStyle;
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault(); // "contextmenu" + event.preventDefault(); -> 우클릭 방지
}


function handleSaveClick() {
    const image = canvas.toDataURL(); // default : png 
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS[🎨]";
    link.click();
}

function clearCanvasClick() {
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}



if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); // mousedown: 마우스 버튼을 눌렀을 때
    canvas.addEventListener("mouseup", stopPainting); // mouseup: 눌렀던 마우스 버튼을 떼었을 때
    canvas.addEventListener("mouseleave", stopPainting); // mouseleave: 안에서 바깥으로 옮겼을 때
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);



}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handledColorClick));


if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}
if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

if (noteBtn) {
    noteBtn.addEventListener("click", clearCanvasClick);
}

if (eraseBtn) {
    eraseBtn.addEventListener("click", onMouseMoveEraser);
}