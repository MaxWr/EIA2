"use strict";
var L09_2_Blumenwiese;
(function (L09_2_Blumenwiese) {
    class Tree {
        constructor(_size, _crc2, _horizon) {
            this.xyArray = [];
            this.size = _size;
            this.crc2 = _crc2;
            this.horizon = _horizon;
        }
        draw(_positionX) {
            let first;
            if (this.xyArray.length == 0)
                first = true;
            else
                first = false;
            let nParticles = 15;
            let radiusParticle = 5;
            let particle = new Path2D();
            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            if (this.y == null) {
                this.y = Math.floor(Math.random() * 20) + 1;
                this.y += this.horizon;
            }
            this.crc2.fillStyle = "brown";
            this.crc2.fillRect(_positionX, this.y, 3, 11);
            this.crc2.save();
            this.crc2.translate(_positionX, this.y);
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
    L09_2_Blumenwiese.Tree = Tree;
})(L09_2_Blumenwiese || (L09_2_Blumenwiese = {}));
//# sourceMappingURL=Tree.js.map