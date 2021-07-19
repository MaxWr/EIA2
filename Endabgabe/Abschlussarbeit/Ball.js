"use strict";
var Abschlussarbeit;
(function (Abschlussarbeit) {
    class Ball {
        constructor(_position) {
            this.speed = 0;
            this.free = true;
            this.position = _position;
        }
        update() {
            //moves the ball
            if (this.speed > 0) {
                this.position.x += this.direction.x * this.speed;
                this.position.y += this.direction.y * this.speed;
                this.speed -= 0.1;
            }
            let points = document.getElementById("points");
            //Goal for B
            if (this.position.x >= 0 && this.position.x <= 10 && this.position.y >= 200 && this.position.y <= 300) {
                console.log("Goal for Team B");
                Abschlussarbeit.pointsB += 1;
                points.textContent = Abschlussarbeit.pointsA.toString() + ":" + Abschlussarbeit.pointsB.toString();
                this.resetBall();
                //Goal for A
            }
            else if (this.position.x >= 790 && this.position.x <= 800 && this.position.y >= 200 && this.position.y <= 300) {
                console.log("Goal for Team A");
                Abschlussarbeit.pointsA += 1;
                points.textContent = Abschlussarbeit.pointsA.toString() + ":" + Abschlussarbeit.pointsB.toString();
                this.resetBall();
                //ball left the field
            }
            else if (this.position.x > Abschlussarbeit.crc2.canvas.width || this.position.x < 0 || this.position.y > Abschlussarbeit.crc2.canvas.height - 30 || this.position.y < 30) {
                console.log("Ball left the field.");
                this.resetBall();
            }
            this.draw();
        }
        draw() {
            Abschlussarbeit.crc2.save();
            Abschlussarbeit.crc2.translate(this.position.x, this.position.y);
            Abschlussarbeit.crc2.beginPath();
            Abschlussarbeit.crc2.fillStyle = "white";
            Abschlussarbeit.crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            Abschlussarbeit.crc2.closePath();
            Abschlussarbeit.crc2.fill();
            Abschlussarbeit.crc2.beginPath();
            Abschlussarbeit.crc2.fillStyle = "black";
            Abschlussarbeit.crc2.arc(0, 0, 2, 0, 2 * Math.PI);
            Abschlussarbeit.crc2.closePath();
            Abschlussarbeit.crc2.fill();
            Abschlussarbeit.crc2.restore();
        }
        //moves ball to middle of field
        resetBall() {
            this.position.x = Abschlussarbeit.crc2.canvas.width / 2;
            this.position.y = Abschlussarbeit.crc2.canvas.height / 2;
            this.speed = 0;
            this.direction = { x: 0, y: 0 };
        }
    }
    Abschlussarbeit.Ball = Ball;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=Ball.js.map