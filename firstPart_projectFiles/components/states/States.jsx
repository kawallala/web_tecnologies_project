import React from "react";
import "./States.css";

/**
 * Define States, a React componment of CS142 project #4 problem #2.  The model
 * data for this view (the state names) is available
 * at window.cs142models.statesModel().
 */
class States extends React.Component {
    constructor(props) {
        super(props);
        console.log(
            "window.cs142models.statesModel()",
            window.cs142models.statesModel()
        );
        this.state = {
            states: window.cs142models.statesModel(),
            substring: "",
            results: window.cs142models.statesModel(),
        };
        console.log(this.state.states[0]);
    }
    handleSubstringChange = (event) => {
        this.setState({
            substring: event.target.value,
            results: this.state.states.filter(state => state.includes(event.target.value))
        });
    };
    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.substring}
                    onChange={this.handleSubstringChange}
                ></input>
                <ul>
                    {this.state.results !== [] ? this.state.results.map((value, key) => (
                        <li key={key}>{value}</li>
                    )) : <div></div>}
                </ul>
            </div>
        );
    }
}

export default States;
