import React from "react";
import { ThemeContext } from "../context/theme";
import { Link } from "react-router-dom";

export default function Nav() {
  return(
    <ThemeContext.Consumer>
      { ({ theme, toggleTheme }) => (
        <nav className = "row space-between nav">
          <ul className = "row">
            <li><Link to = "/" className = "nav-link">Popular</Link></li>
            <li><Link to = "/battle" className = "nav-link">Battle</Link></li>
          </ul>

          <button
            style = {{fontSize: 30}}
            className = "btn-clear"
            onClick = {toggleTheme}
          >
            {theme === "light" ? "🔦" : "💡" }
          </button>
        </nav>
      ) }
    </ThemeContext.Consumer>
  )
}