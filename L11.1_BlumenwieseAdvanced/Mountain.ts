namespace L11_1_BlumenwieseAdvanced {

    export class Mountain extends StaticObject {
        private min: number;
        private max: number;
        private colorLow: string;
        private colorHigh: string;
        private xyArray: Vector[] = [];

        constructor(_crc2: CanvasRenderingContext2D, _position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string) {
            super(_crc2, _position);
            this.min = _min;
            this.max = _max;
            this.colorLow = _colorLow;
            this.colorHigh = _colorHigh;
        }

        public draw(): void {
            let first: boolean;
            if (this.xyArray.length == 0)
                first = true;
            else
                first = false;

            let stepMin: number = 50;
            let stepMax: number = 150;
            let x: number = 0;

            this.crc2.save();
            this.crc2.translate(this.position.x, this.position.y);

            this.crc2.beginPath();
            this.crc2.moveTo(0, 0);
            this.crc2.lineTo(0, -this.max);

            if (first) {
                for (let i: number = 0; i < this.crc2.canvas.width + 100; i += stepMin + Math.random() * (stepMax - stepMin)) {
                    x += stepMin + Math.random() * (stepMax - stepMin);
                    let y: number = -this.min - Math.random() * (this.max - this.min);
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

            let gradient: CanvasGradient = this.crc2.createLinearGradient(0, 0, 0, -this.max);
            gradient.addColorStop(0, this.colorLow);
            gradient.addColorStop(0.7, this.colorHigh);

            this.crc2.fillStyle = gradient;
            this.crc2.fill();

            this.crc2.restore();
        }
    }
}