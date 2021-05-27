namespace L09_2_Blumenwiese {

    export class Mountain {
        private crc2: CanvasRenderingContext2D;
        private xyArray: Vector[] = [];

        constructor(_crc2: CanvasRenderingContext2D) {
            this.crc2 = _crc2;
        }

        public draw(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string): void {
            let first: boolean;
            if (this.xyArray.length == 0)
                first = true;
            else
                first = false;

            let stepMin: number = 50;
            let stepMax: number = 150;
            let x: number = 0;

            this.crc2.save();
            this.crc2.translate(_position.x, _position.y);

            this.crc2.beginPath();
            this.crc2.moveTo(0, 0);
            this.crc2.lineTo(0, -_max);

            if (first) {
                for (let i: number = 0; i < this.crc2.canvas.width + 100; i += stepMin + Math.random() * (stepMax - stepMin)) {
                    x += stepMin + Math.random() * (stepMax - stepMin);
                    let y: number = -_min - Math.random() * (_max - _min);
                    this.xyArray.push({ x, y });
                    this.crc2.lineTo(x, y);
                }
            }
            else {
                for (let i: number = 0; i < this.xyArray.length; i++) {
                    x = this.xyArray[i].x;
                    this.crc2.lineTo(this.xyArray[i].x, this.xyArray[i].y);
                }
            }

            this.crc2.lineTo(x, 0);
            this.crc2.closePath();

            let gradient: CanvasGradient = this.crc2.createLinearGradient(0, 0, 0, -_max);
            gradient.addColorStop(0, _colorLow);
            gradient.addColorStop(0.7, _colorHigh);

            this.crc2.fillStyle = gradient;
            this.crc2.fill();

            this.crc2.restore();
        }
    }
}