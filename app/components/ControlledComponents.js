import React from "react";

export default class Coba extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ currentTarget }) {
    this.setState({
      email: currentTarget.value,
    })
  }

  handleSubmit() {
    alert(`Hello ${this.state.email}`);
  }

  render() {
    return (
      <div>
        <pre>The email is {this.state.email}</pre>
        <br />
        <input
          type='text'
          placeholder='Email'
          value={this.state.email}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}