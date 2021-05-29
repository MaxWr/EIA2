"use strict";
var L09_2_Blumenwiese;
(function (L09_2_Blumenwiese) {
    window.addEventListener("load", handleLoad);
    let crc2;
    let golden = 0.62;
    let horizon;
    let trees = [];
    let treePositions = [];
    let flowers = [];
    let flowerPositions = [];
    let mountainGrey;
    let mountainWhite;
    let cloudSmall;
    let cloudBig;
    let bees = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        horizon = crc2.canvas.height * golden;
        drawBackground();
        drawSun({ x: 650, y: 125 });
        cloudBig = new L09_2_Blumenwiese.Cloud({ x: 175, y: 125 }, crc2);
        cloudBig.draw({ x: 250, y: 75 }, 40, 50);
        mountainWhite = new L09_2_Blumenwiese.Mountain(crc2);
        mountainWhite.draw({ x: 0., y: horizon }, 75, 275, "darkgrey", "white");
        mountainGrey = new L09_2_Blumenwiese.Mountain(crc2);
        mountainGrey.draw({ x: 0., y: horizon }, 50, 250, "darkgrey", "lightgrey");
        cloudSmall = new L09_2_Blumenwiese.Cloud({ x: 525, y: 150 }, crc2);
        cloudSmall.draw({ x: 125, y: 35 }, 20, 30);
        for (let r = 0; r < 45; r++) {
            trees.push(new L09_2_Blumenwiese.Tree({ x: 15, y: 20 }, crc2, horizon));
            let treePos = Math.floor(Math.random() * crc2.canvas.width) + 1;
            treePositions.push(treePos);
            trees[r].draw(treePos);
        }
        let flowerColors = ["orange", "red", "blue"];
        for (let r = 0; r < 150; r++) {
            let i = (Math.floor(Math.random() * 3) + 1) - 1;
            flowers.push(new L09_2_Blumenwiese.Flower({ x: 3, y: 3 }, flowerColors[i], crc2, horizon));
            let flowerPos = Math.floor(Math.random() * crc2.canvas.width) + 1;
            flowerPositions.push(flowerPos);
            flowers[r].draw(flowerPos);
        }
        for (let b = 0; b < 4; b++) {
            bees.push(new L09_2_Blumenwiese.Bee(crc2, { x: randomNumber(0, crc2.canvas.width), y: randomNumber(crc2.canvas.height / 2, crc2.canvas.height) }, randomNumber(0, 15), { x: randomNumber(-3, 4), y: randomNumber(-1, 2) }));
            bees[b].drawRight();
        }
        window.setInterval(update, 20);
    }
    function update() {
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        drawBackground();
        drawSun({ x: 650, y: 125 });
        cloudBig.position.x += 1;
        if (cloudBig.position.x > crc2.canvas.width + 100)
            cloudBig.position.x = -100;
        cloudBig.draw({ x: 250, y: 75 }, 40, 50);
        mountainWhite.draw({ x: 0., y: horizon }, 75, 275, "darkgrey", "white");
        mountainGrey.draw({ x: 0., y: horizon }, 50, 250, "darkgrey", "lightgrey");
        cloudSmall.position.x += 1;
        if (cloudSmall.position.x > crc2.canvas.width + 100)
            cloudSmall.position.x = -100;
        cloudSmall.draw({ x: 125, y: 35 }, 20, 30);
        for (let i = 0; i < trees.length; i++) {
            trees[i].draw(treePositions[i]);
        }
        for (let j = 0; j < flowers.length; j++) {
            flowers[j].draw(flowerPositions[j]);
        }
        for (let c = 0; c < bees.length; c++) {
            if (bees[c].flightDuration > 16) {
                bees[c].flightDuration = 0;
                bees[c].direction = { x: randomNumber(-3, 4), y: randomNumber(-1, 2) };
            }
            bees[c].position.x += bees[c].direction.x;
            bees[c].position.y += bees[c].direction.y;
            if (bees[c].direction.x <= 0)
                bees[c].drawLeft();
            else
                bees[c].drawRight();
            if (bees[c].position.x > crc2.canvas.width)
                bees[c].position.x = 2;
            else if (bees[c].position.x < 0)
                bees[c].position.x = crc2.canvas.width - 2;
            if (bees[c].position.y > crc2.canvas.height)
                bees[c].position.y = 2;
            else if (bees[c].position.y < 0)
                bees[c].position.y = crc2.canvas.height - 2;
        }
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
    function drawSun(_position) {
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
})(L09_2_Blumenwiese || (L09_2_Blumenwiese = {}));
//# sourceMappingURL=Blumenwiese2.js.map