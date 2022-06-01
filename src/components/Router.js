import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "routes/Profile"
import Navigation from "components/Navigation";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <div
            style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            marginTop: 80,
            display: "flex",
            justifyContent: "center",
            }}
            >
                <Routes>
                    {isLoggedIn ? (
                        <>
                        <Route exact path="/" element={<Home userObj={userObj} />} />
                        <Route exact path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
                        </>
                    ) : ( 
                    <Route exact path="/" element={<Auth />} />
                    )}
                </Routes>
            </div>
        </Router>
    )
}

export default AppRouter;