import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import styles from './Home.module.css';
import {Link} from "react-router-dom";
import SmallPost from "../Components/SmallPost/SmallPost";

class Home extends React.Component {
    render() {
      return (
        <div className={styles.background}>
          <div className={styles.backgroundDesign}>
            <div className={styles.NavBar}>
              <NavBar state={1}> </NavBar>
            </div>
            <div className={styles.postBox}>
{/* use table functionality to split the post box into 2 halves */}
              <SmallPost />
            </div>
          </div>
        </div>
      );

    }
  }

  export default Home;