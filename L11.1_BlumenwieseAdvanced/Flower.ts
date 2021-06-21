namespace L11_1_BlumenwieseAdvanced {

    export class Flower extends StaticObject {

        private horizon: number;
        private size: Vector;
        private color: string;
        private xyArray: Vector[] = [];
        private nectar: number;

        constructor(_position: Vector, _size: Vector, _color: string, _crc2: CanvasRenderingContext2D, _horizon: number) {
            super(_crc2, _position);
            this.size = _size;
            this.color = _color;
            this.horizon = _horizon;
            this.nectar = 0.1;
        }

        public draw(): void {

            let first: boolean;
            if (this.xyArray.length == 0)
                first = true;
            else
                first = false;

            let nParticles: number = 4;
            let radiusParticle: number = 2;
            let particle: Path2D = new Path2D();

            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);

            if (this.position.y == 0) {
                this.position.y = Math.floor(Math.random() * 200) + 1;
                this.position.y += this.horizon + 20;
            }
            this.crc2.fillStyle = "green";
            this.crc2.fillRect(this.position.x, this.position.y  - this.nectar * 5, 3, 5 * this.nectar);

            this.crc2.save();
            this.crc2.translate(this.position.x, this.position.y - this.nectar * 5);

            this.crc2.fillStyle = this.color;

            for (let drawn: number = 0; drawn < nParticles; drawn++) {
                this.crc2.save();
                let x: number;
                let y: number;
                if (first) {
                    x = (Math.random() - 0.5) * this.size.x;
                    y = -(Math.random() * this.size.y);
                    this.xyArray.push({ x, y });
                }
                else {
                    x = this.xyArray[drawn].x;
                    y = this.xyArray[drawn].y;
                }
                this.crc2.translate(x, y);
                this.crc2.fill(particle);
                this.crc2.restore();
            }

            if (this.nectar < 2)
                this.nectar += randomNumber(1, 5) * 0.001;
            this.crc2.restore();
        }
    }
}