import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {
  renderLogin(){
    switch(this.props.auth){
      case null:
        return <span>Loading..</span>;
      case false:
        return <a href="/auth/google">Login with GOOGLE</a>;
      default:
        return <a href="/api/users/logout">Logout</a>;
    }
  }

  render() {
    return (
      <div className="Header">
        <nav>
          <div className="nav-warpper container">
            <a href="#" className="left brand-logo">
              Header
            </a>
            <ul className="right">
              <li>
                { this.renderLogin() }
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    auth: state.auth
  }
}

export default connect(
    mapStateToProps
)(Header);
