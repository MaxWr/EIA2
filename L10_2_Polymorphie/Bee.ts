namespace L10_2_BlumenwiesePolymorphie {

    enum Facing {
        RIGHT,
        LEFT
    }
    export class Bee extends MovingObject {

        private direction: Vector;
        private flightDuration: number;
        private facing: Facing;

        constructor(_crc2: CanvasRenderingContext2D, _position: Vector, _flightDuration: number, _direction: Vector) {
            super(_crc2, _position);
            this.direction = _direction;
            this.flightDuration = _flightDuration;
        }

        public move(): void {
            if (this.flightDuration > 16) {
                this.flightDuration = 0;
                this.direction = { x: Math.floor(Math.random() * 7 - 3), y: Math.floor(Math.random() * 3 - 1) };
            }
            this.position.x += this.direction.x;
            this.position.y += this.direction.y;

            if (this.position.x > this.crc2.canvas.width)
                this.position.x = 2;
            else if (this.position.x < 0)
                this.position.x = this.crc2.canvas.width - 2;

            if (this.position.y > this.crc2.canvas.height)
                this.position.y = 2;
            else if (this.position.y < 0)
                this.position.y = this.crc2.canvas.height - 2;

            if (this.direction.x < 0)
                this.facing = Facing.LEFT;
            else
                this.facing = Facing.RIGHT;
            
            this.flightDuration++;

            this.draw();
        }
        public draw(): void {

            this.crc2.save();
            this.crc2.translate(this.position.x, this.position.y);
            this.crc2.beginPath();
            this.crc2.fillStyle = "yellow";
            this.crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            this.crc2.closePath();
            this.crc2.fill();
            this.crc2.restore();

            this.crc2.save();
            if (this.facing == Facing.RIGHT)
                this.crc2.translate(this.position.x + 5, this.position.y);
            else
                this.crc2.translate(this.position.x - 5, this.position.y);
            this.crc2.beginPath();
            this.crc2.fillStyle = "black";
            this.crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            this.crc2.closePath();
            this.crc2.fill();
            this.crc2.restore();

            this.crc2.save();
            if (this.facing == Facing.RIGHT)
                this.crc2.translate(this.position.x - 4, this.position.y - 4);
            else
                this.crc2.translate(this.position.x + 4, this.position.y - 4);
            this.crc2.beginPath();
            this.crc2.rotate(90 * Math.PI / 180);
            this.crc2.scale(1, 2);
            this.crc2.fillStyle = "lightgrey";
            this.crc2.arc(0, 0, 3, 0, 2 * Math.PI);
            this.crc2.closePath();
            this.crc2.fill();
            this.crc2.restore();

            this.crc2.save();
            if (this.facing == Facing.RIGHT)
                this.crc2.translate(this.position.x + 5, this.position.y - 1);
            else
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