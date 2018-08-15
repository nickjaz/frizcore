
import React, { Component } from 'react';
import { times } from 'lodash';

export default class PlayerRow extends Component {
    constructor(props) {
        super(props)

        this.getHoles = this.getHoles.bind(this);
    }

    getHoles(number_of_holes) {
        let holes = [];
        let {player_num, updateScore } = this.props;

        times(number_of_holes, (n) => {
            holes.push(
                <td>
                    <input  name={`hole: ${n}: player: ${player_num}`}
                            type='number'
                            min='1'
                            placeholder='-'
                            className='text-center hole'
                            onChange={(e) => updateScore(e)}
                    />
                </td>
            );
        });

        return holes;
    };

    render() {
        let {player_num, number_of_holes} = this.props;

        return (
            <tr>
                <td className='player'>
                    <input  type='text'
                            placeholder={'Player ' + (player_num + 1)}
                            name='name'
                            className='text-center'
                        />
                </td>
                {this.getHoles(number_of_holes)}
                <td></td>
                <td></td>
            </tr>
        );
    };
};
