import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import styles from './Comment.module.css';
import axios from 'axios';

function Comment(props) {

    let navigate = useNavigate();

    function goToAuthor() {
        navigate(`/profile/${props.author_id}`);
    }

    function goToComment() {
        navigate(`/post/${props.commentid}`);
    }

    return (<div className={styles.goldWrapper}>
            <div className={styles.header}>
                <a id="author" className={styles.author} onClick={goToAuthor}>{props.author}</a>
            </div>
            <div className={styles.body}>
                <a className={styles.text} onClick={goToComment}>{props.text}</a>
            </div>
        </div>);
}

export default Comment;