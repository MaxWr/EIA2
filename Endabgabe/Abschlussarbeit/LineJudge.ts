namespace Abschlussarbeit {

    export class LineJudge extends Human {
        
        constructor(_position: Vector) {
            super(_position, 0.5, "#000000");
        }

        public update(_ball: Ball): void {
            //always moves to x-position of ball
            let dir: Vector = calculateDirection(this.position, _ball.position);
            this.position.x += this.speed * dir.x;
            this.draw();
        }
    }
}