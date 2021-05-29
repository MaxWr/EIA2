namespace L09_2_Blumenwiese {
    export class Bee{
        public position: Vector;
        public direction: Vector;
        public flightDuration: number;
        private crc2: CanvasRenderingContext2D;
        constructor(_crc2: CanvasRenderingContext2D, _position: Vector, _flightDuration: number, _direction: Vector) {
            this.crc2 = _crc2;
            this.position = _position;
            this.direction = _direction;
            this.flightDuration = _flightDuration;
        }
        public drawRight(): void{

            this.flightDuration++;
            this.crc2.save();
            this.crc2.translate(this.position.x, this.position.y);
            this.crc2.beginPath();
            this.crc2.fillStyle = "yellow";
            this.crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            this.crc2.closePath();
            this.crc2.fill();
            this.crc2.restore();

            this.crc2.save();
            this.crc2.translate(this.position.x + 5, this.position.y);
            this.crc2.beginPath();
            this.crc2.fillStyle = "black";
            this.crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            this.crc2.closePath();
            this.crc2.fill();
            this.crc2.restore();

            this.crc2.save();
            this.crc2.translate(this.position.x - 4, this.position.y - 4);
            this.crc2.beginPath();
            this.crc2.rotate(90*Math.PI/180);
            this.crc2.scale(1, 2);
            this.crc2.fillStyle = "lightgrey";
            this.crc2.arc(0, 0, 3, 0, 2 * Math.PI);
            this.crc2.closePath();
            this.crc2.fill();
            this.crc2.restore();

            this.crc2.save();
            this.crc2.translate(this.position.x + 5, this.position.y - 1);
            this.crc2.beginPath();
            this.crc2.fillStyle = "white";
            this.crc2.arc(0, 0, 2, 0, 2 * Math.PI);
            this.crc2.closePath();
            this.crc2.fill();
            this.crc2.restore();

        }

        public drawLeft(): void{
            
            this.flightDuration++;
            this.crc2.save();
            this.crc2.translate(this.position.x, this.position.y);
            this.crc2.beginPath();
            this.crc2.fillStyle = "yellow";
            this.crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            this.crc2.closePath();
            this.crc2.fill();
            this.crc2.restore();

            this.crc2.save();
            this.crc2.translate(this.position.x - 5, this.position.y);
            this.crc2.beginPath();
            this.crc2.fillStyle = "black";
            this.crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            this.crc2.closePath();
            this.crc2.fill();
            this.crc2.restore();

            this.crc2.save();
            this.crc2.translate(this.position.x + 4, this.position.y - 4);
            this.crc2.beginPath();
            this.crc2.rotate(90*Math.PI/180);
            this.crc2.scale(1, 2);
            this.crc2.fillStyle = "lightgrey";
            this.crc2.arc(0, 0, 3, 0, 2 * Math.PI);
            this.crc2.closePath();
            this.crc2.fill();
            this.crc2.restore();

            this.crc2.save();
            this.crc2.translate(this.position.x - 5, this.position.y - 1);
            this.crc2.beginPath();
            this.crc2.fillStyle = "white";
            this.crc2.arc(0, 0, 2, 0, 2 * Math.PI);
            this.crc2.closePath();
            this.crc2.fill();
            this.crc2.restore();

        }
    }
}