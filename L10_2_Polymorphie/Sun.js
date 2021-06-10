"use strict";
var L10_2_BlumenwiesePolymorphie;
(function (L10_2_BlumenwiesePolymorphie) {
    class Sun extends L10_2_BlumenwiesePolymorphie.StaticObject {
        constructor(_crc2, _position) {
            super(_crc2, _position);
        }
        draw() {
            let r1 = 125;
            let r2 = 200;
            let gradient = this.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradient.addColorStop(0, "HSLA(60, 100%, 75%, 1)");
            gradient.addColorStop(1, "HSLA(35, 100%, 60%, 0)");
            this.crc2.save();
            this.crc2.translate(this.position.x, this.position.y);
            this.crc2.fillStyle = gradient;
            this.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
            this.crc2.fill();
            this.crc2.restore();
        }
    }
    L10_2_BlumenwiesePolymorphie.Sun = Sun;
})(L10_2_BlumenwiesePolymorphie || (L10_2_BlumenwiesePolymorphie = {}));
//# sourceMappingURL=Sun.js.map