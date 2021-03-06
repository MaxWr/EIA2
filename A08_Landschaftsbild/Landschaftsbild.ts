namespace L08_Canvas_Alley{
    interface Vector{
        x: number;
        y: number;
    }

    window.addEventListener("load", handleLoad);
    let crc2: CanvasRenderingContext2D;
    let golden: number = 0.62;

    let horizon: number;

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        horizon = crc2.canvas.height * golden;

        drawBackground();
        drawSun({x: 650, y: 125});
        drawCloudBig({x: 175, y: 125}, {x: 250, y: 75});
        drawMountains({x: 0., y: horizon}, 75, 275, "darkgrey", "white");
        drawMountains({x: 0., y: horizon}, 50, 250, "darkgrey", "lightgrey");
        drawCloudSmall({x: 525, y: 150}, {x: 125, y: 35});
        
        for (let r: number = 0; r < 45; r++){
            drawTrees(Math.floor(Math.random() * crc2.canvas.width) + 1, {x: 15, y: 20});
        }
        
        let flowerColors: string[] = ["orange", "red", "blue"];
        for (let r: number = 0; r < 150; r++){
            let i: number = (Math.floor(Math.random() * 3) + 1)-1;
            drawFlowers(Math.floor(Math.random() * crc2.canvas.width) + 1, {x: 3, y: 3}, flowerColors[i]);
        }
    }

    function drawBackground(): void {
        console.log("Background");

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "HSL(215, 100%, 38%)");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(100, 80%, 30%)");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    function drawSun(_position: Vector): void {
        console.log("Sun", _position);

        let r1: number = 125;
        let r2: number = 200;

        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "HSLA(60, 100%, 75%, 1)");
        gradient.addColorStop(1, "HSLA(35, 100%, 60%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2*Math.PI);
        crc2.fill();
        crc2.restore();
    }

    function drawCloudBig(_position: Vector, _size: Vector): void {
        console.log("Cloud", _position, _size);

        let nParticles: number = 40;
        let radiusParticle: number = 50;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2*Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);

        crc2.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++){
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random()  * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }

        crc2.restore();

    }

    function drawCloudSmall(_position: Vector, _size: Vector): void {
        console.log("Cloud", _position, _size);

        let nParticles: number = 20;
        let radiusParticle: number = 30;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2*Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);

        crc2.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++){
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random()  * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }

        crc2.restore();

    }


    function drawMountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string): void {
        console.log("Mountains", _min, _max);

        let stepMin: number = 50;
        let stepMax: number = 150;
        let x: number = 0;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);

        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y: number= -_min - Math.random() * (_max - _min);

            crc2.lineTo(x, y);

        } while (x < crc2.canvas.width)

        crc2.lineTo(x, 0);
        crc2.closePath();

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);

        crc2.fillStyle = gradient;
        crc2.fill();

        crc2.restore();
    }

    function drawTrees(_positionX: number , _size: Vector): void {
        console.log("Trees", _positionX, _size);

        let nParticles: number = 15;
        let radiusParticle: number = 5;
        let particle: Path2D = new Path2D();

        particle.arc(0, 0, radiusParticle, 0, 2*Math.PI);

        let y: number = Math.floor(Math.random() * 20) + 1;
        y += horizon;
        crc2.fillStyle = "brown";
        crc2.fillRect(_positionX, y, 3, 11);

        crc2.save();
        crc2.translate(_positionX, y);
        // console.log(y);

        crc2.fillStyle = "RGB(0, 128, 0)";

        for (let drawn: number = 0; drawn < nParticles; drawn++){
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random()  * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }

        crc2.restore();

    }

    function drawFlowers(_positionX: number , _size: Vector, _color: string): void {
        console.log("Flowers", _positionX, _size, _color);

        let nParticles: number = 4;
        let radiusParticle: number = 2;
        let particle: Path2D = new Path2D();

        particle.arc(0, 0, radiusParticle, 0, 2*Math.PI);

        let y: number = Math.floor(Math.random() * 200) + 1;
        y += horizon + 20;
        crc2.fillStyle = "green";
        crc2.fillRect(_positionX, y, 3, 5);

        crc2.save();
        crc2.translate(_positionX, y);
        // console.log(y);

        crc2.fillStyle = _color;

        for (let drawn: number = 0; drawn < nParticles; drawn++){
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random()  * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }

        crc2.restore();

    }
}

