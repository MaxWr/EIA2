namespace L09_2_Blumenwiese {
    export interface Vector {
        x: number;
        y: number;
    }

    window.addEventListener("load", handleLoad);
    let crc2: CanvasRenderingContext2D;
    let golden: number = 0.62;

    let horizon: number;

    let trees: Tree[] = [];
    let treePositions: number[] = [];

    let flowers: Flower[] = [];
    let flowerPositions: number[] = [];

    let mountainGrey: Mountain;
    let mountainWhite: Mountain;

    let cloudSmall: Cloud;
    let cloudBig: Cloud;

    let bee: Bee;

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        horizon = crc2.canvas.height * golden;

        drawBackground();
        drawSun({ x: 650, y: 125 });
        
        
        cloudBig = new Cloud({ x: 175, y: 125 }, crc2);
        cloudBig.draw({ x: 250, y: 75 }, 40, 50);
        mountainWhite = new Mountain(crc2);
        mountainWhite.draw({ x: 0., y: horizon }, 75, 275, "darkgrey", "white");
        mountainGrey = new Mountain(crc2);
        mountainGrey.draw({ x: 0., y: horizon }, 50, 250, "darkgrey", "lightgrey");
        cloudSmall = new Cloud({ x: 525, y: 150 }, crc2);
        cloudSmall.draw({ x: 125, y: 35 }, 20, 30);
       
        for (let r: number = 0; r < 45; r++) {
            trees.push(new Tree({ x: 15, y: 20 }, crc2, horizon));
            let treePos: number = Math.floor(Math.random() * crc2.canvas.width) + 1;
            treePositions.push(treePos);
            trees[r].draw(treePos);
        }

        let flowerColors: string[] = ["orange", "red", "blue"];
        for (let r: number = 0; r < 150; r++) {
            let i: number = (Math.floor(Math.random() * 3) + 1) - 1;

            flowers.push(new Flower({ x: 3, y: 3 }, flowerColors[i], crc2, horizon));
            let flowerPos: number = Math.floor(Math.random() * crc2.canvas.width) + 1;
            flowerPositions.push(flowerPos);
            flowers[r].draw(flowerPos);
        }

        bee = new Bee(crc2);
        bee.draw();

        window.setInterval(update, 20);
    }

    function update(): void {
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        drawBackground();
        drawSun({ x: 650, y: 125 });
        cloudBig.position.x += 1;
        if (cloudBig.position.x > crc2.canvas.width + 100)
            cloudBig.position.x = -100;
        cloudBig.draw({ x: 250, y: 75 }, 40, 50);

        mountainWhite.draw({ x: 0., y: horizon }, 75, 275, "darkgrey", "white");
        mountainGrey.draw({ x: 0., y: horizon }, 50, 250, "darkgrey", "lightgrey");
        
        cloudSmall.position.x += 1;
        if (cloudSmall.position.x > crc2.canvas.width + 100)
            cloudSmall.position.x = -100;
        cloudSmall.draw({ x: 125, y: 35 }, 20, 30);
        for (let i: number = 0; i < trees.length; i++) {
            trees[i].draw(treePositions[i]);
        }
        for (let j: number = 0; j < flowers.length; j++) {
            flowers[j].draw(flowerPositions[j]);
        }

        bee.draw();
    }

    function drawBackground(): void {

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "HSL(215, 100%, 38%)");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(100, 80%, 30%)");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    function drawSun(_position: Vector): void {

        let r1: number = 125;
        let r2: number = 200;

        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "HSLA(60, 100%, 75%, 1)");
        gradient.addColorStop(1, "HSLA(35, 100%, 60%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }
}

