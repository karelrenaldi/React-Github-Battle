import React from "react";
import {
  Route,
  Link,
  BrowserRouter as Router,
} from "react-router-dom";

const Home = () => (
  <div>
    <h1>HOME</h1>
  </div>
);

const About = () => (
  <div>
    <h1>ABOUT</h1>
  </div>
);

const Topic = ({ match }) => {
  console.log(match);
  return(
    <h1>{ match.params.topicId }</h1>
  )
}

const Topics = ({ match }) => console.log(match) ||(
  <div>
    <h1>Topics</h1>
    <ul>
      <li><Link to = {`${match.url}/rendering`}>Rendering with React</Link></li>
      <li><Link to = {`${match.url}/components`}>Components</Link></li>
      <li><Link to = {`${match.url}/props-vs-state`}>Props vs State</Link></li>
    </ul>

    <Route exact path = "topics" render = {() => (<h3>Select A Topic</h3>)}/>
    <Route path = {`${match.url}/:topicId`} component = { Topic } />
  </div>

);

export default class RouterCoba extends React.Component {
  render() {
    return(
      <Router>
        <div>
          <ul>
            <li><Link to = "/">Home</Link></li>
            <li><Link to = "/about">About</Link></li>
            <li><Link to = "/topics">Topics</Link></li>
          </ul>
        </div>
         
        <hr/>
        
        <Route exact path = "/" component = { Home } />
        <Route path = "/about" component = { About } />
        <Route path = "/topics" component = { Topics } />
      </Router>
    )
  }
}