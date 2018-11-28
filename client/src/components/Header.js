import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {
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
                <a href="#">Login with GOOGLE</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
    mapStateToProps
)(Header);
