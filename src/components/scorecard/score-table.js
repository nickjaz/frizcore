
import React, { Component } from 'react';
import { times, cloneDeep, isEmpty } from 'lodash';
import PlayerRow from './player-row'

export default class ScoreTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: {},
        };

        this.updateScore = this.updateScore.bind(this);
        this.getPlayerRows = this.getPlayerRows.bind(this);
    };

    componentDidMount() {
        let scoreCard = {};
        let playerObj = {};

        times(this.props.number_of_holes, (n) => {
            let holeNum = `${n+1}`;
            let newHole = 0


            scoreCard[holeNum] = newHole
        });

        times(this.props.number_of_players, (n) => {
            let scoreClone = cloneDeep(scoreCard);
            let playerNum = `${n+1}`;
            let newPlayer = {
                name: 'Player ' + (n + 1),
                score: scoreClone,
                total_score: 0,
            }

            playerObj[playerNum] = newPlayer;
        });

        this.setState({
            players: playerObj,
        });
    };

    getTotalHoles = (number_of_holes) => {
        let holeHeaders = [];

        times(number_of_holes, (n) => {
            holeHeaders.push(
                <th className='text-center'>{n + 1}</th>
            );
        });

        return holeHeaders;
    };

    getPlayerRows(number_of_players) {
        let playerRows = [];

        times(number_of_players, (n) => {
            let num = (n + 1);
            let player = !isEmpty(this.state.players) ? this.state.players[num] : {total_score: 0}

            playerRows.push(
                <PlayerRow  player_num={num}
                            number_of_holes={this.props.number_of_holes}
                            updateScore={this.updateScore}
                            totalScore={player.total_score}
                    />
            );
        });

        return playerRows;
    };

    updateScore(e, h, p) {
        let { players } = this.state;
        let val = parseInt(e.target.value, 10);
        let playerNum = p;
        let holeNum = h + 1;
        let newScore = 0;

        if (Number.isNaN(val)) {
            newScore = 0;
        } else {
            newScore = val;
        }

        players[playerNum].score[holeNum] = newScore;

        this.setState({
            players,
        });

        this.getTotal(playerNum);
    };

    getTotal = (p) => {
        let {players} = this.state

        let total = 0;

        Object.keys(players[p].score).map(key => {
            return total += players[p].score[key];
        });

        players[p].total_score = total;

        this.setState({
            players,
        });
    };

    render() {
        let { number_of_holes, number_of_players } = this.props;

        return (
            <div className='table-responsive'>
                <table className='table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th></th>
                            {this.getTotalHoles(number_of_holes)}
                            <th>Par</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getPlayerRows(number_of_players)}
                    </tbody>
                </table>
            </div>
        );
    };
};
