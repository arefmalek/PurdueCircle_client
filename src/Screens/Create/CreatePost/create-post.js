import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import styles from './create-post.module.css';
import axios from 'axios';
import NavBar from '../../Components/NavBar/NavBar';

function CreatePost(props) {
    
    const [posts, setPosts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [topic_name, setTopicName] = useState("");

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(""); 

    let navigate = useNavigate();


    function get_id_from_cookie() {
        if (document.cookie.split('; ').map(cookie => cookie.split('=')).find(cookie => cookie[0] === 'id') == undefined) {
            return ""; 
        }
        return document.cookie.split('; ').map(cookie => cookie.split('=')).find(cookie => cookie[0] === 'id')[1];
    }

    function submitPost() {
        axios({
            method: 'post',
            url: `http://purduecirc.herokuapp.com/api/posts/create_post`,
            data: {
                user_id: parseInt(get_id_from_cookie()),
                topic_name: topic_name,
                title: title, 
                text: text
            }
        }).then(res => { 
            console.log(res);
            if (res.data.data === "Failed") {
                setError(true)
                setErrorMsg(res.data.message);
            } else {
                navigate(`/profile/${get_id_from_cookie()}`);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    function updateTopic(e) {
        setTopicName(e.target.value);
    }

    function updateTitle(e) {
        setTitle(e.target.value);
    }

    function updateText(e) {
        setText(e.target.value);
    }
    
    return (
        <div className={styles.background}>
          <div className={styles.backgroundDesign}>
            <div className={styles.NavBar}>
                <NavBar state={1}> </NavBar>
            </div>
            <div className={styles.createPostBox}> 
                <p className={styles.createPostTitle}>Create a Post</p>
                <input type="text" className={styles.titleTextBox} onChange={updateTopic} placeholder="Topic"/><br></br>
                <input type="text" className={styles.titleTextBox} onChange={updateTitle} placeholder="Title"/><br></br> 
                <textarea className={styles.postContent} onChange={updateText} placeholder="Write the post content..."></textarea><br></br>
                <button className={styles.postSubmit} onClick={submitPost}>Post</button>
            </div>
            <div className={styles.errorBox}>
                <p className={styles.invalidText}>Failed to create post!</p>
            </div>
          </div>
        </div>
    );
}

export default CreatePost;