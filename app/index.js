import React from "react";
import ReactDOM from "react-dom";
import Popular from "./components/Popular";
import State from "./components/State";
import Battle from "./components/Battle";
import ControlledComponents from "./components/ControlledComponents";
import "./index.css";
import { ThemeContext } from "./context/theme";
import Nav from "./components/nav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Results from "./components/Results";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "light",
      toggleTheme: () => {
        this.setState(({ theme }) => ({ theme: theme === "light" ? "dark" : "light" }))
      }
    }
  }

  render() {
    return (
      <Router>
        <ThemeContext.Provider value = { this.state }>
          <div className = {`${ this.state.theme } app`} >
            <Nav />
            <div className = "container" >
              <Route exact path = "/" component = { Popular } />
              <Route exact path = "/battle" component = { Battle } />
              <Route path = "/battle/results" component = { Results }/>
            </div>
          </div>
        </ThemeContext.Provider>
      </Router>
    )
  }
}

// Render to the dom
ReactDOM.render(
  // React Element
  <App />,
  // Where to render to the element
  document.querySelector("#app")
);