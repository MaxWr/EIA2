"use strict";
var Abschlussarbeit;
(function (Abschlussarbeit) {
    class LineJudge extends Abschlussarbeit.Human {
        constructor(_position) {
            super(_position, 0.5, "#000000", false);
        }
        update(_ball) {
            //always moves to x-position of ball
            let dir = Abschlussarbeit.calculateDirection(this.position, _ball.position);
            this.position.x += this.speed * dir.x;
            this.draw();
        }
    }
    Abschlussarbeit.LineJudge = LineJudge;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=LineJudge.js.map