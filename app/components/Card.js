import React from "react";

export function Card( { header, src, username, href, children } ) {
  return (
    <div className = "card bg-light">
      <h4 className = "header-lg center-text">
        {header}
      </h4>

      <img
        className = "avatar"
        src = {src}
        alt = {`Avatar for ${username}`}
      />

      <h2 className = "center-text">
        <a className = "link" href = {href}>
          {username}
        </a>
      </h2>

      {children}
    </div>
  )
}