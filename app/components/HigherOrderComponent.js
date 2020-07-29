import React from "react";

// Info
export default class Info extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      hovering: false,
    }
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver() {
    this.setState({
      hovering: true,
    })
  }

  mouseOut() {
    this.setState({
      hovering: false,
    })
  }

  render() {
    <div onMouseOver = {this.mouseOver} onMouseOut = {this.mouseOut}>
      { this.state.hovering ? <Tooltip/> : null }
      <svg></svg>
    </div>
  }
}

// TrendChart
export default class TrendChart extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      hovering: false,
    }
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver() {
    this.setState({
      hovering: true,
    })
  }

  mouseOut() {
    this.setState({
      hovering: false,
    })
  }

  render() {
    <div onMouseOver = {this.mouseOver} onMouseOut = {this.mouseOut}>
      { this.state.hovering ? <Tooltip/> : null }
      <Chart type = "trend"/>
    </div>
  }
}

// DailyChart
export default class DailyChart extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      hovering: false,
    }
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver() {
    this.setState({
      hovering: true,
    })
  }

  mouseOut() {
    this.setState({
      hovering: false,
    })
  }

  render() {
    <div onMouseOver = {this.mouseOver} onMouseOut = {this.mouseOut}>
      { this.state.hovering ? <Tooltip/> : null }
      <Chart type = "daily"/>
    </div>
  }
}

// Concept (Callbacks & Higher Order Functions)
function add(x, y) {
  return x + y;
} /* As a callback function */

function addFive(x, addReference /* addReference as function argument */) {
  return addReference(x, 5);
} /* As a higher order function */

addFive(10, add); // 15

// ==> With Vocab <==
function add(x, y) {
  return x + y;
}

function higherOrderFunction(x, callback) {
  return callback(x, 5);
}

higherOrderFunction(10, add);

// pattern
const arr = [1, 2, 3];
arr.map(item => item * 3); // map as higher order function and inside a map item as callback function

// What if i want make addTen, addTwenty, etc ?
function add(x, y) {
  return x + y;
}

function addFive(x, addReference) {
  return addReference(x, 5);
}

function addTen(x, addReference) {
  return addReference(x, 10);
}

function addTwenty(x, addReference) {
  return addReference(x, 20);
}

// Still repeating
function add(x, y) {
  return x + y;
}

function makeAdder(x, addReference) {
  return function(y) {
    return addReference(x, y);
  }
}

const addFive = makeAdder(5, add);
const addTen = makeAdder(10, add);
const addTwenty = makeAdder(20, add);

addFive(10); // 15
addTen(10); // 20
addTwenty(10); // 30

// Higher Order Components
function higherOrderComponents(Component) {
  return class extends React.Component {
    render() {
      return <Component />
    }
  }
}

// Final Implementation
function withHover(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        hovering: false,
      }
      this.mouseOver = this.mouseOver.bind(this);
      this.mouseOut = this.mouseOut.bind(this);
    }

    mouseOver() {
      this.setState({
        hovering: true,
      })
    }

    mouseOut() {
      this.setState({
        hovering: false,
      })
    }

    render() {
      <div onMouseOver = {this.mouseOver} onMouseOut = {this.mouseOut}>
        <Component hovering = {this.state.hovering}/>
      </div>
    }
  }
}