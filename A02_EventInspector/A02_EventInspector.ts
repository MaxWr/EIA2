window.onload = function main() {
    handleLoad();
}

let span: HTMLSpanElement;

function handleLoad() {
    document.addEventListener("mousemove", setInfoBox);

    document.body.addEventListener("click", logInfo);
    document.getElementById("div0")?.addEventListener("click", logInfo);
    document.getElementById("div1")?.addEventListener("click", logInfo);

    document.body.addEventListener("keyup", logInfo);
    document.getElementById("div0")?.addEventListener("keyup", logInfo);
    document.getElementById("div1")?.addEventListener("keyup", logInfo);

    span = document.createElement("span");
    document.body.appendChild(span);
    document.getElementById("button0")?.addEventListener("click", buttonClick);
    document.addEventListener("CustomBubbleEvent", logInfo);
}

function buttonClick() {
    let event: CustomEvent = new CustomEvent("CustomBubbleEvent", {bubbles: true});
    document.getElementById("button0")?.dispatchEvent(event);
}

function setInfoBox(_event: MouseEvent) {
    let x: number = _event.clientX;
    let y: number = _event.clientY;

    span.innerText= "x: " + x.toString() + " y: " + y.toString() + " " + _event.target;

    span.style.top= (y +  10) + "px";
    span.style.left= (x + 10) + "px";
}

function logInfo(_event: Event){
    console.log(_event.type + ", " + _event.target + ", " + _event.currentTarget + ", " + _event);
}