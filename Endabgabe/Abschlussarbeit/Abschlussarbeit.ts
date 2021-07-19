namespace Abschlussarbeit {
    export interface Vector {
        x: number;
        y: number;
    }
    
    window.addEventListener("load", handleLoad);
    window.addEventListener("dblclick", handleDoubleClick);
    window.addEventListener("click", handleClick);

    export let crc2: CanvasRenderingContext2D;
    let humans: Human[] = [];
    let ball: Ball;
    let interval: number | undefined;
    export let pointsA: number = 0;
    export let pointsB: number = 0;

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawBackground();
        document.getElementById("startBtn")?.addEventListener("click", handleStart);
    }

    function fieldSetup(): void {
        pointsA = 0;
        pointsB = 0;

        let points: HTMLHeadingElement = <HTMLHeadingElement>document.getElementById("points");
        points.textContent = pointsA.toString() + ":" + pointsB.toString();

        humans = [];
        ball = new Ball(randomStartPosition());

        let speedMin: HTMLInputElement = <HTMLInputElement>document.getElementById("speedMin");
        let speedMax: HTMLInputElement = <HTMLInputElement>document.getElementById("speedMax");
        let strengthMin: HTMLInputElement = <HTMLInputElement>document.getElementById("strengthMin");
        let strengthMax: HTMLInputElement = <HTMLInputElement>document.getElementById("strengthMax");

        //create the players
        for (let i: number = 0; i < 22; i++) {
            let color: string;
            let playerNumber: number;
            let team: TEAM;
            //first 11 are team A
            if (i < 11) {
                let colorPicker: HTMLInputElement = <HTMLInputElement>document.getElementById("colorTeamA");
                color = colorPicker.value;
                playerNumber = i + 1;
                team = TEAM.A;
            //the remainung 11 are team B
            } else {
                let colorPicker: HTMLInputElement = <HTMLInputElement>document.getElementById("colorTeamB");
                color = colorPicker.value;
                playerNumber = i - 10;
                team = TEAM.B;
            }

            let position: Vector = StartPostions.getStartPosition(team, playerNumber);
            let speed: number = randomMinMax(parseInt(speedMin.value), parseInt(speedMax.value)) * 0.1;
            let strength: number = randomMinMax(parseInt(strengthMin.value), parseInt(strengthMax.value));
            let precision: number = randomMinMax(3, 10) * 0.1;

            let p: Player = new Player(position, color, playerNumber, team, speed, strength, precision);    
            humans.push(p);
        }
        //add a referee to the humans
        humans.push(new Referee({x: 400, y: 200}));
        //add two line judges to the humans
        humans.push(new LineJudge({x: 400, y: 15}));
        humans.push(new LineJudge({x: 400, y: 485}));

        ball.draw();

        for (let i: number = 0; i < humans.length; i++) {
            humans[i].draw();
        }
    }

    function handleStart(_event: Event): void {
        console.log("START");
        if (interval)
            window.clearInterval(interval);
        fieldSetup();
        interval = window.setInterval(update, 20);
    }

    function update(): void {
        //no player has the ball -> update
        if (ball.free) {
            crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
            drawBackground();
            for (let i: number = 0; i < humans.length; i++) {
                humans[i].update(ball);
            }
            ball.update();
        }
    }

    function handleDoubleClick(_event: MouseEvent): void {
        let x: number = _event.clientX;
        let y: number = _event.clientY;
        let rect: DOMRect = crc2.canvas.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;

        //shot on left goal
        if (x >= 0 && x <= 10 && y >= 200 && y <= 300 && !ball.free && ball.lastPlayer != null) {
            console.log("Shot on left goal.");
            ball.lastPlayer.kick({x: x, y: y}, ball);
            return;
        }

        //shot on right goal
        if (x >= 790 && x <= 800 && y >= 200 && y <= 300 && !ball.free && ball.lastPlayer != null) {
            console.log("Shot on right goal.");
            ball.lastPlayer.kick({x: x, y: y}, ball);
            return;
        }

        //pass
        for (let i: number = 0; i < humans.length; i++) {
            if (Math.abs(humans[i].position.x - x) < 10 && Math.abs(humans[i].position.y - y) < 10 && humans[i] instanceof Player) {
                if (!ball.free && ball.lastPlayer != null) {
                    console.log("Pass.");
                    ball.lastPlayer.kick(humans[i].position, ball);
                    return;
                }
            }
        }
    }

    function handleClick(_event: MouseEvent): void {
        let x: number = _event.clientX;
        let y: number = _event.clientY;
        let rect: DOMRect = crc2.canvas.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;

        for (let i: number = 0; i < humans.length; i++) {
            //found human on click position
            if (Math.abs(humans[i].position.x - x) < 10 && Math.abs(humans[i].position.y - y) < 10) { 
                let playerInfo: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("playerInfo");

                //human is a player
                if (humans[i] instanceof Player) {
                    let player: Player = <Player>humans[i];
                    //display player info
                    playerInfo.textContent = player.team + " " + player.playerNumber.toString()
                                            + ", Speed: " + (player.speed * 10).toFixed(0).toString() 
                                            + ", Strength: " + player.strength.toString()
                                            + ", Precision: " + (player.precision * 10).toFixed(0).toString();
                }
                   
            }
        }
    }

    function drawBackground(): void {
        crc2.fillStyle = "green";
        //grass
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        crc2.fillStyle = "white";
        crc2.strokeStyle = "white";
        //left goal
        let colorPickerA: HTMLInputElement = <HTMLInputElement>document.getElementById("colorTeamA");
        crc2.fillStyle = colorPickerA.value;
        crc2.fillRect(0, crc2.canvas.height / 2 - 50, 10, 100);
        //right goal
        let colorPickerB: HTMLInputElement = <HTMLInputElement>document.getElementById("colorTeamB");
        crc2.fillStyle = colorPickerB.value;
        crc2.fillRect(crc2.canvas.width - 10, crc2.canvas.height / 2 - 50, 10, 100);
        //upper line
        crc2.fillStyle = "white";
        crc2.fillRect(0, 30, crc2.canvas.width, 2);
        //lower line
        crc2.fillRect(0, crc2.canvas.height - 30, crc2.canvas.width, 2);
        //middle line
        crc2.fillRect(crc2.canvas.width / 2 - 1, 30, 2, crc2.canvas.height - 60);
        //middle dot
        crc2.save();
        crc2.translate(crc2.canvas.width / 2, crc2.canvas.height / 2);
        crc2.beginPath();
        crc2.arc(0, 0, 4, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        
        //middle circle
        crc2.beginPath();
        crc2.arc(0, 0, 50, 0, 2 * Math.PI);
        crc2.lineWidth = 2;
        crc2.closePath();
        crc2.stroke();
        crc2.restore();
    }

    //random position on field (used for ball start position)
    function randomStartPosition(): Vector {
        let x: number = Math.floor(Math.random() * (crc2.canvas.width - 30) + 30);
        let y: number = Math.floor(Math.random() * (crc2.canvas.height - 30) + 30);
        return {x: x, y: y};
    }

    //random int between two values
    function randomMinMax(_min: number, _max: number): number {
        return Math.floor(Math.random() * (_max - _min + 1) + _min);
    }

    //calculates distance between two points
    export function calculateDistance(_objectA: Vector, _objectB: Vector): number {
        return Math.sqrt(Math.pow(_objectB.x - _objectA.x, 2) + Math.pow(_objectB.y - _objectA.y, 2));  
    }

    //calculates a normalized direction vector between two points
    export function calculateDirection(_objectA: Vector, _objectB: Vector): Vector {
        let dir: Vector = {x: _objectB.x - _objectA.x, y: _objectB.y - _objectA.y};
        //vector amount
        let dirAmount: number = Math.sqrt(Math.pow(dir.x, 2) + Math.pow(dir.y, 2));
        //normalize vector
        dir = {x: 1 / dirAmount * dir.x, y: 1 / dirAmount * dir.y};
        return dir;
    }

    export function normalizeVector(_vector: Vector): Vector {
        let amount: number = Math.sqrt(Math.pow(_vector.x, 2) + Math.pow(_vector.y, 2));
        return {x: 1 / amount * _vector.x, y: 1 / amount * _vector.y};
    }
}