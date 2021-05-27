"use strict";
var L08_Canvas_Alley;
(function (L08_Canvas_Alley) {
    window.addEventListener("load", handleLoad);
    let crc2;
    let golden = 0.62;
    let horizon;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        horizon = crc2.canvas.height * golden;
        drawBackground();
        drawSun({ x: 650, y: 125 });
        drawMountains({ x: 0., y: horizon }, 75, 275, "darkgrey", "white");
        drawMountains({ x: 0., y: horizon }, 50, 250, "darkgrey", "lightgrey");
        for (let r = 0; r < 45; r++) {
            drawTrees(Math.floor(Math.random() * crc2.canvas.width) + 1, { x: 15, y: 20 });
        }
        let flowerColors = ["orange", "red", "blue"];
        for (let r = 0; r < 150; r++) {
            let i = (Math.floor(Math.random() * 3) + 1) - 1;
            drawFlowers(Math.floor(Math.random() * crc2.canvas.width) + 1, { x: 3, y: 3 }, flowerColors[i]);
        }
        crc2.save();
        drawCloudBig({ x: 175, y: 125 }, { x: 250, y: 75 });
        drawCloudSmall({ x: 525, y: 150 }, { x: 125, y: 35 });
        crc2.restore();
        window.setInterval(update, 20);
    }
    function update() {
    }
    function drawBackground() {
        console.log("Background");
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "HSL(215, 100%, 38%)");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(100, 80%, 30%)");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function drawSun(_position) {
        console.log("Sun", _position);
        let r1 = 125;
        let r2 = 200;
        let gradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 75%, 1)");
        gradient.addColorStop(1, "HSLA(35, 100%, 60%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }
    function drawCloudBig(_position, _size) {
        console.log("Cloud", _position, _size);
        let nParticles = 40;
        let radiusParticle = 50;
        let particle = new Path2D();
        let gradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
    function drawCloudSmall(_position, _size) {
        console.log("Cloud", _position, _size);
        let nParticles = 20;
        let radiusParticle = 30;
        let particle = new Path2D();
        let gradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        console.log("Mountains", _min, _max);
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);
        crc2.lineTo(x, 0);
        crc2.closePath();
        let gradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }
    function drawTrees(_positionX, _size) {
        console.log("Trees", _positionX, _size);
        let nParticles = 15;
        let radiusParticle = 5;
        let particle = new Path2D();
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        let y = Math.floor(Math.random() * 20) + 1;
        y += horizon;
        crc2.fillStyle = "brown";
        crc2.fillRect(_positionX, y, 3, 11);
        crc2.save();
        crc2.translate(_positionX, y);
        // console.log(y);
        crc2.fillStyle = "RGB(0, 128, 0)";
        for (let drawn = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
    function drawFlowers(_positionX, _size, _color) {
        console.log("Flowers", _positionX, _size, _color);
        let nParticles = 4;
        let radiusParticle = 2;
        let particle = new Path2D();
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        let y = Math.floor(Math.random() * 200) + 1;
        y += horizon + 20;
        crc2.fillStyle = "green";
        crc2.fillRect(_positionX, y, 3, 5);
        crc2.save();
        crc2.translate(_positionX, y);
        // console.log(y);
        crc2.fillStyle = _color;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
})(L08_Canvas_Alley || (L08_Canvas_Alley = {}));
//# sourceMappingURL=Blumenwiese2.js.map