namespace L10_2_BlumenwiesePolymorphie {

    export class StaticObject {

        public position: Vector;
        public crc2: CanvasRenderingContext2D;

        constructor(_crc2: CanvasRenderingContext2D, _position: Vector) {
            this.crc2 = _crc2;
            this.position = _position;
        }

        public draw(): void {
            return;
        }
    }
}