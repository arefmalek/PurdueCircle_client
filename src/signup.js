import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import styles from './Signup.module.css';
import axios from 'axios';

function Signup(props) {
    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");    

    function updateEmail (evt) {
        setEmail(evt.target.value);
    }
    function updatePassword(evt) {
        setPassword(evt.target.value);
    }
    function updateUsername (evt) {
        setUsername(evt.target.value);
    }
    function updateRetypedPassword(evt) {
        setRetypedPassword(evt.target.value);
    }

    function handleSignup() {
        console.log(email)
        console.log(username)
        console.log(password)
        console.log(retypedPassword)
        axios({
            method: 'post',
            url: `http://purduecirc.herokuapp.com/api/users/register`,
            data: {
                email: email,
                username: username,
                password: password,
                retypedPassword: retypedPassword
            }
        }).then(res => { 
            console.log(res);
            if (res.data.data === "Failed") {
                setError(true);
                setErrorMsg(res.data.message);
            } else {
                document.cookie = 'id=' + res.data.id + ';';
                navigate("/profile");
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className={styles.background}>
            <div className={styles.backgroundDesign}>
                <div className={styles.signupBox}>
                    <p className={styles.signupText}>
                        Sign Up
                    </p>
                    <input type="text" className={styles.signupTextBox} onChange={updateEmail} placeholder="E-mail"/><br></br>
                    <input type="text" className={styles.signupTextBox} onChange={updateUsername} placeholder="Username"/><br></br>       
                    <input type="password" className={styles.signupTextBox} onChange={updatePassword} placeholder="Password"/><br></br>
                    <input type="password" className={styles.signupTextBox} onChange={updateRetypedPassword} placeholder="Confirm Password"/><br></br>
                    <button className={styles.signupSubmit} onClick={handleSignup}>
                        Create Account
                    </button>
                    <p className={styles.hasAccountText}>
                        Already have an account?&nbsp;
                        <Link to="/login" className={styles.loginLink}>Login</Link>
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

export default Signup;