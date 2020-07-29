import React from "react";
import PropTypes from "prop-types";

// export default class State extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       name: "Karel",
//     }
//     this.updateName = this.updateName.bind(this);
//   }

//   updateName(){
//     if(this.state.name === "Karel"){
//       this.setState({
//         name: "Mikenzi"
//       })
//     }else{
//       this.setState({
//         name: "Karel"
//       })
//     }
//   }

//   render(){
//     return (
//       <>
//         <h1>Hello, {this.state.name}</h1>
//         <button onClick = {this.updateName}>Change Name</button>
//       </>
//     )
//   }
// }

// State Practice 1
// export default class State extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       mode: 'light'
//     }

//     this.handleLightMode = this.handleLightMode.bind(this);
//     this.handleDarkMode = this.handleDarkMode.bind(this);
//   }
//   handleLightMode() {
//     // Change 'mode' on the component's state to 'light'
//     this.setState({
//       mode: "light"
//     });
//   }
//   handleDarkMode() {
//     // Change 'mode' on the component's state to 'dark'
//     this.setState({
//       mode: "dark"
//     });
//   }
//   render() {
//     const { mode } = this.state

//     return (
//       <div style={{
//         height: "100vh",
//         background: mode === 'light' ? '#fff' : '#000'
//       }}>
//         {mode === 'light'
//           ? <button onClick={this.handleDarkMode}>Dark Mode</button>
//           : <button onClick={this.handleLightMode}>Light Mode</button>}
//       </div>
//     )
//   }
// }

// State Practice 2

// class Count extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       count: 0
//     };

//     this.increment = this.increment.bind(this);
//     this.decrement = this.decrement.bind(this);
//   }
//   increment() {
//     // Increment count by 1
//     this.setState(({count}) => {
//       return {
//         count: count + 1
//       };
//     });
//   }
//   decrement() {
//     // Decrement count by 1
//     this.setState(({count}) => {
//       return {
//         count: count - 1
//       };
//     });
//   }
//   render() {
//     return (
//       <div>
//         <button onClick={this.decrement}>-</button>
//         <span>{this.state.count}</span>
//         <button onClick={this.increment}>+</button>
//       </div>
//     );
//   }
// }

function HelloFunc ({name}) {
  console.log(name);
  return <h1>Hello {name}</h1>
}

HelloFunc.propTypes = {
  name: PropTypes.string.isRequired,
}

export default class Hello extends React.Component {
  render(){
    const name = "Karel";
    return (
      <>
        <HelloFunc name = {name}/>
      </>
    )
  }
}