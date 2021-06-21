"use strict";
var L11_1_BlumenwieseAdvanced;
(function (L11_1_BlumenwieseAdvanced) {
    class Mountain extends L11_1_BlumenwieseAdvanced.StaticObject {
        constructor(_crc2, _position, _min, _max, _colorLow, _colorHigh) {
            super(_crc2, _position);
            this.xyArray = [];
            this.min = _min;
            this.max = _max;
            this.colorLow = _colorLow;
            this.colorHigh = _colorHigh;
        }
        draw() {
            let first;
            if (this.xyArray.length == 0)
                first = true;
            else
                first = false;
            let stepMin = 50;
            let stepMax = 150;
            let x = 0;
            this.crc2.save();
            this.crc2.translate(this.position.x, this.position.y);
            this.crc2.beginPath();
            this.crc2.moveTo(0, 0);
            this.crc2.lineTo(0, -this.max);
            if (first) {
                for (let i = 0; i < this.crc2.canvas.width + 100; i += stepMin + Math.random() * (stepMax - stepMin)) {
                    x += stepMin + Math.random() * (stepMax - stepMin);
                    let y = -this.min - Math.random() * (this.max - this.min);
                    this.xyArray.push({ x, y });
                    this.crc2.lineTo(x, y);
                }
            }
            else {
                for (let i = 0; i < this.xyArray.length; i++) {
                    x = this.xyArray[i].x;
                    this.crc2.lineTo(this.xyArray[i].x, this.xyArray[i].y);
                }
            }
            this.crc2.lineTo(x, 0);
            this.crc2.closePath();
            let gradient = this.crc2.createLinearGradient(0, 0, 0, -this.max);
            gradient.addColorStop(0, this.colorLow);
            gradient.addColorStop(0.7, this.colorHigh);
            this.crc2.fillStyle = gradient;
            this.crc2.fill();
            this.crc2.restore();
        }
    }
    L11_1_BlumenwieseAdvanced.Mountain = Mountain;
})(L11_1_BlumenwieseAdvanced || (L11_1_BlumenwieseAdvanced = {}));
//# sourceMappingURL=Mountain.js.map