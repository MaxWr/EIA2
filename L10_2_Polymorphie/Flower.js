"use strict";
var L10_2_BlumenwiesePolymorphie;
(function (L10_2_BlumenwiesePolymorphie) {
    class Flower extends L10_2_BlumenwiesePolymorphie.StaticObject {
        constructor(_position, _size, _color, _crc2, _horizon) {
            super(_crc2, _position);
            this.xyArray = [];
            this.size = _size;
            this.color = _color;
            this.horizon = _horizon;
        }
        draw() {
            let first;
            if (this.xyArray.length == 0)
                first = true;
            else
                first = false;
            let nParticles = 4;
            let radiusParticle = 2;
            let particle = new Path2D();
            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            if (this.position.y == 0) {
                this.position.y = Math.floor(Math.random() * 200) + 1;
                this.position.y += this.horizon + 20;
            }
            this.crc2.fillStyle = "green";
            this.crc2.fillRect(this.position.x, this.position.y, 3, 5);
            this.crc2.save();
            this.crc2.translate(this.position.x, this.position.y);
            this.crc2.fillStyle = this.color;
            for (let drawn = 0; drawn < nParticles; drawn++) {
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
    L10_2_BlumenwiesePolymorphie.Flower = Flower;
})(L10_2_BlumenwiesePolymorphie || (L10_2_BlumenwiesePolymorphie = {}));
//# sourceMappingURL=Flower.js.map