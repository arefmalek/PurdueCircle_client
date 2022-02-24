import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './SmallPost.module.css';
function SmallPost(props) {

      let navigate = useNavigate();

      const [author, setAuthor] = useState("");
      const [loaded, setLoaded] = useState(false);

    function goToAuthor() {
        navigate(`/profile/${props.author_id}`);
    }

    function goToPost() {
        navigate(`/post/${props.postid}`);
    }


    return (<div className={styles.goldWrapper}>
        <div className={styles.header}>
            <a id="title" className={styles.title} onClick={goToPost}>{props.title}</a>
            <a id="author" className={styles.author} onClick={goToAuthor}>{props.author}</a>
        </div>
        <div className={styles.body}>
            <a className={styles.text} onClick={goToPost}>{props.text}</a>
        </div>
    </div>);
}

export default SmallPost;