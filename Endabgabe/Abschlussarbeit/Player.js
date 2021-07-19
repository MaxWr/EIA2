"use strict";
var Abschlussarbeit;
(function (Abschlussarbeit) {
    let TEAM;
    (function (TEAM) {
        TEAM["A"] = "Team A";
        TEAM["B"] = "Team B";
    })(TEAM = Abschlussarbeit.TEAM || (Abschlussarbeit.TEAM = {}));
    class Player extends Abschlussarbeit.Human {
        constructor(_position, _color, _playerNumber, _team, _speed, _strength, _precision) {
            super(_position, _speed, _color, true);
            //field length 100m and vision distance 30m ≙ 800px and 240px
            this.visionDistance = 240;
            this.playerNumber = _playerNumber;
            this.team = _team;
            this.strength = _strength;
            this.precision = _precision;
        }
        update(_ball) {
            let dir;
            let dis = Abschlussarbeit.calculateDistance(this.position, _ball.position);
            //player sees the ball and moves in its direction
            if (dis <= this.visionDistance) {
                dir = Abschlussarbeit.calculateDirection(this.position, _ball.position);
                this.position.x += this.speed * dir.x;
                this.position.y += this.speed * dir.y;
                //player does not see the ball and moves to start position
            }
            else {
                let startPos = Abschlussarbeit.StartPostions.getStartPosition(this.team, this.playerNumber);
                if (this.position.x != startPos.x || this.position.y != startPos.y) {
                    dir = Abschlussarbeit.calculateDirection(this.position, Abschlussarbeit.StartPostions.getStartPosition(this.team, this.playerNumber));
                    this.position.x += this.speed * dir.x;
                    this.position.y += this.speed * dir.y;
                }
            }
            //player has the ball
            if (Abschlussarbeit.calculateDistance(this.position, _ball.position) < 1 && _ball.speed < 1) {
                console.log(this.team + " " + this.playerNumber + " has the ball.");
                let currentPlayer = document.getElementById("currentPlayer");
                currentPlayer.textContent = " " + this.team + " " + this.playerNumber.toString() + " has the ball.";
                _ball.speed = 0;
                _ball.direction = { x: 0, y: 0 };
                _ball.lastPlayer = this;
                _ball.free = false;
            }
            this.draw();
        }
        //kick the ball in direction of other player or goal
        kick(_position, _ball) {
            let dir = Abschlussarbeit.calculateDirection(this.position, _position);
            //let precision affect kick direction
            if (Math.random() < 0.5) // 50/50 chance
                dir.x *= this.precision; //x precision is affected
            else
                dir.y *= this.precision; //y precision is affected
            dir = Abschlussarbeit.normalizeVector(dir);
            _ball.direction = dir;
            _ball.speed = this.strength;
            _ball.free = true;
            let currentPlayer = document.getElementById("currentPlayer");
            currentPlayer.textContent = "";
        }
    }
    Abschlussarbeit.Player = Player;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=Player.js.map