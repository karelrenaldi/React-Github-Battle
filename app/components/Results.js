import React from "react";
import { battle } from "../utils/api";
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from "react-icons/fa";
import { Card } from "./Card";
import Loading from "./Loading";
import Tooltip from "./Tooltip";
import queryString from 'query-string';
import { Link } from "react-router-dom";

function ProfileList({ profile }) {
  return(
    <ul className='card-list'>
      <li>
        <FaUser color='rgb(239, 115, 115)' size={22} />
        {profile.name}
      </li>

      {profile.location && (
        <Tooltip text = "User's Location">
          <FaCompass color='rgb(144, 115, 255)' size={22} />
          {profile.location}
        </Tooltip>
      )}

      {profile.company && (
        <Tooltip text = "User's Company">
          <FaBriefcase color='#795548' size={22} />
          {profile.company}
        </Tooltip>
      )}

      <li>
        <FaUsers color='rgb(129, 195, 245)' size={22} />
        {profile.followers.toLocaleString()} followers
      </li>

      <li>
        <FaUserFriends color='rgb(64, 183, 95)' size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  )
}


export default class Results extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    }
  }

  async componentDidMount() {
    try {
      const [ winner, loser ] = await battle(queryString.parse(this.props.location.search));
      this.setState({
        winner,
        loser,
        loading: false,
      });
    }catch({ message }) {
      this.setState({
        error: message,
        loading: false,
      })
    }
  }

  render() {
    const { winner, loser, loading, error } = this.state;

    if(loading) {
      return (
        <Loading text = "BATTLE"/>
      )
    }else if(error) {
      return (
        <h3 className = "center-text error">Players {error}</h3>
      )
    }else {
      return (
        <>
        <div className = "grid space-around container-sm">
            <Card 
              href = {winner.profile.html_url}
              username = {winner.profile.login}
              src = {winner.profile.avatar_url}
              header = {winner.score === loser.score ? "Tie" : "Winner"}
            >
              <ProfileList profile = {winner.profile}/>
            </Card>

            <Card
              href = {loser.profile.html_url}
              username = {loser.profile.login}
              src = {loser.profile.avatar_url}
              header = {winner.score === loser.score ? "Tie" : "Winner"}
            >
              <ProfileList profile = {loser.profile}/>
            </Card>
        </div>

        <Link 
          className = "btn dark-btn btn-space" 
          to = "/battle">
          RESET
        </Link>
        </>
      )
    }
  }
}