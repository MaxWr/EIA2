namespace L10_2_BlumenwiesePolymorphie {

    export class MovingObject extends StaticObject {

        constructor(_crc2: CanvasRenderingContext2D, _position: Vector) {
            super(_crc2, _position);
        }

        public move(): void {
            this.draw();
            return;
        }
    }
}