import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userNav = (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Food4Fuel</Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
          </ul>
          <div className="collapse navbar-collapse">
          </div>
        </div>
      </nav>
    );

    const guestNav = (
      <nav id="landingNav" className="navbar navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/signup">Sign up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
          <div className="collapse navbar-collapse">
          </div>
        </div>
      </nav>
    );

    return (
      <div>
      { isAuthenticated ? userNav : guestNav }
      </div>
    );
  }
}

NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
