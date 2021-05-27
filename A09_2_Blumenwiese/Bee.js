"use strict";
var L09_2_Blumenwiese;
(function (L09_2_Blumenwiese) {
    class Bee {
        constructor(_crc2) {
            this.crc2 = _crc2;
        }
        draw() {
            this.crc2.save();
            this.crc2.translate(100, 100);
            this.crc2.fillStyle = "yellow";
            this.crc2.arc(0, 0, 100, 0, 2 * Math.PI);
            this.crc2.fill();
            this.crc2.restore();
        }
    }
    L09_2_Blumenwiese.Bee = Bee;
})(L09_2_Blumenwiese || (L09_2_Blumenwiese = {}));
//# sourceMappingURL=Bee.js.map