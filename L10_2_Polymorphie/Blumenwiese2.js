"use strict";
var L10_2_BlumenwiesePolymorphie;
(function (L10_2_BlumenwiesePolymorphie) {
    window.addEventListener("load", handleLoad);
    let crc2;
    let golden = 0.62;
    let horizon;
    let sun;
    let mountainGrey;
    let mountainWhite;
    let cloudSmall;
    let cloudBig;
    let staticObjects = [];
    let movingObjects = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        horizon = crc2.canvas.height * golden;
        sun = new L10_2_BlumenwiesePolymorphie.Sun(crc2, { x: 650, y: 125 });
        staticObjects.push(sun);
        mountainWhite = new L10_2_BlumenwiesePolymorphie.Mountain(crc2, { x: 0., y: horizon }, 75, 275, "darkgrey", "white");
        staticObjects.push(mountainWhite);
        mountainGrey = new L10_2_BlumenwiesePolymorphie.Mountain(crc2, { x: 0., y: horizon }, 50, 250, "darkgrey", "lightgrey");
        staticObjects.push(mountainGrey);
        cloudBig = new L10_2_BlumenwiesePolymorphie.Cloud({ x: 175, y: 125 }, { x: 250, y: 75 }, 40, 50, crc2);
        movingObjects.push(cloudBig);
        cloudSmall = new L10_2_BlumenwiesePolymorphie.Cloud({ x: 525, y: 150 }, { x: 125, y: 35 }, 20, 30, crc2);
        movingObjects.push(cloudSmall);
        for (let r = 0; r < 45; r++)
            staticObjects.push(new L10_2_BlumenwiesePolymorphie.Tree({ x: Math.floor(Math.random() * crc2.canvas.width) + 1, y: 0 }, { x: 15, y: 20 }, crc2, horizon));
        let flowerColors = ["orange", "red", "blue"];
        for (let r = 0; r < 150; r++) {
            let i = (Math.floor(Math.random() * 3) + 1) - 1;
            staticObjects.push(new L10_2_BlumenwiesePolymorphie.Flower({ x: Math.floor(Math.random() * crc2.canvas.width) + 1, y: 0 }, { x: 3, y: 3 }, flowerColors[i], crc2, horizon));
        }
        for (let b = 0; b < 4; b++)
            movingObjects.push(new L10_2_BlumenwiesePolymorphie.Bee(crc2, { x: randomNumber(0, crc2.canvas.width), y: randomNumber(crc2.canvas.height / 2, crc2.canvas.height) }, randomNumber(0, 15), { x: randomNumber(-3, 4), y: randomNumber(-1, 2) }));
        window.setInterval(update, 20);
    }
    function update() {
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        drawBackground();
        sun.draw();
        mountainWhite.draw();
        mountainGrey.draw();
        for (let i = 0; i < staticObjects.length; i++)
            staticObjects[i].draw();
        for (let j = 0; j < movingObjects.length; j++)
            movingObjects[j].move();
    }
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function drawBackground() {
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "HSL(215, 100%, 38%)");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(100, 80%, 30%)");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
})(L10_2_BlumenwiesePolymorphie || (L10_2_BlumenwiesePolymorphie = {}));
//# sourceMappingURL=Blumenwiese2.js.map