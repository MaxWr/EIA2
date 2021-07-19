namespace Abschlussarbeit {

    export class StartPostions {

        public static getStartPosition(_team: TEAM, _playerNumber: number): Vector {

            let teamA: Vector[] = [
                {x: 100, y: 50},
                {x: 50, y: 250},
                {x: 100, y: 450},
                {x: 350, y: 50},
                {x: 350, y: 250},
                {x: 350, y: 450},
                {x: 550, y: 50},
                {x: 600, y: 250},
                {x: 550, y: 450},
                {x: 700, y: 100},
                {x: 700, y: 400}
            ];

            let teamB: Vector[] = [
                {x: 700, y: 50},
                {x: 750, y: 250},
                {x: 700, y: 450},
                {x: 450, y: 50},
                {x: 450, y: 250},
                {x: 450, y: 450},
                {x: 250, y: 50},
                {x: 200, y: 250},
                {x: 250, y: 450},
                {x: 100, y: 100},
                {x: 100, y: 400}
            ];

            if (_team == TEAM.A)
                return teamA[_playerNumber - 1];
            else
                return teamB[_playerNumber - 1];
        }
    }
}