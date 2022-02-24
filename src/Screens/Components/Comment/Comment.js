import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import styles from './Comment.module.css';
import axios from 'axios';

function Comment(props) {

    let navigate = useNavigate();

    function goToAuthor() {
        navigate(`/profile/${props.author_id}`);
    }

    return (<div className={styles.goldWrapper}>
            <div className={styles.header}>
                <a id="author" className={styles.author} onClick={goToAuthor}>{props.author}</a>
            </div>
            <div className={styles.body}>
                <p className={styles.text}>{props.comment}</p>
            </div>
        </div>);
}

export default Comment;