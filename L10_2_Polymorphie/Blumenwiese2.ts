namespace L10_2_BlumenwiesePolymorphie {
    export interface Vector {
        x: number;
        y: number;
    }

    window.addEventListener("load", handleLoad);
    let crc2: CanvasRenderingContext2D;
    let golden: number = 0.62;
    let horizon: number;

    let sun: Sun;
    let mountainGrey: Mountain;
    let mountainWhite: Mountain;

    let cloudSmall: Cloud;
    let cloudBig: Cloud;

    let staticObjects: StaticObject[] = [];
    let movingObjects: MovingObject[] = [];

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        horizon = crc2.canvas.height * golden;

        sun = new Sun(crc2, { x: 650, y: 125 });
        staticObjects.push(sun);

        mountainWhite = new Mountain(crc2, { x: 0., y: horizon }, 75, 275, "darkgrey", "white");
        staticObjects.push(mountainWhite);
        mountainGrey = new Mountain(crc2, { x: 0., y: horizon }, 50, 250, "darkgrey", "lightgrey");
        staticObjects.push(mountainGrey);

        cloudBig = new Cloud({ x: 175, y: 125 }, { x: 250, y: 75 }, 40, 50, crc2);
        movingObjects.push(cloudBig);
        cloudSmall = new Cloud({ x: 525, y: 150 }, { x: 125, y: 35 }, 20, 30, crc2);
        movingObjects.push(cloudSmall);

        for (let r: number = 0; r < 45; r++) 
            staticObjects.push(new Tree({x: Math.floor(Math.random() * crc2.canvas.width) + 1, y: 0}, { x: 15, y: 20 }, crc2, horizon));
          
        let flowerColors: string[] = ["orange", "red", "blue"];
        for (let r: number = 0; r < 150; r++) {
            let i: number = (Math.floor(Math.random() * 3) + 1) - 1;
            staticObjects.push(new Flower({x: Math.floor(Math.random() * crc2.canvas.width) + 1, y: 0}, { x: 3, y: 3 }, flowerColors[i], crc2, horizon));   
        }

        for (let b: number = 0; b < 4; b++) 
            movingObjects.push(new Bee(crc2, { x: randomNumber(0, crc2.canvas.width), y: randomNumber(crc2.canvas.height / 2, crc2.canvas.height) }, randomNumber(0, 15), { x: randomNumber(-3, 4), y: randomNumber(-1, 2) }));

        window.setInterval(update, 20);
    }

    function update(): void {
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        
        drawBackground();
        
        for (let i: number = 0; i < staticObjects.length; i++) 
            staticObjects[i].draw();

        for (let j: number = 0; j < movingObjects.length; j++) 
            movingObjects[j].move();
    }

    function randomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function drawBackground(): void {

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "HSL(215, 100%, 38%)");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(100, 80%, 30%)");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
}

