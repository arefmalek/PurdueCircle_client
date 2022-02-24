import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './EditProfile.module.css';
import NavBar from "../Components/NavBar/NavBar";
import axios from 'axios';
import tempPicture from "./username-icon.png";

function EditProfile() {

    const [bio, setBio] = useState("");
    const [loaded, setLoaded] = useState(false);

    let navigate = useNavigate();

    function get_id_from_cookie() {
        return document.cookie.split('; ').map(cookie => cookie.split('=')).find(cookie => cookie[0] === 'id')[1];
    }

    function submitChanges() {
        axios({
            method: 'post',
            url: `http://localhost:5000/api/users/editProfile`,
            data: {
                user_id: get_id_from_cookie(),
                bio: bio
            }
        }).then(res => { 
            navigate(`/profile/${get_id_from_cookie()}`)
        }).catch(error => {
            console.log(error);
            navigate('/login');
        })
    }

    function deleteAccount() {
        axios({
            method: 'post',
            url: `http://localhost:5000/api/users/deleteAccount`,
            data: {
                user_id: get_id_from_cookie(),
            }
        }).then(res => { 
            navigate('/login')
        }).catch(error => {
            console.log(error);
            navigate('/login');
        })
    }

    function updateBio(evt) {
        setBio(evt.target.value);
    }

    useEffect(() => {
        if (!loaded) {
            axios({
                method: 'get',
                url: `http://localhost:5000/api/users/id=${get_id_from_cookie()}`,
            }).then(res => { 
                setBio(res.data.bio);
                setLoaded(true);
            }).catch(error => {
                console.log(error);
                navigate('/login');
            })
        }
    })

    return (
        <div className={styles.background}>
            <div className={styles.backgroundDesign}>
                <NavBar /> {/* TODO: import icons via bootstrap, centralize information*/}
                <div className={styles.whiteWrapper}>
                    <div className={styles.informationFields}>
                    <div className={styles.fieldNames}>
                            <p>Biography: </p>
                        </div>
                        <div className={styles.editInformation}>
                        <textarea className={styles.editBio} onChange={updateBio} placeholder="Add a biography:" value={bio}></textarea>
                            <br></br>
                            <button className={styles.submitChanges} onClick={submitChanges}>Save Changes</button>
                            <button className={styles.deleteAccountButton} onClick={deleteAccount}>Delete Account</button>
                        </div>
                    </div>
                </div> 
            </div> 
        </div>)
}

export default EditProfile;