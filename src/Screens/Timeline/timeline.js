import React, { useEffect, useState } from 'react'
import styles from './timeline.module.css';
import axios from 'axios';
import NavBar from '../Components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import SmallPost from "../Components/SmallPost/SmallPost";

function Timeline(props) {
  
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  let navigate = useNavigate();
  
  function handleClick(id) {
    navigate(`/posts/id=${id}`);
  }

  function get_id_from_cookie() {
    if (document.cookie.split('; ').map(cookie => cookie.split('=')).find(cookie => cookie[0] === 'id') == undefined) {
        return ""; 
    }
    return document.cookie.split('; ').map(cookie => cookie.split('=')).find(cookie => cookie[0] === 'id')[1];
}

  useEffect(() => { 
    if (!loaded) {
      axios({
        method: 'get',
        url: `http://purduecirc.herokuapp.com/api/users/getTimeline/user_id=${get_id_from_cookie()}`,
    }).then(res => { 
        setPosts(res.data.data)
        console.log(res.data.data);
        setLoaded(true);
    }).catch(error => {
        console.log(error);
    })
    }
  })  
  
  return (
        <div className={styles.background}>
          <div className={styles.backgroundDesign}>
            <div className={styles.NavBar}>
                <NavBar state={1}> </NavBar>
            </div>
            <div className={styles.whiteWrapper} >
                <p className={styles.timelineTitle}>My Timeline</p>
                {
                  posts.map(function(post, index) {
                    return (<SmallPost key={index} author_id={post.user_id} author={post.authorname} postid={post.post_id} title={post.title} text={post.text} onClick={handleClick}/>)
                  })
                }
            </div>
          </div>
        </div>
    );
}

export default Timeline;