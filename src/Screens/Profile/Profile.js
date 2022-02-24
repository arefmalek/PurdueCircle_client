import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Profile.module.css';
import NavBar from "../Components/NavBar/NavBar";
import tempPicture from "./username-icon.png";
import axios from "axios";
import SmallPost from "../Components/SmallPost/SmallPost";

function Profile() {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [myPage, setMyPage] = useState(false);
    const [followed, setFollowed] = useState(false);
    const [posts, setPosts] = useState([]);

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
            let user_id = window.location.pathname.split("/")[2];
            let id = get_id_from_cookie();
            if (user_id == id) setMyPage(true);
            axios({
                method: 'get',
                url: `http://localhost:5000/api/users/id=${user_id}`, //TODO: don't get from cookie, get from id in the searchbar
            }).then(res => { 
                setUsername(res.data.username)
                setBio(res.data.bio);
                setLoaded(true);
            }).catch(error => {
                console.log(error);
            })
            axios({
                method: 'get',
                url: `http://localhost:5000/api/users/getUserline/user_id=${user_id}`, 
            }).then(res => { 
                setPosts(res.data.data);
                console.log(res.data.data)
                setLoaded(true);
            }).catch(error => {
                console.log(error);
            })
            if (!myPage) {
            axios({
                method: 'get',
                url: `http://localhost:5000/api/users/checkFollowedUser/user_id=${id}/user_id_2=${user_id}`, 
            }).then(res => { 
                setFollowed(res.data.followed);
                console.log(res.data.data)
            }).catch(error => {
                console.log(error);
            })
            }
        }
    })

    function followUser() {
        let user_id = parseInt(window.location.pathname.split("/")[2]);
        let id = parseInt(get_id_from_cookie());
        axios({
            method: 'post',
            url: `http://localhost:5000/api/users/followUser`,
            data: {
                user_id: id,
                user_id_2: user_id
            } 
        }).then(res => { 
            setFollowed(res.data.followed);
            console.log(res.data.data)
        }).catch(error => {
            console.log(error);
        })
        navigate(`/profile/${user_id}`)
    }
    function makeATopic() {
        navigate(`/createTopic`)
    }

    function goToTimeline() {
        navigate(`/timeline`)
    }

    if (myPage) {
        return (
            <div className={styles.background}>
                <div className={styles.backgroundDesign}>
                    <NavBar /> {/* TODO: import icons via bootstrap, centralize information*/}
                    <div className={styles.whiteWrapper}>
                        <div className={styles.userWrapper}>
                            <div className={styles.profilePictureWrapper}>
                                <img className={styles.profilePicture} src={tempPicture}></img>
                            </div>
                            <div className={styles.userInfo}>
                                <div className={styles.userHeader}>
                                    <p id="username" className={styles.username}>{username}</p>
                                    <button className={styles.editProfileButton} onClick={submitEditProfile}>Edit Profile</button> {/* Pref. Bootstrap Button*/}
                                    <button className={styles.editProfileButton} onClick={goToTimeline}>My Timeline</button>
                                    <button className={styles.editProfileButton} onClick={makeATopic}>Make a Topic</button>
                                </div>
                                <div className={styles.followCount}>
                                    <a id="postCount" className={styles.poplinks}>{posts.length} posts</a> {/* Links that go to userline, followers, and following lists*/}
                                    <a id="topicsFollowed" className={styles.poplinks}>0 Topics Following</a>
                                    <a id="usersFollowed" className={styles.poplinks}>0 Users Following</a>
                                </div>
                                <div className={styles.bioContainer}>
                                    <p id="bio" className={styles.bio}>
                                        {bio} {/* Handle \n = <br />*/}
                                    </p>
                                </div>
                            </div>
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
            )
    } else {
        return (
            <div className={styles.background}>
                <div className={styles.backgroundDesign}>
                    <NavBar /> {/* TODO: import icons via bootstrap, centralize information*/}
                    <div className={styles.whiteWrapper}>
                        <div className={styles.userWrapper}>
                            <div className={styles.profilePictureWrapper}>
                                <img className={styles.profilePicture} src={tempPicture}></img>
                            </div>
                            <div className={styles.userInfo}>
                                <div className={styles.userHeader}>
                                    <p id="username" className={styles.username}>{username}</p>
                                    <button className={styles.editProfileButton} onClick={followUser}>{followed?"Unfollow":"Follow"}</button> {/* Pref. Bootstrap Button*/}
                                </div>
                                <div className={styles.followCount}>
                                    <a id="postCount" className={styles.poplinks}>{posts.length} posts</a> {/* Links that go to userline, followers, and following lists*/}
                                    <a id="topicsFollowed" className={styles.poplinks}>0 Topics Following</a>
                                    <a id="usersFollowed" className={styles.poplinks}>0 Users Following</a>
                                </div>
                                <div className={styles.bioContainer}>
                                    <p id="bio" className={styles.bio}>
                                        {bio} {/* Handle \n = <br />*/}
                                    </p>
                                </div>
                            </div>
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
            )
    }
        
}

export default Profile;