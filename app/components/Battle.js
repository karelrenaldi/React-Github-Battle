import React from "react";
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle, FaRoad } from "react-icons/fa";
import PropTypes from "prop-types";
import Results from "./Results"
import { ThemeContext } from "../context/theme";
import { Link } from "react-router-dom";

function Instructions () {
  return (
    <div className = "instructions-container">
      <h1 className = "center-text header-lg">Instructions</h1>
      <ol className = "container-sm-grid center-text battle-instructions row">
          <li>
            <h3 className = "header-sm">Enter Two Github Users</h3>
            <FaUserFriends className = "bg-light" color = "rgb(255, 191, 116)" size = {140} />
          </li>
          
          <li>
            <h3 className = "header-sm">Battle</h3>
            <FaFighterJet className = "bg-light" color = "#727272" size = {140} />
          </li>

          <li>
            <h3 className = "header-sm">See The Winners</h3>
            <FaTrophy className = "bg-light" color = "rgb(255, 215, 0)" size = {140} />
          </li>
      </ol>
    </div>
  )   
}

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  handleChange({ currentTarget }) {
    this.setState({
      username: currentTarget.value,
    })  
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <form className="column player" onSubmit={this.handleSubmit}>
            <label htmlFor='username' className='player-label'>
              {this.props.label}
            </label>
            <div className='row player-inputs'>
              <input
                type='text'
                id='username'
                className= {`input-${theme}`}
                placeholder='github username'
                autoComplete='off'
                value={this.state.username}
                onChange={this.handleChange}
              />
              <button
                className ='btn dark-btn'
                type ='submit'
                disabled = {!this.state.username}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </ThemeContext.Consumer>
    )
  }
}

PlayerInput.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

function PlayerReview({ username, onReset, label }) {
  return(
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className = "column player">
          <h3 className = "player-label">{label}</h3>

          <div className = {`row bg-${theme}`}>
            <div className = "player-info">
              <img 
                className = "avatar-small"
                src = {`https://github.com/${username}.png?size=200`}
                alt = {`Avatar for ${username}`}
              />
              <a
                className = "link"
                href = {`https://github.com/${username}`}
              >
                {username}
              </a>
            </div>
            <button className = "btn-clear flex-center" onClick = {onReset}>
              <FaTimesCircle color = "rgb(194, 57, 42)" size = {26} />
            </button>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}

PlayerReview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOne: null,
      playerTwo: null,
      battle: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.resetBattle = this.resetBattle.bind(this);
  }

  handleSubmit(id, player) {
    this.setState({
      [id]: player,
    })
  }

  handleReset(id) {
    this.setState({
      [id]: null,
    })
  }

  resetBattle() {
    this.setState({
      playerOne: null,
      playerTwo: null,
    });
  }

  render() {
    const { playerOne, playerTwo } = this.state;
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <React.Fragment>
              {/* Instructions */}
              <Instructions />
              {/* Players */}
              <div className = "players-container">
                <h1 className = "center-text header-lg">Players</h1>
                <div className = "row space-around">
                  { !playerOne 
                    ? 
                      <PlayerInput 
                        label = "Player-One" 
                        onSubmit = { (player) => this.handleSubmit("playerOne", player) }
                      />
                    :
                      <PlayerReview username = { playerOne } label = "player-one" onReset = { () => this.handleReset("playerOne") }/>
                  }
                  { !playerTwo
                    ?
                      <PlayerInput 
                        label = "Player-Two" 
                        onSubmit = { (player) => this.handleSubmit("playerTwo", player) }
                      /> 
                    :
                      <PlayerReview username = { playerTwo } label = "player-one" onReset = { () => this.handleReset("playerTwo") }/>
                  }
                </div>
                {playerOne && playerTwo && 
                  (<Link 
                      className = {`btn ${theme}-btn btn-space`} 
                      to = {{
                        pathname : "/battle/results",
                        search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                      }}>
                        Battle
                  </Link>)
                }
              </div>
          </React.Fragment>
        )}
      </ThemeContext.Consumer>
    )
  }
}