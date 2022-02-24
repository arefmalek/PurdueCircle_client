import React from "react";
import './NavBar.css';
class NavBar extends React.Component {
    render() {
      if (this.props.state === 1) { //1 = logged in
        return <div class="topnav">
            <a class="topbuttons" href="/login">Log Out</a>
            <a class="topbuttons" href="/settings">Settings</a>
            <a class="topbuttons" href="/profile">My Profile</a>
             </div>;
      }

      return <div class="topnav">
             <a class="topbuttons" href="/signup">Sign Up</a>
             <a class="topbuttons" href="/login">Login</a>
             </div>;

      
    }
  }

  export default NavBar;