import React from "react";
import Popup from "react-popup";
import styles from './PopUp.module.css';
import { renderMatches } from "react-router-dom";

export default class PopUp extends React.Component {
    handleClick = () => {
        this.props.toggle();
    };

    render() {
        return (
            <div className={styles.popupBox}>
                <div className={styles.modalContent}>
                    <span className={styles.close} onClick={this.handleClick}>
                        &times;
                    </span>
                    <h1>
                        Edit Profile
                    </h1>
                    
                </div>
            </div>
        );
    }
}