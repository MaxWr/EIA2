"use strict";
var L11_1_BlumenwieseAdvanced;
(function (L11_1_BlumenwieseAdvanced) {
    class Tree extends L11_1_BlumenwieseAdvanced.StaticObject {
        constructor(_position, _size, _crc2, _horizon) {
            super(_crc2, _position);
            this.xyArray = [];
            this.size = _size;
            this.horizon = _horizon;
        }
        draw() {
            let first;
            if (this.xyArray.length == 0)
                first = true;
            else
                first = false;
            let nParticles = 15;
            let radiusParticle = 5;
            let particle = new Path2D();
            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            if (this.position.y == 0) {
                this.position.y = Math.floor(Math.random() * 20) + 1;
                this.position.y += this.horizon;
            }
            this.crc2.fillStyle = "brown";
            this.crc2.fillRect(this.position.x, this.position.y, 3, 11);
            this.crc2.save();
            this.crc2.translate(this.position.x, this.position.y);
            this.crc2.fillStyle = "RGB(0, 128, 0)";
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
    L11_1_BlumenwieseAdvanced.Tree = Tree;
})(L11_1_BlumenwieseAdvanced || (L11_1_BlumenwieseAdvanced = {}));
//# sourceMappingURL=Tree.js.map