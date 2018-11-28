import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from './Header';

const Dashboard = () => <h2>Dashboard</h2>;
const NewPost = () => <h2>New Post</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends Component {
  render() {
    return (
      <div className="name">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path='/' component={Landing} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/posts/new' component={NewPost} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;