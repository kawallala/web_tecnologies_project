import React from 'react';
import './States.css';
import Header from '../header/Header'

/**
 * Define States, a React componment of CS142 project #4 problem #2.  The model
 * data for this view (the state names) is available
 * at window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    //console.log('window.cs142models.statesModel()', window.cs142models.statesModel());
    this.state = {
      states: window.cs142models.statesModel(),
      filtered_states: window.cs142models.statesModel(),
    };
  }

  onSearch(searchString){
    this.setState({filtered_states: 
      this.state.states.filter(state => state.toLowerCase().includes(searchString.toLowerCase()))
    });
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="container">
          {/*Replace this with the code for CS142 Project #4, Problem #2*/}
          <div>
            <input placeholder = "Search" onChange = {(e)=>this.onSearch(e.target.value)} />
          </div>
          <div>
            <h2>These States match your request</h2>
            {this.state.filtered_states.length !== 0 ? 
              <ul>
                {this.state.filtered_states.map(
                  state=>{
                    return (<li key = {state}>{state}</li>)
                })}
              </ul>
              :
              <p>
                No States match your Request!
              </p>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default States;
