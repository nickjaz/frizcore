import React, { Component } from 'react';
import ScoreTable from './score-table';
import './style.css'

export default class ScoreCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            number_of_players: 1,
            number_of_holes: '9',
            par: '',
            start_game: false,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let val = e.target.value;
        let key = e.target.name;

        this.setState({
            [key]: val,
        });
    }

    getParFilters = (num) => {
        let parFilters = [];

        parFilters.push(
            <option value={4 * num}>Beginner: {4 * num}</option>,
            <option value={3 * num}>Advanced: {3 * num}</option>,
        );

        return parFilters;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if(!this.state.start_game) {
            this.setState({
                start_game: true,
            });
        } else {
            this.setState({
                number_of_holes: 9,
                number_of_players: 1,
                par: '',
                start_game: false,
            })
        }
    }

    render() {
        let state = this.state;

        return (
            <div className='container'>
                <h3>Score Card</h3>
                <div className='top-bar'>
                    <form className='form' onSubmit={this.handleSubmit}>
                        <div className='row'>
                            <div className='form-group col'>
                                <label>{'Number of players'}</label>
                                <select name='number_of_players'
                                        className='form-control'
                                        onChange={this.handleChange}
                                        value={state.number_of_players}
                                        disabled={state.start_game}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                            </div>
                            <div className='form-group col'>
                                <label>{'Number of holes'}</label>
                                <select name='number_of_holes'
                                        className='form-control'
                                        onChange={this.handleChange}
                                        value={state.number_of_holes} disabled={state.start_game}>
                                    <option value={9}>9</option>
                                    <option value={18}>18</option>
                                </select>
                            </div>
                            <div className='form-group col'>
                                <label>{'Par'}</label>
                                <select name='par'
                                        className='form-control'
                                        onChange={this.handleChange}
                                        value={state.par}
                                        disabled={state.start_game}
                                        required={true}>
                                    <option value='' disabled selected>Select one...</option>
                                    {this.getParFilters(state.number_of_holes)}
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <button className='btn btn-block mb-2' type='submit'>{ state.start_game ? 'New Game' : 'Start Game' }</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    {state.start_game &&
                        <ScoreTable
                            number_of_holes={state.number_of_holes}
                            number_of_players={state.number_of_players}
                            par={state.par}
                        />
                    }
                </div>
            </div>
        )
    }
}