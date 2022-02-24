import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './NavBar.module.css';
function NavBar(props){
  
  let navigate = useNavigate();

  function get_id_from_cookie() {
    if (document.cookie.split('; ').map(cookie => cookie.split('=')).find(cookie => cookie[0] === 'id') == undefined) {
        return ""; 
    }
    return document.cookie.split('; ').map(cookie => cookie.split('=')).find(cookie => cookie[0] === 'id')[1];
  }

  function goToProfile() {
      navigate(`/profile/${get_id_from_cookie()}`)
  }

  function goToLogin() {
    navigate(`/login`)
  }

  if (get_id_from_cookie() != "") { 
    return (<div className={styles.topnav}>
            <link rel="stylesheet" href="./css/bootstrap.min.css"></link>
            <a className={styles.homeButton} href="/home">
              <img className={styles.purdueLogo} src={require("./purdueIcon.png")}/>
            </a>
            <input type="text" className={styles.searchBox} placeholder="Search" />
            <a className={styles.topbuttons} onClick={goToLogin}>Log Out</a>
            <a className={styles.topbuttons} href="/settings">Settings</a>
            <a className={styles.topbuttons} onClick={goToProfile}>My Profile</a>
             </div>);
    }

    return (<div className={styles.topnav}>
            <a className={styles.homeButton} href="/home">
              <img className={styles.purdueLogo} src={require("./purdueIcon.png")}/>
            </a>
            <input type="text" className={styles.searchBox} placeholder="Search" />
             <link rel="stylesheet" href="./css/bootstrap.min.css"></link>
             <a className={styles.topbuttons} href="/signup">Sign Up</a>
             <a className={styles.topbuttons} href="/login">Login</a>
             </div>);

      
    }

  export default NavBar;