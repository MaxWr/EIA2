namespace L11_1_BlumenwieseAdvanced {

    export abstract class MovingObject extends StaticObject {

        constructor(_crc2: CanvasRenderingContext2D, _position: Vector) {
            super(_crc2, _position);
        }

        public abstract move(): void;
    }
}