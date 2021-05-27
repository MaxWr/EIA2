namespace L09_2_Blumenwiese {

    export class Cloud {
        public position: Vector;

        private crc2: CanvasRenderingContext2D;
        private xyArray: Vector[] = [];

        constructor(_position: Vector, _crc2: CanvasRenderingContext2D) {
            this.position = _position;
            this.crc2 = _crc2;
        }

        public draw(_size: Vector, _nParticles: number, _radiusParticle: number): void {
            let first: boolean;
            if (this.xyArray.length == 0)
                first = true;
            else
                first = false;

            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = this.crc2.createRadialGradient(0, 0, 0, 0, 0, _radiusParticle);
    
            particle.arc(0, 0, _radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
    
            this.crc2.save();
            this.crc2.translate(this.position.x, this.position.y);
    
            this.crc2.fillStyle = gradient;
    
            for (let drawn: number = 0; drawn < _nParticles; drawn++) {
                this.crc2.save();
                let x: number;
                let y: number;
                if (first) {
                    x = (Math.random() - 0.5) * _size.x;
                    y = - (Math.random() * _size.y);
                    this.xyArray.push({x, y});
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