import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from './Post.module.css';
import axios from 'axios';
import NavBar from '../Components/NavBar/NavBar';

import Comment from "../../Screens/Components/Comment/Comment"

function Post(props) {
    let navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [author, setAuthor] = useState("");
    const [authorId, setAuthorId] = useState(0);
    const [content, setContent] = useState("");
    const [liked, setLiked] = useState(false);
    const [reposted, setReposted] = useState(false);
    const [postId, setPostId] = useState(0); 
    const [loaded, setLoaded] = useState(false);


    function get_id_from_cookie() {
        if (document.cookie.split('; ').map(cookie => cookie.split('=')).find(cookie => cookie[0] === 'id') == undefined) {
            return ""; 
        }
        return document.cookie.split('; ').map(cookie => cookie.split('=')).find(cookie => cookie[0] === 'id')[1];
      }

    useEffect(() => {
        if (!loaded) {
            let thisPostId = window.location.pathname.split("/")[2];
            setPostId(window.location.pathname.split("/")[2]);
            let id = get_id_from_cookie();

            axios({ 
                method: 'get',
                url: `http://localhost:5000/api/posts/id=${thisPostId}`,
            }).then(res => {
                if (res.data.data != "Failed") {
                    setTitle(res.data.title);
                    setTopic(res.data.topicname);
                    setAuthor(res.data.username);
                    setAuthorId(res.data.user_id)
                    setContent(res.data.text);
                } 
            }).catch(error => {
                console.log(error);
            });

            axios({ 
                method: 'get',
                url: `http://localhost:5000/api/posts/checkLikedPost/user_id=${id}/post_id=${thisPostId}`,
            }).then(res => {
                console.log(res.data.liked);
                if (res.data.data != "Failed") {
                    setLiked(res.data.liked);
                } 
            }).catch(error => {
                console.log(error);
            });

            axios({ 
                method: 'get',
                url: `http://localhost:5000/api/posts/checkRepostedPost/user_id=${id}/post_id=${thisPostId}`,
            }).then(res => {
                if (res.data.data != "Failed") {
                    setReposted(res.data.reposted);
                } 
            }).catch(error => {
                console.log(error);
            });

            setLoaded(true);
            setPostId(thisPostId);
        }
    })

    function submitLike() {
        axios({ 
            method: 'get',
            url: `http://localhost:5000/api/posts/likePost`,
            data: {
                user_id: authorId,
                post_id: postId
            }
        }).then(res => {
            if (res.data.data != "Failed") {
                setLiked(res.data.liked);
            } 
        }).catch(error => {
            console.log(error);
        });
        navigate(`/post/${postId}`);
    }

    function submitRepost() {
        axios({ 
            method: 'get',
            url: `http://localhost:5000/api/posts/repostPost`,
            data: {
                user_id: authorId,
                post_id: postId
            }
        }).then(res => {
            if (res.data.data != "Failed") {
                setReposted(res.data.reposted);
            } 
        }).catch(error => {
            console.log(error);
        });
        navigate(`/post/${postId}`);
    }

    function goToUser() {
        navigate("/profile/" + author);
    }
    
    return (
    <div className={styles.background}>
        <div className={styles.backgroundDesign}>
            <NavBar />
            <div className={styles.whiteWrapper}>
                <div className={styles.postWrapper}>
                    <div className={styles.postHeader}>
                        <p className={styles.headerText}>{title}</p>
                        <p className={styles.topicText}>{topic}</p>
                    </div>
                    <div>
                        <a className={styles.authorText} onClick={goToUser}>{author}</a>
                    </div>
                    <div className={styles.postContent}>
                        <p>{content}</p>
                    </div>
                    <div className={styles.interactionsHub}>
                        <button className={styles.like} onClick={submitLike}>
                            {
                                liked ?
                                "Unlike" :
                                "Like"
                            }
                        </button>
                        <button className={styles.repost} onClick={submitRepost}>
                            {
                                reposted ?
                                "Reposted" :
                                "Repost"
                            }
                        </button>
                    </div>
                    <div className={styles.comments}>
                        {Comment.map(function(comments, index) {
                            return (<Comment key={index} author_id={comments.user_id} author={comments.authorname} postid={comments.comment_id} text={comments.text}/>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Post;