import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/auth.service";


export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">aspReactTest</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                </NavItem> */}
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/playlistsold">Playlists Old</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/photostocks">Photo Stocks</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/playlists">Playlists</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/add">Add</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/home">Home2</NavLink>
                </NavItem>

                {showModeratorBoard && (
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/mod">Moderator Board</NavLink>
                  </NavItem>
                )}
                {showAdminBoard && (
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/admin">Admin Board</NavLink>
                  </NavItem>
                )}
                {currentUser && (
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/user">User</NavLink>
                  </NavItem>
                )}
                {currentUser ? (
                  <div className="navbar-nav ml-auto">
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/profile">{currentUser.username}</NavLink>
                    </NavItem>
                    <NavItem>
                      <a href="/login" className="nav-link" onClick={this.logOut}>
                        LogOut
                      </a>
                      {/* <NavLink tag={Link} className="text-dark" to="/login">Logout</NavLink> */}
                    </NavItem>
                  </div>
                ) : (
                  <div className="navbar-nav ml-auto">
                    <NavItem className="nav-item">
                      <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                      <NavLink tag={Link} className="text-dark" to="/register">Sign Up</NavLink>
                    </NavItem>
                  </div>
                )}

              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
