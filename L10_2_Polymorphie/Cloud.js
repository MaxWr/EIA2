"use strict";
var L10_2_BlumenwiesePolymorphie;
(function (L10_2_BlumenwiesePolymorphie) {
    class Cloud extends L10_2_BlumenwiesePolymorphie.MovingObject {
        constructor(_position, _size, _nParticles, _radiusParticle, _crc2) {
            super(_crc2, _position);
            this.xyArray = [];
            this.size = _size;
            this.nParticles = _nParticles;
            this.radiusParticle = _radiusParticle;
        }
        move() {
            this.position.x += 1;
            if (this.position.x > this.crc2.canvas.width + 100)
                this.position.x = -100;
            this.draw();
        }
        draw() {
            let first;
            if (this.xyArray.length == 0)
                first = true;
            else
                first = false;
            let particle = new Path2D();
            let gradient = this.crc2.createRadialGradient(0, 0, 0, 0, 0, this.radiusParticle);
            particle.arc(0, 0, this.radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
            this.crc2.save();
            this.crc2.translate(this.position.x, this.position.y);
            this.crc2.fillStyle = gradient;
            for (let drawn = 0; drawn < this.nParticles; drawn++) {
                this.crc2.save();
                let x;
                let y;
                if (first) {
                    x = (Math.random() - 0.5) * this.size.x;
                    y = -(Math.random() * this.size.y);
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
    L10_2_BlumenwiesePolymorphie.Cloud = Cloud;
})(L10_2_BlumenwiesePolymorphie || (L10_2_BlumenwiesePolymorphie = {}));
//# sourceMappingURL=Cloud.js.map