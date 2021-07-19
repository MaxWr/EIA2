namespace Abschlussarbeit {

    export abstract class Human {

        public position: Vector;
        public speed: number;
        private color: string;

        constructor(_position: Vector, _speed: number, _color: string) {
            this.position = _position;
            this.speed = _speed;
            this.color = _color;
        }

        public abstract update(_ball: Ball): void;

        public draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.beginPath();
            crc2.fillStyle = this.color;
            crc2.arc(0, 0, 10, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
            crc2.restore();
        }
    }
}