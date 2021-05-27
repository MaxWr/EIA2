namespace L09_2_Blumenwiese {
    export class Bee{
        private crc2: CanvasRenderingContext2D;
        constructor(_crc2: CanvasRenderingContext2D) {
            this.crc2 = _crc2;
        }
        public draw(): void{
            
            this.crc2.save();
            this.crc2.translate(100, 100);
            this.crc2.fillStyle = "yellow";
            this.crc2.arc(0, 0, 100, 0, 2 * Math.PI);
            this.crc2.fill();
            this.crc2.restore();

        }
    }
}