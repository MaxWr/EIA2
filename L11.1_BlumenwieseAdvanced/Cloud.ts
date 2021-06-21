namespace L11_1_BlumenwieseAdvanced {

    export class Cloud extends MovingObject {
        private size: Vector;
        private nParticles: number;
        private radiusParticle: number;
        private xyArray: Vector[] = [];

        constructor(_position: Vector, _size: Vector, _nParticles: number, _radiusParticle: number, _crc2: CanvasRenderingContext2D) {
            super(_crc2, _position);
            this.size = _size;
            this.nParticles = _nParticles;
            this.radiusParticle = _radiusParticle;
        }

        public move(): void {
            this.position.x += 1;
            if (this.position.x > this.crc2.canvas.width + 100)
                this.position.x = -100;

            this.draw();
        }

        public draw(): void {
            let first: boolean;
            if (this.xyArray.length == 0)
                first = true;
            else
                first = false;

            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = this.crc2.createRadialGradient(0, 0, 0, 0, 0, this.radiusParticle);

            particle.arc(0, 0, this.radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

            this.crc2.save();
            this.crc2.translate(this.position.x, this.position.y);

            this.crc2.fillStyle = gradient;

            for (let drawn: number = 0; drawn < this.nParticles; drawn++) {
                this.crc2.save();
                let x: number;
                let y: number;
                if (first) {
                    x = (Math.random() - 0.5) * this.size.x;
                    y = - (Math.random() * this.size.y);
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
            this.crc2.restore();
        }
    }
}