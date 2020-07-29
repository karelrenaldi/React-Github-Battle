import React from "react";
import PropTypes from "prop-types";

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  }
}

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.text,
    }
  }

  componentDidMount() {
    this.interval = window.setInterval(() => {
      this.state.content === `${this.props.text}...`
        ? this.setState({content: this.props.text})
        : this.setState(({content}) => ({content: content + "."}))
    }, this.props.time); 
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return(
      <p style = {styles.content}>
        {this.state.content}
      </p>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
}

Loading.defaultProps = {
  text: "Loading",
  time: 300,
}