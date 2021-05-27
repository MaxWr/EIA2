"use strict";
var L09_2_Blumenwiese;
(function (L09_2_Blumenwiese) {
    class Cloud {
        constructor(_position, _crc2) {
            this.xyArray = [];
            this.position = _position;
            this.crc2 = _crc2;
        }
        draw(_size, _nParticles, _radiusParticle) {
            let first;
            if (this.xyArray.length == 0)
                first = true;
            else
                first = false;
            let particle = new Path2D();
            let gradient = this.crc2.createRadialGradient(0, 0, 0, 0, 0, _radiusParticle);
            particle.arc(0, 0, _radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
            this.crc2.save();
            this.crc2.translate(this.position.x, this.position.y);
            this.crc2.fillStyle = gradient;
            for (let drawn = 0; drawn < _nParticles; drawn++) {
                this.crc2.save();
                let x;
                let y;
                if (first) {
                    x = (Math.random() - 0.5) * _size.x;
                    y = -(Math.random() * _size.y);
                    this.xyArray.push({ x, y });
                }
                else {
                    x = this.xyArray[drawn].x;
                    y = this.xyArray[drawn].y;
                }
                this.crc2.translate(x, y);
                this.crc2.fill(particle);
                this.crc2.restore();
            }
            this.crc2.restore();
        }
    }
    L09_2_Blumenwiese.Cloud = Cloud;
})(L09_2_Blumenwiese || (L09_2_Blumenwiese = {}));
//# sourceMappingURL=Cloud.js.map