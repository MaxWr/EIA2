"use strict";
var Abschlussarbeit;
(function (Abschlussarbeit) {
    class Referee extends Abschlussarbeit.Human {
        constructor(_position) {
            super(_position, 0.5, "#000000", false);
        }
        update(_ball) {
            //always moves to ball but stops if he gets to close
            if (Abschlussarbeit.calculateDistance(this.position, _ball.position) > 50) {
                let dir = Abschlussarbeit.calculateDirection(this.position, _ball.position);
                this.position.x += this.speed * dir.x;
                this.position.y += this.speed * dir.y;
            }
            this.draw();
        }
    }
    Abschlussarbeit.Referee = Referee;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=Referee.js.map