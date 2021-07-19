namespace Abschlussarbeit {
    export enum TEAM {
        A = "Team A",
        B = "Team B"
    }
    export class Player extends Human {

        public strength: number;
        public precision: number;
        public playerNumber: number;
        public team: TEAM;
        //field length 100m and vision distance 30m ≙ 800px and 240px, but is too big -> 200
        private visionDistance: number = 200;
        
        constructor(_position: Vector, _color: string, _playerNumber: number, _team: TEAM, _speed: number, _strength: number, _precision: number) {
            super(_position, _speed, _color);
            this.playerNumber = _playerNumber;
            this.team = _team;
            this.strength = _strength;
            this.precision = _precision;
        }

        public update(_ball: Ball): void {

            let dir: Vector;
            let dis: number = calculateDistance(this.position, _ball.position);
            
            //player sees the ball and moves in its direction
            if (dis <= this.visionDistance) {
                dir = calculateDirection(this.position, _ball.position);
                this.position.x += this.speed * dir.x;
                this.position.y += this.speed * dir.y;
            
            //player does not see the ball and moves to start position
            } else {
                let startPos: Vector =  StartPostions.getStartPosition(this.team, this.playerNumber);
                if (this.position.x != startPos.x || this.position.y != startPos.y) {
                    dir = calculateDirection(this.position, StartPostions.getStartPosition(this.team, this.playerNumber));
                    this.position.x += this.speed * dir.x;
                    this.position.y += this.speed * dir.y;
                }
            }
            
            //player has the ball
            if (calculateDistance(this.position, _ball.position) < 1 && _ball.speed < 1) {
                console.log(this.team + " " + this.playerNumber + " has the ball.");
                let currentPlayer: HTMLHeadingElement = <HTMLHeadingElement>document.getElementById("currentPlayer");
                currentPlayer.textContent = " " + this.team + " " + this.playerNumber.toString() + " has the ball.";
                _ball.speed = 0;
                _ball.direction = {x: 0, y: 0};
                _ball.lastPlayer = this;
                _ball.free = false;
            } 
        
            this.draw();
        }

        //kick the ball in direction of other player or goal
        public kick(_position: Vector, _ball: Ball): void {
            let dir: Vector = calculateDirection(this.position, _position);
            
            //let precision affect kick direction
            if (Math.random() < 0.5)// 50/50 chance
                dir.x *= this.precision; //x precision is affected
            else
                dir.y *= this.precision; //y precision is affected
            dir = normalizeVector(dir);

            _ball.direction = dir;
            _ball.speed = this.strength;
            _ball.free = true;
            let currentPlayer: HTMLHeadingElement = <HTMLHeadingElement>document.getElementById("currentPlayer");
            currentPlayer.textContent = "";
        }
    }
}