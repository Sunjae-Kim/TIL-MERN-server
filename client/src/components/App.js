import React, { Component } from "react";
import {connect} from "react-redux";

class App extends Component {
  render() {
    return <div>Happy Hacking</div>;
  }
}

const mapStateToProps = state => {
  return {
    
  }
};

export default connect(
  mapStateToProps
)(App);
