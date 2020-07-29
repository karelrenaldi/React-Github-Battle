import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from "react-icons/fa";
import { Card } from "./Card";
import Loading from "./Loading";
import Tooltip from "./Tooltip";

LanguagesNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
}

function LanguagesNav({ selectedLanguage, updateLanguage }) {
  console.log(selectedLanguage);
  const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];

  return(
    <ul className = "flex-center navbar-list space-around">
      {languages.map((language) => (
        <li 
          key = {language}
          className = "btn-clear nav-link"
          style = {language === selectedLanguage ? {backgroundColor: "tomato", padding: ".5em 1.5em", borderRadius: "1em"} : null}
          onClick = {async () => updateLanguage(language).catch((err) => {
            this.setState({ error: err })
          })}
        >
          {language}
        </li>
      ))}
    </ul>
  )
}

function RepositoryGrid({ repos }){
  return (
    <ul className = "grid space-around">
      {
        repos.map((repo, index) => {
          const { name, owner, html_url, stargazers_count, forks, open_issues } = repo;
          const { login, avatar_url } = owner;

          return (
            <li key = { index } className = "card">
              <Card
                href = {html_url}
                username = {login}
                src = {avatar_url}
                header = {`# ${index + 1}`}
              >
                  <ul className='card-list'>
                    <Tooltip text = "Github Username">
                      <FaUser color='rgb(255, 191, 116)' size={22} />
                      <a href={`https://github.com/${login}`}>
                        {login}
                      </a>
                    </Tooltip>

                    <li>
                      <FaStar color='rgb(255, 215, 0)' size={22} />
                      {stargazers_count.toLocaleString()} stars
                    </li>

                    <li>
                      <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                      {forks.toLocaleString()} forks
                    </li>

                    <li>
                      <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                      {open_issues.toLocaleString()} open
                    </li>
                  </ul>
              </Card>
            </li>
          )
        })
      }
    </ul>
  )
}

export default class Popular extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      selectedLanguage: "All",
      repos: {},
      error: null,
    }

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  async updateLanguage(language){
    const { repos } = this.state;

    this.setState({
      selectedLanguage: language,
      error: null,
    })

    if(!repos[language]) {
      const data = await fetchPopularRepos(language);
      this.setState(({ repos }) => (
        {
          repos: {
            ...repos,
            [language] : data,
          }  
        }
      ))
    }
  }

  // first fetching data
  async componentDidMount(){
    await this.updateLanguage(this.state.selectedLanguage);
  }

  // loading
  loading(){
    const { repos, selectedLanguage, error } = this.state;
    return !repos[selectedLanguage] && error === null;
  }

  render(){
    const { repos, selectedLanguage, error } = this.state;
    return (
      <React.Fragment>
        <LanguagesNav 
          selectedLanguage = { selectedLanguage }
          updateLanguage = { this.updateLanguage }
        />

        { this.loading() && <Loading text = "Fetching Repos"/> }
        { error && <h1>{error}</h1> }
        { repos[selectedLanguage] && <RepositoryGrid repos = { repos[selectedLanguage] }/> }

      </React.Fragment>
    )
  }
}