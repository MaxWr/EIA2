"use strict";
var Abschlussarbeit;
(function (Abschlussarbeit) {
    class Human {
        constructor(_position, _speed, _color, _isPlayer) {
            this.position = _position;
            this.speed = _speed;
            this.color = _color;
            this.isPlayer = _isPlayer;
        }
        draw() {
            Abschlussarbeit.crc2.save();
            Abschlussarbeit.crc2.translate(this.position.x, this.position.y);
            Abschlussarbeit.crc2.beginPath();
            Abschlussarbeit.crc2.fillStyle = this.color;
            Abschlussarbeit.crc2.arc(0, 0, 10, 0, 2 * Math.PI);
            Abschlussarbeit.crc2.closePath();
            Abschlussarbeit.crc2.fill();
            Abschlussarbeit.crc2.restore();
        }
    }
    Abschlussarbeit.Human = Human;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=Human.js.map