"use strict";
var L09_2_Blumenwiese;
(function (L09_2_Blumenwiese) {
    class Mountain {
        constructor(_crc2) {
            this.xyArray = [];
            this.crc2 = _crc2;
        }
        draw(_position, _min, _max, _colorLow, _colorHigh) {
            let first;
            if (this.xyArray.length == 0)
                first = true;
            else
                first = false;
            let stepMin = 50;
            let stepMax = 150;
            let x = 0;
            this.crc2.save();
            this.crc2.translate(_position.x, _position.y);
            this.crc2.beginPath();
            this.crc2.moveTo(0, 0);
            this.crc2.lineTo(0, -_max);
            if (first) {
                for (let i = 0; i < this.crc2.canvas.width + 100; i += stepMin + Math.random() * (stepMax - stepMin)) {
                    x += stepMin + Math.random() * (stepMax - stepMin);
                    let y = -_min - Math.random() * (_max - _min);
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
            let gradient = this.crc2.createLinearGradient(0, 0, 0, -_max);
            gradient.addColorStop(0, _colorLow);
            gradient.addColorStop(0.7, _colorHigh);
            this.crc2.fillStyle = gradient;
            this.crc2.fill();
            this.crc2.restore();
        }
    }
    L09_2_Blumenwiese.Mountain = Mountain;
})(L09_2_Blumenwiese || (L09_2_Blumenwiese = {}));
//# sourceMappingURL=Mountain.js.map