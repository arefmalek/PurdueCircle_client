import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import styles from './Login.module.css';
import axios from 'axios';

function Login(props) {
    /*
    componentDidMount = () => {
        document.cookie = "id=;"
    }
    */

    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(""); 

    function updateUsername (evt) {
        setUsername(evt.target.value);
    }
    function updatePassword(evt) {
        setPassword(evt.target.value);
    }

    function handleLogin() {
        console.log(username);
        console.log(password);
        axios({
            method: 'post',
            url: `http://localhost:5000/api/users/login`,
            data: {
                username: username,
                password: password,
            }
        }).then(res => { 
            console.log(res);
            if (res.data.data === "Failed") {
                setError(true);
                setErrorMsg(res.data.message);
            } else {
                document.cookie = 'id=' + res.data.id + ';';
                navigate(`/profile/${res.data.id}`);
            }
        }).catch(error => {
            console.log(error);
        })
    }
    
    return (
    <div className={styles.background}>
        <div className={styles.backgroundDesign}>
            <div className={styles.loginBox}>
                <p className={styles.loginText}>Login</p>
                <input type="text" id="usernameTextBox" onChange={updateUsername} className={styles.loginTextBox} placeholder="Username" /><br></br>       
                <input type="password" id="passwordTextBox" onChange={updatePassword} className={styles.loginTextBox} placeholder="Password"/><br></br>
                <p className={styles.forgotPasswordText}>Forgot password?&nbsp;
                    <Link to="/login" className={styles.signUpLink}>Click here</Link>
                </p>
                <button className={styles.loginSubmit} onClick={handleLogin}>Login</button>
                <p className={styles.noAccountText}>
                    Don't have an account?&nbsp;
                    <Link to="/signup" className={styles.signUpLink}>
                        Sign Up
                    </Link>
                </p>
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
    )
}

export default Login;