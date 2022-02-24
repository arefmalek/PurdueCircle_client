import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import styles from './topic.module.css';
import axios from 'axios';
import NavBar from '../Components/NavBar/NavBar';
import SmallPost from "../Components/SmallPost/SmallPost";

function Topic(props) {
  
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [topicName, setTopicName] = useState("")
  const [followed, setFollowed] = useState(false)

  let navigate = useNavigate();

  function handleClick(id) {
      navigate(`/posts/id=${id}`);
  }

  function submitEditProfile() {
      navigate('/edit_profile')
  }

  function get_id_from_cookie() {
    if (document.cookie.split('; ').map(cookie => cookie.split('=')).find(cookie => cookie[0] === 'id') == undefined) {
        return ""; 
    }
    return document.cookie.split('; ').map(cookie => cookie.split('=')).find(cookie => cookie[0] === 'id')[1];
  }

  useEffect(() => {
    if (!loaded) {
        setTopicName(window.location.pathname.split("/")[2])
        let id = get_id_from_cookie();
        axios({
            method: 'get',
            url: `http://localhost:5000/api/users/getTopicline/topicname=${window.location.pathname.split("/")[2]}`,
        }).then(res => { 
            setPosts(res.data.data);
            console.log(res.data.data)
            setLoaded(true);
        }).catch(error => {
            console.log(error);
        })
        axios({
            method: 'get',
            url: `http://localhost:5000/api/users/checkFollowedTopic/user_id=${id}/topicname=${window.location.pathname.split("/")[2]}`, 
        }).then(res => { 
            setFollowed(res.data.followed);
            console.log(res.data.data)
        }).catch(error => {
            console.log(error);
        })
    }
})

function followTopic() {
    let topicname = window.location.pathname.split("/")[2];
    let id = parseInt(get_id_from_cookie());
    axios({
        method: 'post',
        url: `http://localhost:5000/api/users/followTopic`,
        data: {
            user_id: id,
            topicname: topicname
        } 
    }).then(res => { 
        setFollowed(res.data.followed);
        console.log(res.data.data)
    }).catch(error => {
        console.log(error);
    })
    navigate(`/topic/${topicname}`)
}

function makeAPost() {
    navigate(`/createPost`)
}
  
  return (
        <div className={styles.background}>
          <div className={styles.backgroundDesign}>
            <div className={styles.NavBar}>
                <NavBar state={1}> </NavBar>
            </div>
            <div className={styles.whiteWrapper}>
                <p className={styles.topicTitle}>{topicName}</p>
                <div>
                <button className={styles.editProfileButton} onClick={followTopic}>{followed?"Unfollow":"Follow"}</button>
                <button className={styles.editProfileButton} onClick={makeAPost}>Make a Post</button>
            </div>
            <div className={styles.smallPosts}>
                    {
                        posts.map(function(post, index) {
                            return (<SmallPost key={index} author_id={post.user_id} author={post.authorname} postid={post.post_id} title={post.title} text={post.text} onClick={handleClick}/>)
                        })
                    }
            </div>
            </div>
          </div>
        </div>
    );
}

export default Topic;