import React, { useState } from "react";
import { signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    } from "firebase/auth";
import { authService } from "fbase";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            let data;
            if(newAccount){
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch(error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
    <>
    <form onSubmit={onSubmit} className="container">
        <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} required className="authInput" />
        <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} required className="authInput" />
        <input type="submit" value={newAccount ? "Create Account" : "Sign In"} className="authInput authSubmit" />
        {error && <span className="authError">{error}</span>}
    </form>
    <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign In" : "Create Account"}
    </span>
    </>
    )
}

export default AuthForm;