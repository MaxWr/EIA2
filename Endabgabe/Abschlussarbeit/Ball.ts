namespace Abschlussarbeit {

    export class Ball {

        public position: Vector;
        public direction: Vector;
        public speed: number = 0;
        public lastPlayer: Player;
        public free: boolean = true;

        constructor(_position: Vector) {
            this.position = _position;
        }

        public update(): void {

            //moves the ball
            if (this.speed > 0) {
                this.position.x += this.direction.x * this.speed;
                this.position.y += this.direction.y * this.speed;
                this.speed -= 0.1;
            }

            let points: HTMLHeadingElement = <HTMLHeadingElement>document.getElementById("points");
            //Goal for B
            if (this.position.x >= 0 && this.position.x <= 10 && this.position.y >= 200 && this.position.y <= 300) {
                console.log("Goal for Team B");
                pointsB += 1;
                points.textContent = pointsA.toString() + ":" + pointsB.toString();
                this.resetBall();
            
            //Goal for A
            } else if (this.position.x >= 790 && this.position.x <= 800 && this.position.y >= 200 && this.position.y <= 300) {
                console.log("Goal for Team A");
                pointsA += 1;
                points.textContent = pointsA.toString() + ":" + pointsB.toString();
                this.resetBall();
            
            //ball left the field
            } else if (this.position.x > crc2.canvas.width || this.position.x < 0 || this.position.y > crc2.canvas.height - 30 || this.position.y < 30) {
                console.log("Ball left the field.");
                this.resetBall();
            }

            this.draw();
        }

        public draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.beginPath();
            crc2.fillStyle = "white";
            crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
            crc2.beginPath();
            crc2.fillStyle = "black";
            crc2.arc(0, 0, 2, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
            crc2.restore();
        }

        //moves ball to middle of field
        private resetBall(): void {
            this.position.x = crc2.canvas.width / 2;
            this.position.y = crc2.canvas.height / 2;
            this.speed = 0;
            this.direction = {x: 0, y: 0};
        }
    }
}