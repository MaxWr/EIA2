"use strict";
var L10_2_BlumenwiesePolymorphie;
(function (L10_2_BlumenwiesePolymorphie) {
    class MovingObject extends L10_2_BlumenwiesePolymorphie.StaticObject {
        constructor(_crc2, _position) {
            super(_crc2, _position);
        }
        move() {
            this.draw();
            return;
        }
    }
    L10_2_BlumenwiesePolymorphie.MovingObject = MovingObject;
})(L10_2_BlumenwiesePolymorphie || (L10_2_BlumenwiesePolymorphie = {}));
//# sourceMappingURL=MovingObject.js.map