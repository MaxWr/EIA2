namespace L11_1_BlumenwieseAdvanced {

    export abstract class StaticObject {

        public position: Vector;
        public crc2: CanvasRenderingContext2D;

        constructor(_crc2: CanvasRenderingContext2D, _position: Vector) {
            this.crc2 = _crc2;
            this.position = _position;
        }

        public abstract draw(): void;

    }
}