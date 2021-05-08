"use strict";
window.onload = function main() {
    let canvas = document.querySelector("canvas");
    let crc2 = canvas.getContext("2d");
    let grd = crc2.createLinearGradient(randomNumber(500), randomNumber(500), randomNumber(1000), randomNumber(1250));
    grd.addColorStop(0, randomColor());
    grd.addColorStop(1, randomColor());
    crc2.fillStyle = grd;
    crc2.fillRect(0, 0, canvas.width, canvas.height);
    let pattern = document.createElement('canvas').getContext('2d');
    pattern.canvas.width = randomNumber(250);
    pattern.canvas.height = randomNumber(250);
    pattern.fillStyle = "RGBA(0, 0, 0, 0)";
    pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
    for (let a = 0; a < 2; a++) {
        pattern.strokeStyle = randomColor();
        pattern.moveTo(0, 10);
        for (let c = 0; c < randomNumber(10); c++)
            pattern.lineTo(randomNumber(pattern.canvas.width), randomNumber(pattern.canvas.height));
        pattern.stroke();
    }
    crc2.fillStyle = crc2.createPattern(pattern.canvas, 'repeat');
    crc2.fillRect(0, 0, canvas.width, canvas.height);
    for (let b = 0; b < randomNumber(500, 20); b++) {
        let d = randomNumber(3);
        crc2.beginPath();
        if (d == 1)
            crc2.arc(randomNumber(950), randomNumber(1200), randomNumber(50), randomNumber(365), randomKreis(2) * Math.PI);
        else if (d == 2) {
            let e = randomNumber(950);
            let f = randomNumber(1200);
            crc2.moveTo(e, f);
            crc2.lineTo(e + randomNumber(50, 10), f + randomNumber(50, 10));
            crc2.lineTo(e + randomNumber(30, 10), f + randomNumber(50, 10));
            crc2.lineTo(e + 0, f + 0);
        }
        else {
            let e = randomNumber(950);
            let f = randomNumber(1200);
            crc2.moveTo(e, f);
            crc2.lineTo(e + randomNumber(200, 10), f + randomNumber(200, 10));
            crc2.lineTo(e + randomNumber(150, 10), f + randomNumber(200, 10));
            crc2.lineTo(e + randomNumber(150, 10), f + randomNumber(200, 10));
            crc2.lineTo(e + 0, f + 0);
        }
        crc2.lineWidth = randomNumber(14);
        if (randomNumber(2) == 2)
            crc2.lineCap = "butt";
        else
            crc2.lineCap = "round";
        crc2.strokeStyle = randomColor();
        crc2.stroke();
    }
};
function randomNumber(max, min) {
    if (min == null)
        min = 1;
    return Math.floor(Math.random() * max) + min;
}
function randomKreis(max) {
    return (Math.random() * max) + 0.1;
}
function randomColor() {
    return "RGB(" + randomNumber(255).toString() + ", " + randomNumber(255).toString() + ", " + randomNumber(255).toString() + ")";
}
//# sourceMappingURL=Canvas.js.map