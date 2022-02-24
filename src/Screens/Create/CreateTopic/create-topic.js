import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import styles from './create-topic.module.css';
import axios from 'axios';

import NavBar from '../../Components/NavBar/NavBar';

function CreateTopic(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(""); 

    let navigate = useNavigate();

    function updateName(e) {
        setName(e.target.value); 
    }

    function updateDescription(e) {
        setDescription(e.target.value);
    }

    function get_id_from_cookie() {
        return document.cookie.split('; ').map(cookie => cookie.split('=')).find(cookie => cookie[0] === 'id')[1];
    }

    function createTopic() {
        console.log(name);
        console.log(description);
        console.log(get_id_from_cookie())
        axios({
            method: 'post',
            url: `http://localhost:5000/api/topics/create_topic`,
            data: {
                user_id: get_id_from_cookie(),
                name: name,
                description: description,
            }
        }).then(res => { 
            console.log(res);
            if (res.data.data === "Failed") {
                setError(true)
                setErrorMsg(res.data.message);
            } else {
                navigate(`/topic/${name}`);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className={styles.background}>
            <div className={styles.backgroundDesign}>
            <div className={styles.NavBar}>
                <NavBar state={1}> </NavBar>
            </div>
                <div className={styles.createTopicBox}> 
                    <p className={styles.createTopicTitle}>Create a Topic</p>
                    <input type="text" className={styles.topicNameBox} onChange={updateName} placeholder="Name of Topic"/><br></br> 
                    <textarea className={styles.topicDescription} onChange={updateDescription} placeholder="Write a description..."></textarea><br></br>
                    <button className={styles.topicSubmit} onClick={createTopic}>Create</button>
                </div>
                {
                    error 
                        ? <div className={styles.errorBox}>
                            <p className={styles.invalidText}>{errorMsg}</p>
                        </div>
                        : <div></div>
                }
            </div>
        </div>
    );
}

export default CreateTopic;