
import React, { Component } from 'react';
import { times } from 'lodash';
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
            let newHole = {
                value: 0,
                above_par: 0,
            }

            scoreCard[holeNum] = newHole
        });

        times(this.props.number_of_players, (n) => {
            let playerNum = `${n+1}`;
            let newPlayer = {
                name: 'Player ' + (n + 1),
                score: scoreCard,
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
            playerRows.push(
                <PlayerRow  player_num={n}
                            number_of_holes={this.props.number_of_holes}
                            updateScore={this.updateScore}
                            scoreTable={this.state.players}
                    />
            );
        });

        return playerRows;
    };

    updateScore(e) {
        let {players} = this.state;
        let val = parseInt(e.target.value, 10);
        let playerNum = parseInt(e.target.name.split(': ')[3], 10) + 1;
        let holeNum = parseInt(e.target.name.split(': ')[1], 10) + 1;
        let newScore = 0;

        if (Number.isNaN(val)) {
            newScore = 0;
        } else {
            newScore = val;
        }

        console.log('player from array:', players[playerNum]);

        players[playerNum].score[holeNum].value = newScore;


        console.log('players:', players);

        this.setState({
            players,
        });

        // console.log('state:', this.state);
    };

    render() {
        let props = this.props;

        return (
            <div className='table-responsive'>
                <table className='table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th></th>
                            {this.getTotalHoles(props.number_of_holes)}
                            <th>Par</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getPlayerRows(props.number_of_players)}
                    </tbody>
                </table>
            </div>
        );
    };
};
