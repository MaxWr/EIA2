"use strict";
window.onload = function main() {
    handleLoad();
};
let span;
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
    let event = new CustomEvent("CustomBubbleEvent", { bubbles: true });
    document.getElementById("button0")?.dispatchEvent(event);
}
function setInfoBox(_event) {
    let x = _event.clientX;
    let y = _event.clientY;
    span.innerText = "x: " + x.toString() + " y: " + y.toString() + " " + _event.target;
    span.style.top = (y + 10) + "px";
    span.style.left = (x + 10) + "px";
}
function logInfo(_event) {
    console.log(_event.type + ", " + _event.target + ", " + _event.currentTarget + ", " + _event);
}
//# sourceMappingURL=A02_EventInspector.js.map