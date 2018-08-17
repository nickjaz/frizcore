
import React, { Component } from 'react';
import { times } from 'lodash';

export default class PlayerRow extends Component {
    constructor(props) {
        super(props)

        this.getHoles = this.getHoles.bind(this);
    }

    getHoles(number_of_holes) {
        let holes = [];
        let { player_num, updateScore } = this.props;

        times(number_of_holes, (n) => {
            holes.push(
                <td>
                    <input  name={`hole: ${n + 1}: player: ${player_num}`}
                            type='number'
                            min='1'
                            max='9'
                            placeholder='-'
                            className='score-input'
                            onChange={(e) => updateScore(e, n, player_num)}
                        />
                </td>
            );
        });

        return holes;
    };

    getParColor = (overPar) => {
        if (overPar > 0 ) {
            return 'text-danger';
        } else if (overPar < 0) {
            return 'text-success';
        } else {
            return;
        }
    }

    render() {
        let { player_num, number_of_holes, totalScore, overPar } = this.props;

        return (
            <tr className='score-row'>
                <td className='player'>
                    <input  type='text'
                            placeholder={'Player ' + player_num}
                            name='name'
                            className='player-input'
                        />
                </td>
                {this.getHoles(number_of_holes)}
                <td className={this.getParColor(overPar)}>{ overPar <= 0 ? overPar : '+' + overPar}</td>
                <td>{totalScore}</td>
            </tr>
        );
    };
};
