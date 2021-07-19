namespace Abschlussarbeit {

    export class Referee extends Human {
        
        constructor(_position: Vector) {
            super(_position, 0.5, "#000000");
        }

        public update(_ball: Ball): void {
            
            //always moves to ball but stops if he gets to close
            if (calculateDistance(this.position, _ball.position) > 50) {
                let dir: Vector = calculateDirection(this.position, _ball.position);
                this.position.x += this.speed * dir.x;
                this.position.y += this.speed * dir.y;
            }
            this.draw();
        }
    }
}