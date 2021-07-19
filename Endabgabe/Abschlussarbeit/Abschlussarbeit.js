"use strict";
var Abschlussarbeit;
(function (Abschlussarbeit) {
    window.addEventListener("load", handleLoad);
    window.addEventListener("dblclick", handleDoubleClick);
    window.addEventListener("click", handleClick);
    let humans = [];
    let ball;
    let interval;
    Abschlussarbeit.pointsA = 0;
    Abschlussarbeit.pointsB = 0;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Abschlussarbeit.crc2 = canvas.getContext("2d");
        drawBackground();
        document.getElementById("startBtn")?.addEventListener("click", handleStart);
    }
    function fieldSetup() {
        Abschlussarbeit.pointsA = 0;
        Abschlussarbeit.pointsB = 0;
        let points = document.getElementById("points");
        points.textContent = Abschlussarbeit.pointsA.toString() + ":" + Abschlussarbeit.pointsB.toString();
        humans = [];
        ball = new Abschlussarbeit.Ball(randomStartPosition());
        let speedMin = document.getElementById("speedMin");
        let speedMax = document.getElementById("speedMax");
        let strengthMin = document.getElementById("strengthMin");
        let strengthMax = document.getElementById("strengthMax");
        //create the players
        for (let i = 0; i < 22; i++) {
            let color;
            let playerNumber;
            let team;
            //first 11 are team A
            if (i < 11) {
                let colorPicker = document.getElementById("colorTeamA");
                color = colorPicker.value;
                playerNumber = i + 1;
                team = Abschlussarbeit.TEAM.A;
                //the remainung 11 are team B
            }
            else {
                let colorPicker = document.getElementById("colorTeamB");
                color = colorPicker.value;
                playerNumber = i - 10;
                team = Abschlussarbeit.TEAM.B;
            }
            let position = Abschlussarbeit.StartPostions.getStartPosition(team, playerNumber);
            let speed = randomMinMax(parseInt(speedMin.value), parseInt(speedMax.value)) * 0.1;
            let strength = randomMinMax(parseInt(strengthMin.value), parseInt(strengthMax.value));
            let precision = randomMinMax(3, 10) * 0.1;
            let p = new Abschlussarbeit.Player(position, color, playerNumber, team, speed, strength, precision);
            humans.push(p);
        }
        //add a referee to the humans
        humans.push(new Abschlussarbeit.Referee({ x: 400, y: 200 }));
        //add two line judges to the humans
        humans.push(new Abschlussarbeit.LineJudge({ x: 400, y: 15 }));
        humans.push(new Abschlussarbeit.LineJudge({ x: 400, y: 485 }));
        ball.draw();
        for (let i = 0; i < humans.length; i++) {
            humans[i].draw();
        }
    }
    function handleStart(_event) {
        console.log("START");
        if (interval)
            window.clearInterval(interval);
        fieldSetup();
        interval = window.setInterval(update, 20);
    }
    function update() {
        Abschlussarbeit.crc2.clearRect(0, 0, Abschlussarbeit.crc2.canvas.width, Abschlussarbeit.crc2.canvas.height);
        drawBackground();
        //no player has the ball -> normal update
        if (ball.free) {
            for (let i = 0; i < humans.length; i++) {
                humans[i].update(ball);
            }
            ball.update();
            //a player has the ball -> only draw humans and ball
        }
        else {
            for (let i = 0; i < humans.length; i++) {
                humans[i].draw();
            }
            ball.draw();
        }
    }
    function handleDoubleClick(_event) {
        let x = _event.clientX;
        let y = _event.clientY;
        let rect = Abschlussarbeit.crc2.canvas.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;
        //shot on left goal
        if (x >= 0 && x <= 10 && y >= 200 && y <= 300 && !ball.free && ball.lastPlayer != null) {
            console.log("Shot on left goal.");
            ball.lastPlayer.kick({ x: x, y: y }, ball);
            return;
        }
        //shot on right goal
        if (x >= 790 && x <= 800 && y >= 200 && y <= 300 && !ball.free && ball.lastPlayer != null) {
            console.log("Shot on right goal.");
            ball.lastPlayer.kick({ x: x, y: y }, ball);
            return;
        }
        //pass
        for (let i = 0; i < humans.length; i++) {
            if (Math.abs(humans[i].position.x - x) < 10 && Math.abs(humans[i].position.y - y) < 10 && humans[i] instanceof Abschlussarbeit.Player) {
                if (!ball.free && ball.lastPlayer != null) {
                    console.log("Pass.");
                    ball.lastPlayer.kick(humans[i].position, ball);
                    return;
                }
            }
        }
    }
    function handleClick(_event) {
        let x = _event.clientX;
        let y = _event.clientY;
        let rect = Abschlussarbeit.crc2.canvas.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;
        for (let i = 0; i < humans.length; i++) {
            //found human on click position
            if (Math.abs(humans[i].position.x - x) < 10 && Math.abs(humans[i].position.y - y) < 10) {
                let playerInfo = document.getElementById("playerInfo");
                //human is a player
                if (humans[i] instanceof Abschlussarbeit.Player) {
                    let player = humans[i];
                    //display player info
                    playerInfo.textContent = player.team + " " + player.playerNumber.toString()
                        + ", Speed: " + (player.speed * 10).toFixed(0).toString()
                        + ", Strength: " + player.strength.toString()
                        + ", Precision: " + (player.precision * 10).toFixed(0).toString();
                }
            }
        }
    }
    function drawBackground() {
        Abschlussarbeit.crc2.fillStyle = "green";
        //grass
        Abschlussarbeit.crc2.fillRect(0, 0, Abschlussarbeit.crc2.canvas.width, Abschlussarbeit.crc2.canvas.height);
        Abschlussarbeit.crc2.fillStyle = "white";
        Abschlussarbeit.crc2.strokeStyle = "white";
        //left goal
        let colorPickerA = document.getElementById("colorTeamA");
        Abschlussarbeit.crc2.fillStyle = colorPickerA.value;
        Abschlussarbeit.crc2.fillRect(0, Abschlussarbeit.crc2.canvas.height / 2 - 50, 10, 100);
        //right goal
        let colorPickerB = document.getElementById("colorTeamB");
        Abschlussarbeit.crc2.fillStyle = colorPickerB.value;
        Abschlussarbeit.crc2.fillRect(Abschlussarbeit.crc2.canvas.width - 10, Abschlussarbeit.crc2.canvas.height / 2 - 50, 10, 100);
        //upper line
        Abschlussarbeit.crc2.fillStyle = "white";
        Abschlussarbeit.crc2.fillRect(0, 30, Abschlussarbeit.crc2.canvas.width, 2);
        //lower line
        Abschlussarbeit.crc2.fillRect(0, Abschlussarbeit.crc2.canvas.height - 30, Abschlussarbeit.crc2.canvas.width, 2);
        //middle line
        Abschlussarbeit.crc2.fillRect(Abschlussarbeit.crc2.canvas.width / 2 - 1, 30, 2, Abschlussarbeit.crc2.canvas.height - 60);
        //middle dot
        Abschlussarbeit.crc2.save();
        Abschlussarbeit.crc2.translate(Abschlussarbeit.crc2.canvas.width / 2, Abschlussarbeit.crc2.canvas.height / 2);
        Abschlussarbeit.crc2.beginPath();
        Abschlussarbeit.crc2.arc(0, 0, 4, 0, 2 * Math.PI);
        Abschlussarbeit.crc2.closePath();
        Abschlussarbeit.crc2.fill();
        //middle circle
        Abschlussarbeit.crc2.beginPath();
        Abschlussarbeit.crc2.arc(0, 0, 50, 0, 2 * Math.PI);
        Abschlussarbeit.crc2.lineWidth = 2;
        Abschlussarbeit.crc2.closePath();
        Abschlussarbeit.crc2.stroke();
        Abschlussarbeit.crc2.restore();
    }
    //random position on field (used for ball start position)
    function randomStartPosition() {
        let x = Math.floor(Math.random() * (Abschlussarbeit.crc2.canvas.width - 30) + 30);
        let y = Math.floor(Math.random() * (Abschlussarbeit.crc2.canvas.height - 30) + 30);
        return { x: x, y: y };
    }
    //random int between two values
    function randomMinMax(_min, _max) {
        return Math.floor(Math.random() * (_max - _min + 1) + _min);
    }
    //calculates distance between two points
    function calculateDistance(_objectA, _objectB) {
        return Math.sqrt(Math.pow(_objectB.x - _objectA.x, 2) + Math.pow(_objectB.y - _objectA.y, 2));
    }
    Abschlussarbeit.calculateDistance = calculateDistance;
    //calculates a normalized direction vector between two points
    function calculateDirection(_objectA, _objectB) {
        let dir = { x: _objectB.x - _objectA.x, y: _objectB.y - _objectA.y };
        //vector amount
        let dirAmount = Math.sqrt(Math.pow(dir.x, 2) + Math.pow(dir.y, 2));
        //normalize vector
        dir = { x: 1 / dirAmount * dir.x, y: 1 / dirAmount * dir.y };
        return dir;
    }
    Abschlussarbeit.calculateDirection = calculateDirection;
    function normalizeVector(_vector) {
        let amount = Math.sqrt(Math.pow(_vector.x, 2) + Math.pow(_vector.y, 2));
        return { x: 1 / amount * _vector.x, y: 1 / amount * _vector.y };
    }
    Abschlussarbeit.normalizeVector = normalizeVector;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=Abschlussarbeit.js.map