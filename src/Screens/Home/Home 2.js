import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import './Home.css';
class Home extends React.Component {
    render() {
      return <div>
             <NavBar state={0}> </NavBar>
             <h1>Purdue Circle</h1>
             </div>;

    }
  }

  export default Home;