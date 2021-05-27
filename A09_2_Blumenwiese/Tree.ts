namespace L09_2_Blumenwiese {

    export class Tree {
        
        private crc2: CanvasRenderingContext2D;
        private horizon: number;
        private size: Vector;
        private y: number;
        private xyArray: Vector[] = [];


        constructor(_size: Vector, _crc2: CanvasRenderingContext2D, _horizon: number) {
            this.size = _size;
            this.crc2 = _crc2;
            this.horizon = _horizon;
        }

        public draw(_positionX: number): void {
            let first: boolean;
            if (this.xyArray.length == 0)
                first = true;
            else    
                first = false;

            let nParticles: number = 15;
            let radiusParticle: number = 5;
            let particle: Path2D = new Path2D();

            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);

            if (this.y == null) {
                this.y = Math.floor(Math.random() * 20) + 1;
                this.y += this.horizon;
            }

            this.crc2.fillStyle = "brown";
            this.crc2.fillRect(_positionX, this.y, 3, 11);

            this.crc2.save();
            this.crc2.translate(_positionX, this.y);

            this.crc2.fillStyle = "RGB(0, 128, 0)";

            for (let drawn: number = 0; drawn < nParticles; drawn++) {
                this.crc2.save();
                let x: number;
                let y: number;
                if (first) {
                    x = (Math.random() - 0.5) * this.size.x;
                    y = -(Math.random() * this.size.y);
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